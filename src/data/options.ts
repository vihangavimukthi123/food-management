import { Allergen, Diet, MealType, RecipeCategory } from '../types/recipe';
import { CookingLevel, PortionStyle } from '../types/user';
import { PantryCategory, WasteReason } from '../types/kitchen';

export const allergenOptions: {id: Allergen;label: string;}[] = [
{ id: 'dairy', label: 'Dairy' },
{ id: 'gluten', label: 'Gluten' },
{ id: 'egg', label: 'Egg' },
{ id: 'nuts', label: 'Tree nuts' },
{ id: 'peanuts', label: 'Peanuts' },
{ id: 'fish', label: 'Fish' },
{ id: 'shellfish', label: 'Shellfish' },
{ id: 'soy', label: 'Soy' },
{ id: 'coconut', label: 'Coconut' },
{ id: 'sesame', label: 'Sesame' }];


export const dietOptions: {id: Diet;label: string;}[] = [
{ id: 'vegetarian', label: 'Vegetarian' },
{ id: 'vegan', label: 'Vegan' },
{ id: 'gluten-free', label: 'Gluten-free' },
{ id: 'dairy-free', label: 'Dairy-free' }];


export const mealTypeOptions: {id: MealType;label: string;}[] = [
{ id: 'breakfast', label: 'Breakfast' },
{ id: 'lunch', label: 'Lunch' },
{ id: 'dinner', label: 'Dinner' },
{ id: 'snack', label: 'Snacks' },
{ id: 'dessert', label: 'Desserts' }];


export const recipeCategories: RecipeCategory[] = [
'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Healthy', 'High-protein', 'Vegetarian', 'Vegan', 'Sri Lankan', 'International', 'Quick', 'Family'];


export const cuisineOptions = ['Sri Lankan', 'Italian', 'Japanese', 'Middle Eastern', 'Pan-Asian', 'Global'];

export const equipmentOptions = ['Rice cooker', 'Oven', 'Blender', 'Wok', 'Pressure cooker', 'Air fryer', 'Grill pan', 'Food processor'];

export const favouriteSuggestions = ['Rice & curry', 'Pumpkin', 'Coconut', 'Mango', 'Eggs', 'Chicken', 'Lentils', 'Pasta', 'Chocolate', 'Avocado', 'Tomatoes'];

export const dislikeSuggestions = ['Mushrooms', 'Bitter gourd', 'Olives', 'Coriander', 'Eggplant', 'Okra', 'Blue cheese'];

export const cookingLevels: {id: CookingLevel;label: string;text: string;}[] = [
{ id: 'beginner', label: 'Beginner', text: 'Simple techniques, fewer steps.' },
{ id: 'intermediate', label: 'Intermediate', text: 'Comfortable with most home recipes.' },
{ id: 'advanced', label: 'Advanced', text: 'Happy to take on anything.' }];


export const portionStyles: {id: PortionStyle;label: string;text: string;}[] = [
{ id: 'light', label: 'Light', text: 'Smaller plates, more often.' },
{ id: 'standard', label: 'Standard', text: 'Everyday home portions.' },
{ id: 'hearty', label: 'Hearty', text: 'Generous, filling plates.' }];


export const pantryCategories: {id: PantryCategory;color: string;}[] = [
{ id: 'Fruits', color: '#d9a441' },
{ id: 'Vegetables', color: '#5f8a4a' },
{ id: 'Grains', color: '#b88a5a' },
{ id: 'Dairy', color: '#e9e2cf' },
{ id: 'Meat & seafood', color: '#b5574a' },
{ id: 'Spices', color: '#c0623f' },
{ id: 'Oils', color: '#c9a94a' },
{ id: 'Pantry essentials', color: '#8a7560' },
{ id: 'Other', color: '#7d8a7a' }];


export const unitOptions = ['whole', 'g', 'kg', 'ml', 'L', 'cup', 'bunch', 'can', 'jar', 'slice', 'sprig', 'tub', 'pack'];

export const wasteReasons: WasteReason[] = ['Expired', 'Spoiled', 'Overcooked', 'Leftovers not eaten', 'Bought too much', 'Other'];