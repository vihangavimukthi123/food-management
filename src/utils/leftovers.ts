import { recipes } from '../data/recipes';
import { PantryItem } from '../types/kitchen';
import { Recipe, RecipeIngredient } from '../types/recipe';
import { Profile } from '../types/user';
import { pantryMatch, recipeConflicts } from './recommend';

const LEFTOVER_MAP: {match: string[];recipeIds: string[];}[] = [
{ match: ['rice'], recipeIds: ['fried-rice', 'red-rice-dhal', 'chicken-stirfry'] },
{ match: ['bread', 'sourdough', 'toast', 'loaf'], recipeIds: ['panzanella', 'avocado-toast', 'shakshuka'] },
{ match: ['vegetable', 'veg', 'carrot', 'cabbage', 'leek', 'spinach', 'greens', 'bok choy'], recipeIds: ['fried-rice', 'chicken-stirfry', 'red-rice-dhal', 'pumpkin-soup'] },
{ match: ['pumpkin', 'squash'], recipeIds: ['pumpkin-soup', 'chickpea-curry'] },
{ match: ['tomato'], recipeIds: ['shakshuka', 'panzanella'] },
{ match: ['fruit', 'banana', 'mango', 'papaya', 'berries', 'berry'], recipeIds: ['smoothie-bowl', 'overnight-oats'] },
{ match: ['coconut'], recipeIds: ['gotukola-sambol', 'kiribath', 'chocolate-mousse', 'green-gram'] },
{ match: ['chicken'], recipeIds: ['chicken-stirfry', 'fried-rice'] },
{ match: ['yogurt', 'yoghurt', 'milk'], recipeIds: ['overnight-oats'] },
{ match: ['egg'], recipeIds: ['shakshuka', 'fried-rice', 'avocado-toast'] },
{ match: ['herb', 'gotukola', 'basil', 'coriander'], recipeIds: ['gotukola-sambol', 'panzanella', 'pesto-pasta'] }];


export interface LeftoverIdea {
  recipe: Recipe;
  have: RecipeIngredient[];
  missing: RecipeIngredient[];
}

export function leftoverSuggestions(input: string, profile: Profile, pantry: PantryItem[]): {ideas: LeftoverIdea[];hidden: number;} {
  const q = input.toLowerCase().trim();
  if (!q) return { ideas: [], hidden: 0 };
  const ids = new Set<string>();
  LEFTOVER_MAP.forEach((m) => {
    if (m.match.some((k) => q.includes(k) || q.length > 2 && k.includes(q))) m.recipeIds.forEach((id) => ids.add(id));
  });
  recipes.forEach((r) => {
    if (r.ingredients.some((i) => i.name.toLowerCase().includes(q) || q.length > 2 && q.includes(i.key))) ids.add(r.id);
  });
  const matched = recipes.filter((r) => ids.has(r.id));
  const compatible = matched.filter((r) => recipeConflicts(r, profile).length === 0);
  // Treat the leftover itself as available.
  const virtualPantry: PantryItem[] = [...pantry, { id: 'leftover', name: q, category: 'Other', quantity: 1, unit: 'whole', expiry: '', added: '', lowAt: 0 }];
  const ideas = compatible.
  map((recipe) => ({ recipe, ...pantryMatch(recipe.ingredients, virtualPantry) })).
  sort((a, b) => b.ratio - a.ratio).
  map(({ recipe, have, missing }) => ({ recipe, have, missing }));
  return { ideas, hidden: matched.length - compatible.length };
}