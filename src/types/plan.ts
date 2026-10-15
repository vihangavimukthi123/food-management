import { Allergen, Diet, Goal, MealType, Nutrition } from './recipe';

export type PlanSlot = 'breakfast' | 'morning-snack' | 'lunch' | 'afternoon-snack' | 'dinner';

export type DayPace = 'free' | 'busy' | 'gym' | 'late';

export type BudgetTier = 'budget' | 'balanced' | 'premium';

export interface ScheduleSettings {
  days: Record<string, DayPace>;
  maxCookTime: number;
}

export interface PlannedMeal {
  slot: PlanSlot;
  title: string;
  description: string;
  image?: string;
  recipeId?: string;
  ingredients: string[];
  portion: string;
  nutrition: Nutrition;
  smartNote?: string;
  time?: string;
  prepTime?: number;
  cookTime?: number;
  budgetTier?: BudgetTier;
}

export interface DayPlan {
  date: string;
  pace?: DayPace;
  meals: PlannedMeal[];
}

export interface MealPlan {
  goal: Goal;
  createdAt: string;
  seed: number;
  days: DayPlan[];
  saved: boolean;
  schedule?: ScheduleSettings;
  budget?: BudgetTier;
}

export interface MealHistoryEntry {
  id: string;
  title: string;
  slot: PlanSlot;
  date: string;
  image?: string;
  recipeId?: string;
  calories: number;
  time: string;
  note?: string;
  status: 'cooked' | 'rescued' | 'logged';
  rating?: number;
  rescuedItems?: string[];
}

export interface SimpleMeal {
  id: string;
  title: string;
  description: string;
  types: MealType[];
  diets: Diet[];
  allergens: Allergen[];
  goals: Goal[];
  nutrition: Nutrition;
  ingredients: string[];
}

export interface GoalIngredient {
  name: string;
  allergens: Allergen[];
  animal?: 'meat' | 'fish' | 'egg' | 'dairy';
}

export interface GoalInfo {
  id: Goal;
  label: string;
  tagline: string;
  direction: string;
  mealTypes: string[];
  ingredients: GoalIngredient[];
  considerations: string[];
}

export type CoachAction = 'build-plan' | 'my-plan' | 'kitchen' | 'waste' | 'recipes' | 'profile' | 'substitutions';

export interface ChatMessage {
  id: string;
  role: 'user' | 'coach';
  text: string;
  recipeIds?: string[];
  action?: CoachAction;
  createdAt: string;
}