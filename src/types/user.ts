import { Allergen, Diet, Goal, MealType } from './recipe';
import { BudgetTier, ScheduleSettings } from './plan';

export type CookingLevel = 'beginner' | 'intermediate' | 'advanced';
export type PortionStyle = 'light' | 'standard' | 'hearty';
export type SpiceLevel = 'mild' | 'medium' | 'bold';

export interface Profile {
  name: string;
  age: string;
  location: string;
  occupation: string;
  avatar: string;
  goal: Goal;
  allergies: Allergen[];
  restrictions: Diet[];
  favourites: string[];
  dislikes: string[];
  mealTypes: MealType[];
  categories: string[];
  cuisines: string[];
  cookingLevel: CookingLevel;
  portion: PortionStyle;
  spice: SpiceLevel;
  equipment: string[];
  preferredIngredients: string[];
  schedule?: ScheduleSettings;
  budget?: BudgetTier;
  planBuilt: boolean;
}

export interface Settings {
  mealReminders: boolean;
  expiryAlerts: boolean;
  weeklySummary: boolean;
  coachTips: boolean;
  reduceMotion: boolean;
  ambientMotion: boolean;
  largeText: boolean;
}

export interface StoredUser {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  resetCode?: string;
}

export type ActivityKind = 'recipe' | 'plan' | 'kitchen' | 'waste' | 'coach' | 'profile';

export interface Activity {
  id: string;
  text: string;
  kind: ActivityKind;
  at: string;
}