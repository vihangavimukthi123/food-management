import { goals } from '../data/goals';
import { allergenOptions } from '../data/options';
import { simpleMeals } from '../data/simpleMeals';
import { PantryItem } from '../types/kitchen';
import { CoachAction } from '../types/plan';
import { Profile } from '../types/user';
import { allergenLabel, conflicts, listJoin, pantryMatch, recommendRecipes } from './recommend';
import { daysUntil } from './dates';

export interface CoachReply {
  text: string;
  recipeIds?: string[];
  action?: CoachAction;
}

const has = (m: string, words: string[]) => words.some((w) => m.includes(w));

export function coachGreeting(profile: Profile): string {
  const goal = goals.find((g) => g.id === profile.goal);
  const first = profile.name.split(' ')[0] || 'there';
  return `Hello ${first}. I'm your DailyPlate Coach — a guide built from your food profile, not a medical adviser. You're focused on ${goal?.label.toLowerCase() ?? 'eating well'}${profile.allergies.length ? `, and I'll always steer clear of ${listJoin(profile.allergies.map((a) => allergenLabel(a).toLowerCase()))}` : ''}. Ask me anything, or build your food plan together.`;
}

export function coachRespond(message: string, profile: Profile, pantry: PantryItem[]): CoachReply {
  const m = message.toLowerCase();
  const goal = goals.find((g) => g.id === profile.goal) ?? goals[0];
  const avoid = profile.allergies.length ?
  ` Everything here avoids ${listJoin(profile.allergies.map((a) => allergenLabel(a).toLowerCase()))}${profile.restrictions.length ? ` and fits ${listJoin(profile.restrictions)}` : ''}.` :
  profile.restrictions.length ? ` Everything here fits ${listJoin(profile.restrictions)}.` : '';
  const ids = (list: {id: string;}[]) => list.map((r) => r.id);

  const mentioned = allergenOptions.find((a) => profile.allergies.includes(a.id) && (m.includes(a.label.toLowerCase()) || m.includes(a.id)));
  if (mentioned) {
    return { text: `A gentle flag: your profile lists ${mentioned.label.toLowerCase()} as an allergy, so I won't suggest anything containing it. If that has changed, you can update it in your profile and I'll adapt immediately.`, action: 'profile' };
  }

  if (has(m, ['build', 'plan my', 'food plan', 'make a plan', 'create a plan'])) {
    return { text: 'Let’s shape it together. I’ll ask about your goal, the foods you love and avoid, your dietary needs, allergies, cooking confidence and portion style — nothing about budget or schedule. It takes about a minute.', action: 'build-plan' };
  }

  if (has(m, ['waste', 'leftover', 'left over', 'going off', 'expire'])) {
    const soon = pantry.filter((p) => daysUntil(p.expiry) <= 3).map((p) => p.name.toLowerCase());
    const rec = recommendRecipes(profile, pantry, { limit: 3, filter: (r) => ['fried-rice', 'panzanella', 'smoothie-bowl', 'pumpkin-soup', 'gotukola-sambol'].includes(r.id) });
    return { text: `${soon.length ? `In your kitchen, ${listJoin(soon.slice(0, 4))} ${soon.length === 1 ? 'needs' : 'need'} using soon. ` : ''}A few habits help most: plan meals around what's already open, store herbs wrapped in damp cloth, and cook rice with tomorrow's fried rice in mind. These recipes are built for second chances.${avoid}`, recipeIds: ids(rec), action: 'waste' };
  }

  if (has(m, ['ingredient', 'i have', 'already have', 'my kitchen', 'pantry', 'using my'])) {
    const rec = recommendRecipes(profile, pantry, { limit: 6 }).
    map((r) => ({ r, ratio: pantryMatch(r.ingredients, pantry).ratio })).
    sort((a, b) => b.ratio - a.ratio).slice(0, 3).map((x) => x.r);
    const top = rec[0] ? pantryMatch(rec[0].ingredients, pantry) : null;
    return { text: `I looked through the ${pantry.length} ingredients in your kitchen. ${rec[0] ? `${rec[0].title} is the closest match — you already have ${top?.have.length} of its ${rec[0].ingredients.length} ingredients.` : 'Add a few ingredients to My Kitchen and I can match recipes to them.'}${avoid}`, recipeIds: ids(rec), action: 'kitchen' };
  }

  if (has(m, ['substitut', 'instead of', 'replace', 'alternative', 'swap'])) {
    return { text: 'The Flavour Lab holds swaps for common ingredients — kurakkan for wheat flour, kithul for honey, gotukola for spinach — each with a reason and a ratio. Open it and search for the ingredient you’re missing.', action: 'substitutions' };
  }

  if (has(m, ['breakfast', 'morning'])) {
    const rec = recommendRecipes(profile, pantry, { limit: 3, filter: (r) => r.mealType === 'breakfast' || r.categories.includes('Breakfast') });
    return { text: `For ${goal.label.toLowerCase()}, a good breakfast pairs something sustaining with a little protein or fibre. ${rec[0] ? `I'd start with ${rec[0].title}.` : ''}${avoid}`, recipeIds: ids(rec) };
  }

  if (has(m, ['protein', 'muscle'])) {
    const rec = recommendRecipes(profile, pantry, { limit: 3, filter: (r) => r.nutrition.protein >= 14 });
    return { text: `Here are the most protein-containing options that fit your profile. Spreading protein across the day tends to work better than saving it all for dinner.${avoid}`, recipeIds: ids(rec) };
  }

  if (has(m, ['snack', 'hungry', 'between meals'])) {
    const simple = simpleMeals.filter((s) => s.types.includes('snack') && conflicts(s.allergens, s.diets, s.ingredients, profile).length === 0).slice(0, 3);
    const rec = recommendRecipes(profile, pantry, { limit: 2, mealType: 'snack' });
    return { text: `Quick ideas: ${listJoin(simple.map((s) => s.title.toLowerCase()))}. If you have a little more time, these are worth making.${avoid}`, recipeIds: ids(rec) };
  }

  if (has(m, ['habit', 'improve', 'better', 'healthier', 'tips'])) {
    return { text: `Three small shifts that suit ${goal.label.toLowerCase()}: ${listJoin(goal.considerations.map((c) => c.replace(/\.$/, '').toLowerCase()))}. Your plan in My Plan already follows these — marking meals as done helps you see the pattern build.`, action: 'my-plan' };
  }

  if (has(m, ['dessert', 'sweet', 'chocolate'])) {
    const rec = recommendRecipes(profile, pantry, { limit: 3, filter: (r) => r.mealType === 'dessert' || r.mealType === 'snack' });
    return { text: `Something sweet that still fits your profile.${avoid}`, recipeIds: ids(rec) };
  }

  if (has(m, ['lunch', 'dinner', 'tonight', 'supper'])) {
    const type = m.includes('lunch') ? 'lunch' : 'dinner';
    const rec = recommendRecipes(profile, pantry, { limit: 3, filter: (r) => r.mealType === type || r.mealType === (type === 'lunch' ? 'dinner' : 'lunch') });
    return { text: `For ${type}, these suit ${goal.label.toLowerCase()} and your cooking level (${profile.cookingLevel}).${avoid}`, recipeIds: ids(rec) };
  }

  if (has(m, ['goal', 'should i eat', 'support', 'what to eat', 'eat today'])) {
    const rec = recommendRecipes(profile, pantry, { limit: 3 });
    return { text: `${goal.direction} These are illustrative ideas, not a prescription.${avoid}`, recipeIds: ids(rec), action: 'my-plan' };
  }

  if (has(m, ['hello', 'hi ', 'hey', 'good morning', 'good evening']) || m.trim() === 'hi') {
    return { text: coachGreeting(profile) };
  }

  const rec = recommendRecipes(profile, pantry, { limit: 3 });
  return { text: `I can help with meal ideas, using what's in your kitchen, rescuing leftovers, swapping ingredients or building your plan. Meanwhile, here's what I'd cook today based on your profile.${avoid}`, recipeIds: ids(rec) };
}