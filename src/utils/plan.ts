import { recipes } from '../data/recipes';
import { simpleMeals } from '../data/simpleMeals';
import { Goal, MealType, Nutrition } from '../types/recipe';
import { BudgetTier, DayPace, DayPlan, MealPlan, PlannedMeal, PlanSlot, ScheduleSettings } from '../types/plan';
import { Profile } from '../types/user';
import { PantryItem, WasteEntry } from '../types/kitchen';
import { conflicts, isCompatible } from './recommend';
import { daysUntil, isoDaysFromNow } from './dates';

export const SLOTS: {slot: PlanSlot;label: string;types: MealType[];}[] = [
{ slot: 'breakfast', label: 'Breakfast', types: ['breakfast'] },
{ slot: 'morning-snack', label: 'Morning snack', types: ['snack'] },
{ slot: 'lunch', label: 'Lunch', types: ['lunch'] },
{ slot: 'afternoon-snack', label: 'Afternoon snack', types: ['snack', 'dessert'] },
{ slot: 'dinner', label: 'Dinner', types: ['dinner'] }];

export function slotLabel(slot: PlanSlot): string {
  return SLOTS.find((s) => s.slot === slot)?.label ?? slot;
}

interface Candidate {
  id: string;
  title: string;
  description: string;
  image?: string;
  recipeId?: string;
  ingredients: string[];
  nutrition: Nutrition;
  goals: Goal[];
  types: MealType[];
  prepTime: number;
  cookTime: number;
  categories: string[];
  difficulty: string;
}

function candidates(profile: Profile): Candidate[] {
  const fromRecipes: Candidate[] = recipes.
  filter((r) => isCompatible(r, profile)).
  map((r): Candidate => ({
    id: r.id, title: r.title, description: r.description, image: r.image, recipeId: r.id,
    ingredients: r.ingredients.map((i) => i.name), nutrition: r.nutrition, goals: r.goals,
    types: r.mealType === 'lunch' ? ['lunch', 'dinner'] : r.mealType === 'dinner' ? ['dinner', 'lunch'] : [r.mealType],
    prepTime: r.prepTime, cookTime: r.cookTime, categories: r.categories, difficulty: r.difficulty
  }));
  const fromSimple: Candidate[] = simpleMeals.
  filter((m) => conflicts(m.allergens, m.diets, m.ingredients, profile).length === 0).
  map((m): Candidate => ({
    id: m.id, title: m.title, description: m.description, ingredients: m.ingredients,
    nutrition: m.nutrition, goals: m.goals, types: m.types,
    prepTime: 5, cookTime: 10, categories: ['Quick'], difficulty: 'Easy'
  }));
  return [...fromRecipes, ...fromSimple];
}

