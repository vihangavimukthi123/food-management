import { GoalInfo } from '../types/plan';

export const goals: GoalInfo[] = [
{
  id: 'weight-gain',
  label: 'Weight gain',
  tagline: 'Nutrient-dense, energy-supportive eating',
  direction: 'Build plates that are generous and nutrient-dense: wholesome grains, healthy fats and a protein-containing element at every meal, with satisfying snacks between them.',
  mealTypes: ['Hearty rice & curry plates', 'Grain bowls with healthy fats', 'Protein-containing snacks', 'Smoothies with fruit and seeds'],
  ingredients: [
  { name: 'Red rice', allergens: [] },
  { name: 'Avocado', allergens: [] },
  { name: 'Coconut milk', allergens: ['coconut'] },
  { name: 'Eggs', allergens: ['egg'], animal: 'egg' },
  { name: 'Cashews', allergens: ['nuts'] },
  { name: 'Sweet potato', allergens: [] },
  { name: 'Chickpeas', allergens: [] },
  { name: 'Salmon', allergens: ['fish'], animal: 'fish' }],

  considerations: ['Aim for regular meals rather than very large ones.', 'Healthy fats add energy without huge volume.', 'Pair snacks with a source of protein.']
},
{
  id: 'weight-loss',
  label: 'Weight loss',
  tagline: 'Balanced, fibre-rich and satisfying',
  direction: 'Lean on vegetables and fibre-rich foods to fill the plate, keep a reasonable portion of grains, and include a protein source so meals stay satisfying.',
  mealTypes: ['Vegetable-forward lunches', 'Lentil and pulse dishes', 'Light soups', 'Fruit-based snacks'],
  ingredients: [
  { name: 'Gotukola', allergens: [] },
  { name: 'Green gram', allergens: [] },
  { name: 'Pumpkin', allergens: [] },
  { name: 'Red lentils', allergens: [] },
  { name: 'Spinach', allergens: [] },
  { name: 'Chicken breast', allergens: [], animal: 'meat' },
  { name: 'Papaya', allergens: [] },
  { name: 'Greek yogurt', allergens: ['dairy'], animal: 'dairy' }],

  considerations: ['Half the plate as vegetables is a useful rule of thumb.', 'Fibre and protein help meals feel satisfying.', 'Portions are trimmed slightly — never to extremes.']
},
{
  id: 'healthy-lifestyle',
  label: 'Healthy lifestyle',
  tagline: 'Everyday meals that feel good',
  direction: 'Keep things simple and repeatable: colourful plates, mostly whole foods, and recipes you can enjoy every week.',
  mealTypes: ['Colourful bowls', 'Home-style curries', 'Fresh salads', 'Fruit snacks'],
  ingredients: [
  { name: 'Tomatoes', allergens: [] },
  { name: 'Red rice', allergens: [] },
  { name: 'Mango', allergens: [] },
  { name: 'Chickpeas', allergens: [] },
  { name: 'Olive oil', allergens: [] },
  { name: 'Leafy greens', allergens: [] }],

  considerations: ['Variety across the week matters more than any single meal.', 'Cook at home when you can — it keeps ingredients visible.']
},
{
  id: 'balanced',
  label: 'Balanced nutrition',
  tagline: 'Every food group, in proportion',
  direction: 'Combine grains, protein, vegetables, fruit and healthy fats across each day so no group is consistently left out.',
  mealTypes: ['Rice & curry with dhal and greens', 'Protein bowls', 'Eggs or pulses at breakfast', 'Fruit and seeds'],
  ingredients: [
  { name: 'Red rice', allergens: [] },
  { name: 'Red lentils', allergens: [] },
  { name: 'Eggs', allergens: ['egg'], animal: 'egg' },
  { name: 'Spinach', allergens: [] },
  { name: 'Banana', allergens: [] },
  { name: 'Pumpkin seeds', allergens: [] }],

  considerations: ['Think in thirds: grains, protein, vegetables.', 'Fruit works well as a snack between meals.']
},
{
  id: 'muscle',
  label: 'Muscle-supportive eating',
  tagline: 'Protein-containing meals, balanced carbohydrates',
  direction: 'Spread protein-containing foods across the day and pair them with balanced carbohydrates, so every meal supports activity and recovery.',
  mealTypes: ['Protein bowls', 'Stir-fries with lean protein', 'Egg-based breakfasts', 'Pulse-based snacks'],
  ingredients: [
  { name: 'Chicken breast', allergens: [], animal: 'meat' },
  { name: 'Eggs', allergens: ['egg'], animal: 'egg' },
  { name: 'Green gram', allergens: [] },
  { name: 'Tofu', allergens: ['soy'] },
  { name: 'Salmon', allergens: ['fish'], animal: 'fish' },
  { name: 'Greek yogurt', allergens: ['dairy'], animal: 'dairy' },
  { name: 'Chickpeas', allergens: [] }],

  considerations: ['Include a protein source at each meal, not just dinner.', 'Carbohydrates help fuel activity — keep them in.']
},
{
  id: 'wellness',
  label: 'General wellness',
  tagline: 'Variety, colour and calm',
  direction: 'Choose a wide variety of fruits, vegetables, herbs and grains. Seasonal and local ingredients keep each week interesting.',
  mealTypes: ['Herbal porridges', 'Vegetable curries', 'Soups', 'Tropical fruit bowls'],
  ingredients: [
  { name: 'Gotukola', allergens: [] },
  { name: 'Turmeric', allergens: [] },
  { name: 'Ginger', allergens: [] },
  { name: 'Papaya', allergens: [] },
  { name: 'Pumpkin', allergens: [] },
  { name: 'Curry leaves', allergens: [] }],

  considerations: ['Aim for many colours across the week.', 'Herbs and spices add flavour without heaviness.']
},
{
  id: 'dietary',
  label: 'Dietary preference-based',
  tagline: 'Built around how you choose to eat',
  direction: 'Start from your dietary choices and allergies, then build a satisfying, varied week entirely within them.',
  mealTypes: ['Plant-forward curries', 'Grain and pulse bowls', 'Fresh sambols', 'Fruit-based desserts'],
  ingredients: [
  { name: 'Chickpeas', allergens: [] },
  { name: 'Red rice', allergens: [] },
  { name: 'Kurakkan flour', allergens: [] },
  { name: 'Green gram', allergens: [] },
  { name: 'Seasonal fruit', allergens: [] }],

  considerations: ['Check labels on packaged foods for hidden allergens.', 'Pulses and grains together make satisfying meals.']
}];