import { PantrySeed, WasteSeed } from '../types/kitchen';

export const pantrySeed: PantrySeed[] = [
{ name: 'Mango', category: 'Fruits', quantity: 2, unit: 'whole', expiresIn: 3, addedAgo: 2, lowAt: 1 },
{ name: 'Banana', category: 'Fruits', quantity: 5, unit: 'whole', expiresIn: 2, addedAgo: 4, lowAt: 2 },
{ name: 'Lime', category: 'Fruits', quantity: 6, unit: 'whole', expiresIn: 12, addedAgo: 3, lowAt: 2 },
{ name: 'Tomatoes', category: 'Vegetables', quantity: 4, unit: 'whole', expiresIn: 4, addedAgo: 3, lowAt: 3 },
{ name: 'Spinach', category: 'Vegetables', quantity: 1, unit: 'bunch', expiresIn: 1, addedAgo: 5, lowAt: 1 },
{ name: 'Pumpkin', category: 'Vegetables', quantity: 800, unit: 'g', expiresIn: 10, addedAgo: 2, lowAt: 200 },
{ name: 'Carrots', category: 'Vegetables', quantity: 3, unit: 'whole', expiresIn: 9, addedAgo: 3, lowAt: 2 },
{ name: 'Red onion', category: 'Vegetables', quantity: 6, unit: 'whole', expiresIn: 25, addedAgo: 6, lowAt: 2 },
{ name: 'Gotukola', category: 'Vegetables', quantity: 1, unit: 'bunch', expiresIn: 2, addedAgo: 1, lowAt: 1 },
{ name: 'Garlic', category: 'Vegetables', quantity: 1, unit: 'whole', expiresIn: 30, addedAgo: 8, lowAt: 1 },
{ name: 'Ginger', category: 'Vegetables', quantity: 150, unit: 'g', expiresIn: 20, addedAgo: 8, lowAt: 50 },
{ name: 'Red rice', category: 'Grains', quantity: 2, unit: 'kg', expiresIn: 180, addedAgo: 14, lowAt: 0.5 },
{ name: 'Rolled oats', category: 'Grains', quantity: 0.3, unit: 'kg', expiresIn: 120, addedAgo: 30, lowAt: 0.5 },
{ name: 'Green gram', category: 'Grains', quantity: 500, unit: 'g', expiresIn: 200, addedAgo: 20, lowAt: 200 },
{ name: 'Sourdough bread', category: 'Grains', quantity: 3, unit: 'slice', expiresIn: 1, addedAgo: 3, lowAt: 2 },
{ name: 'Eggs', category: 'Dairy', quantity: 6, unit: 'whole', expiresIn: 14, addedAgo: 4, lowAt: 3 },
{ name: 'Greek yogurt', category: 'Dairy', quantity: 1, unit: 'tub', expiresIn: 3, addedAgo: 5, lowAt: 1 },
{ name: 'Chicken breast', category: 'Meat & seafood', quantity: 400, unit: 'g', expiresIn: 2, addedAgo: 1, lowAt: 200 },
{ name: 'Turmeric', category: 'Spices', quantity: 1, unit: 'jar', expiresIn: 300, addedAgo: 60, lowAt: 1 },
{ name: 'Curry leaves', category: 'Spices', quantity: 2, unit: 'sprig', expiresIn: 5, addedAgo: 2, lowAt: 1 },
{ name: 'Roasted curry powder', category: 'Spices', quantity: 1, unit: 'jar', expiresIn: 240, addedAgo: 40, lowAt: 1 },
{ name: 'Coconut oil', category: 'Oils', quantity: 0.5, unit: 'L', expiresIn: 200, addedAgo: 25, lowAt: 0.2 },
{ name: 'Olive oil', category: 'Oils', quantity: 0.2, unit: 'L', expiresIn: 300, addedAgo: 50, lowAt: 0.25 },
{ name: 'Coconut milk', category: 'Pantry essentials', quantity: 2, unit: 'can', expiresIn: 365, addedAgo: 10, lowAt: 1 },
{ name: 'Chickpeas', category: 'Pantry essentials', quantity: 1, unit: 'can', expiresIn: 400, addedAgo: 10, lowAt: 1 }];


export const wasteSeed: WasteSeed[] = [
{ item: 'Spinach', quantity: 1, unit: 'bunch', daysAgo: 3, reason: 'Spoiled', note: 'Wilted at the back of the fridge.' },
{ item: 'Cooked rice', quantity: 2, unit: 'cup', daysAgo: 6, reason: 'Leftovers not eaten', note: '' },
{ item: 'Sourdough bread', quantity: 4, unit: 'slice', daysAgo: 9, reason: 'Expired', note: 'Could have been panzanella.' },
{ item: 'Banana', quantity: 2, unit: 'whole', daysAgo: 12, reason: 'Spoiled', note: '' },
{ item: 'Greek yogurt', quantity: 0.5, unit: 'tub', daysAgo: 16, reason: 'Bought too much', note: 'Bought a second tub by mistake.' }];