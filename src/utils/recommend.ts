import { recipes } from '../data/recipes';
import { allergenOptions } from '../data/options';
import { Allergen, Diet, MealType, Recipe, RecipeIngredient } from '../types/recipe';
import { Profile } from '../types/user';
import { PantryItem } from '../types/kitchen';

const STAPLES = ['salt', 'water'];

export function allergenLabel(a: Allergen): string {
  return allergenOptions.find((o) => o.id === a)?.label ?? a;
}

export function dietSatisfied(diets: Diet[], d: Diet): boolean {
  return diets.includes(d) || d === 'vegetarian' && diets.includes('vegan');
}

export function conflicts(allergens: Allergen[], diets: Diet[], ingredientNames: string[], profile: Profile): string[] {
  const reasons: string[] = [];
  allergens.forEach((a) => {
    if (profile.allergies.includes(a)) reasons.push(`contains ${allergenLabel(a).toLowerCase()}`);
  });
  profile.restrictions.forEach((d) => {
    if (!dietSatisfied(diets, d)) reasons.push(`not ${d}`);
  });
  const dislike = profile.dislikes.find((x) =>
  ingredientNames.some((n) => n.toLowerCase().includes(x.toLowerCase().replace(/s$/, '')))
  );
  if (dislike) reasons.push(`includes ${dislike.toLowerCase()}`);
  return reasons;
}

export function recipeConflicts(r: Recipe, profile: Profile): string[] {
  return conflicts(r.allergens, r.diets, r.ingredients.map((i) => i.name), profile);
}

export function isCompatible(r: Recipe, profile: Profile): boolean {
  return recipeConflicts(r, profile).length === 0;
}

export function inPantry(key: string, pantry: PantryItem[]): boolean {
  const k = key.toLowerCase();
  if (STAPLES.includes(k)) return true;
  return pantry.some((p) => {
    const n = p.name.toLowerCase();
    return p.quantity > 0 && (n.includes(k) || k.includes(n));
  });
}

export function pantryMatch(ingredients: RecipeIngredient[], pantry: PantryItem[]) {
  const have = ingredients.filter((i) => inPantry(i.key, pantry));
  const missing = ingredients.filter((i) => !inPantry(i.key, pantry));
  return { have, missing, ratio: ingredients.length ? have.length / ingredients.length : 0 };
}

export function scoreRecipe(r: Recipe, profile: Profile, pantry: PantryItem[]): number {
  let s = 0;
  if (r.goals.includes(profile.goal)) s += 3;
  const favs = profile.favourites.map((f) => f.toLowerCase());
  if (favs.some((f) => r.title.toLowerCase().includes(f) || r.ingredients.some((i) => i.name.toLowerCase().includes(f)))) s += 2;
  if (profile.cuisines.includes(r.cuisine)) s += 1.5;
  if (profile.categories.some((c) => (r.categories as string[]).includes(c))) s += 1;
  if (profile.mealTypes.includes(r.mealType)) s += 0.5;
  s += pantryMatch(r.ingredients, pantry).ratio * 2;
  if (profile.cookingLevel === 'beginner' && r.difficulty !== 'Easy') s -= 1.5;
  return s;
}

interface RecommendOptions {
  limit?: number;
  mealType?: MealType;
  exclude?: string[];
  filter?: (r: Recipe) => boolean;
}

export function recommendRecipes(profile: Profile, pantry: PantryItem[], opts: RecommendOptions = {}): Recipe[] {
  const { limit = 6, mealType, exclude = [], filter } = opts;
  return recipes.
  filter((r) => isCompatible(r, profile)).
  filter((r) => !exclude.includes(r.id)).
  filter((r) => mealType ? r.mealType === mealType : true).
  filter((r) => filter ? filter(r) : true).
  map((r) => ({ r, s: scoreRecipe(r, profile, pantry) })).
  sort((a, b) => b.s - a.s).
  slice(0, limit).
  map((x) => x.r);
}

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}