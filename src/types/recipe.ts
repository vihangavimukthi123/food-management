export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
export type Diet = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free';
export type Allergen =
'dairy' |
'gluten' |
'egg' |
'nuts' |
'peanuts' |
'fish' |
'shellfish' |
'soy' |
'coconut' |
'sesame';
export type Goal =
'weight-gain' |
'weight-loss' |
'healthy-lifestyle' |
'balanced' |
'muscle' |
'wellness' |
'dietary';
export type RecipeCategory =
'Breakfast' |
'Lunch' |
'Dinner' |
'Snacks' |
'Desserts' |
'Healthy' |
'High-protein' |
'Vegetarian' |
'Vegan' |
'Sri Lankan' |
'International' |
'Quick' |
'Family';

export interface RecipeIngredient {
  name: string;
  qty: number;
  unit: string;
  key: string;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  intro: string;
  image: string;
  mealType: MealType;
  categories: RecipeCategory[];
  cuisine: string;
  prepTime: number;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  servings: number;
  nutrition: Nutrition;
  diets: Diet[];
  allergens: Allergen[];
  goals: Goal[];
  ingredients: RecipeIngredient[];
  steps: string[];
  featured?: boolean;
  trendingRank?: number;
  addedDaysAgo: number;
}