function goalScore(c: Candidate, goal: Goal): number {
  const n = c.nutrition;
  let s = c.goals.includes(goal) ? 3 : 0;
  if (c.recipeId) s += 0.8;
  switch (goal) {
    case 'weight-gain':s += n.calories / 220 + n.protein / 18;break;
    case 'weight-loss':s += n.fibre / 3 - n.calories / 260;break;
    case 'muscle':s += n.protein / 8;break;
    case 'balanced':case 'healthy-lifestyle':case 'wellness':s += n.fibre / 5;break;
    default:break;
  }
  return s;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;a = a + 0x6d2b79f5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function portionMultiplier(goal: Goal, portion: Profile['portion']): number {
  const g = goal === 'weight-gain' ? 1.2 : goal === 'weight-loss' ? 0.85 : goal === 'muscle' ? 1.1 : 1;
  const p = portion === 'light' ? 0.9 : portion === 'hearty' ? 1.15 : 1;
  return Math.round(g * p * 100) / 100;
}

function portionText(mult: number): string {
  if (mult >= 1.15) return 'Generous serving';
  if (mult <= 0.9) return 'Lighter serving';
  return 'Standard serving';
}

const FALLBACK: Candidate = {
  id: 'seasonal-fruit', title: 'Seasonal fruit plate', description: 'Whatever fruit is ripest today, sliced and shared.',
  ingredients: ['Seasonal fruit'], nutrition: { calories: 120, protein: 1, carbs: 30, fat: 0, fibre: 4 }, goals: [], types: ['snack', 'breakfast'],
  prepTime: 3, cookTime: 0, categories: ['Quick'], difficulty: 'Easy'
};

const DAY_CODES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export interface GeneratePlanOptions {
  schedule?: ScheduleSettings;
  budget?: BudgetTier;
  pantry?: PantryItem[];
  waste?: WasteEntry[];
  equipment?: string[];
}

export function generatePlan(
  profile: Profile,
  goal: Goal,
  seed: number,
  options?: GeneratePlanOptions
): MealPlan {
  const pool = candidates(profile);
  const rand = rng(seed);
  const mult = portionMultiplier(goal, profile.portion);

  const schedule = options?.schedule ?? profile.schedule ?? {
    days: { MON: 'free', TUE: 'busy', WED: 'free', THU: 'gym', FRI: 'busy', SAT: 'free', SUN: 'free' },
    maxCookTime: 20
  };
  const budget = options?.budget ?? profile.budget ?? 'balanced';
  const pantry = options?.pantry ?? [];

  // Identify ingredients needing quick rescue (expiring in <= 3 days)
  const expiringNames = pantry
    .filter((p) => daysUntil(p.expiry) <= 3)
    .map((p) => p.name.toLowerCase());

  const days: DayPlan[] = Array.from({ length: 7 }, (_, d) => {
    const dayCode = DAY_CODES[d % 7];
    const pace: DayPace = schedule.days[dayCode] ?? 'free';
    const used = new Set<string>();

    const meals: PlannedMeal[] = SLOTS.map(({ slot, types }) => {
      let candidateList = pool.filter((c) => c.types.some((t) => types.includes(t)) && !used.has(c.id));
      if (!candidateList.length) candidateList = pool.filter((c) => c.types.includes('snack') && !used.has(c.id));

      const ranked = candidateList.map((c) => {
        let score = goalScore(c, goal) + rand() * 2;
        const totalTime = c.prepTime + c.cookTime;

        // Schedule rhythm scoring
        if (pace === 'busy') {
          if (totalTime <= (schedule.maxCookTime || 20)) score += 3.5;
          if (c.categories.includes('Quick')) score += 2;
        } else if (pace === 'gym') {
          if (c.nutrition.protein >= 20 || c.goals.includes('muscle') || c.categories.includes('High-protein')) score += 3.8;
        } else if (pace === 'late') {
          if (totalTime <= 15) score += 3.0;
        }

        // Budget scoring
        if (budget === 'budget') {
          if (c.ingredients.some((ing) => ing.toLowerCase().includes('rice') || ing.toLowerCase().includes('lentil') || ing.toLowerCase().includes('egg') || ing.toLowerCase().includes('oat'))) {
            score += 2.5;
          }
        }

        // Expiry & pantry rescue scoring
        const rescuesExpiring = c.ingredients.some((ing) =>
          expiringNames.some((exp) => ing.toLowerCase().includes(exp) || exp.includes(ing.toLowerCase()))
        );
        if (rescuesExpiring) score += 4.0;

        return { c, s: score, rescuesExpiring };
      }).sort((a, b) => b.s - a.s);

      const topChoice = ranked[0]?.c ?? FALLBACK;
      const topInfo = ranked[0];
      used.add(topChoice.id);

      const isSnack = slot.includes('snack');
      const m = isSnack ? Math.max(0.9, mult - 0.1) : mult;
      const totalTime = topChoice.prepTime + topChoice.cookTime;

      // Generate context-aware smart note
      let smartNote: string | undefined = undefined;
      if (topInfo?.rescuesExpiring) {
        const rescued = expiringNames.find((exp) =>
          topChoice.ingredients.some((ing) => ing.toLowerCase().includes(exp) || exp.includes(ing.toLowerCase()))
        );
        smartNote = rescued ? `Rescues expiring ${rescued}` : 'Pantry fresh rescue';
      } else if (pace === 'busy') {
        smartNote = `Under ${totalTime || 15}m · busy day express`;
      } else if (pace === 'gym') {
        smartNote = `${Math.round(topChoice.nutrition.protein * m)}g protein · recovery fuel`;
      } else if (pace === 'late') {
        smartNote = 'Low effort · quick prep';
      } else if (budget === 'budget') {
        smartNote = 'Budget-friendly staple';
      }

      return {
        slot,
        title: topChoice.title,
        description: topChoice.description,
        image: topChoice.image,
        recipeId: topChoice.recipeId,
        ingredients: topChoice.ingredients,
        portion: portionText(m),
        smartNote,
        time: totalTime ? `${totalTime} min` : '15 min',
        prepTime: topChoice.prepTime,
        cookTime: topChoice.cookTime,
        budgetTier: budget,
        nutrition: {
          calories: Math.round(topChoice.nutrition.calories * m),
          protein: Math.round(topChoice.nutrition.protein * m),
          carbs: Math.round(topChoice.nutrition.carbs * m),
          fat: Math.round(topChoice.nutrition.fat * m),
          fibre: Math.round(topChoice.nutrition.fibre * m)
        }
      };
    });

    return { date: isoDaysFromNow(d), pace, meals };
  });

  return {
    goal,
    createdAt: new Date().toISOString(),
    seed,
    days,
    saved: false,
    schedule,
    budget
  };
}

export function dayTotals(day: DayPlan): Nutrition {
  return day.meals.reduce(
    (t, m) => ({ calories: t.calories + m.nutrition.calories, protein: t.protein + m.nutrition.protein, carbs: t.carbs + m.nutrition.carbs, fat: t.fat + m.nutrition.fat, fibre: t.fibre + m.nutrition.fibre }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 }
  );
}

export function todayIndex(plan: MealPlan): number {
  const today = isoDaysFromNow(0);
  const idx = plan.days.findIndex((d) => d.date === today);
  return idx === -1 ? 0 : idx;
}

export function completionKey(dayIndex: number, slot: PlanSlot): string {
  return `${dayIndex}-${slot}`;
}