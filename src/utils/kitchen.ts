import { PantryCategory } from '../types/kitchen';

const RULES: {cat: PantryCategory;words: string[];}[] = [
{ cat: 'Fruits', words: ['mango', 'banana', 'papaya', 'lime', 'lemon', 'berr', 'apple', 'passion', 'avocado', 'pineapple', 'fruit'] },
{ cat: 'Vegetables', words: ['tomato', 'onion', 'garlic', 'ginger', 'carrot', 'spinach', 'pumpkin', 'leek', 'cabbage', 'bok choy', 'cucumber', 'pepper', 'gotukola', 'greens', 'chilli', 'basil', 'coriander'] },
{ cat: 'Grains', words: ['rice', 'oat', 'flour', 'bread', 'pasta', 'linguine', 'quinoa', 'kurakkan', 'gram', 'lentil'] },
{ cat: 'Dairy', words: ['milk', 'yogurt', 'cheese', 'parmesan', 'butter', 'cream', 'egg'] },
{ cat: 'Meat & seafood', words: ['chicken', 'salmon', 'fish', 'prawn', 'beef', 'pork', 'mutton'] },
{ cat: 'Spices', words: ['turmeric', 'cumin', 'paprika', 'curry', 'mustard', 'cinnamon', 'pepper', 'cardamom', 'clove'] },
{ cat: 'Oils', words: ['oil'] },
{ cat: 'Pantry essentials', words: ['coconut milk', 'can', 'stock', 'soy', 'miso', 'vinegar', 'sugar', 'treacle', 'honey', 'chickpea', 'salt'] }];


export function guessCategory(name: string): PantryCategory {
  const n = name.toLowerCase();
  if (n.includes('oil')) return 'Oils';
  if (n.includes('coconut milk') || n.includes('coconut cream')) return 'Pantry essentials';
  return RULES.find((r) => r.words.some((w) => n.includes(w)))?.cat ?? 'Other';
}