import { Diet } from '../types/recipe';

export interface Alternative {
  name: string;
  ratio: string;
  reason: string;
  diets: Diet[];
  local: boolean;
  note: string;
}

export interface Substitution {
  id: string;
  original: string;
  family: string;
  alternatives: Alternative[];
  recipeIds: string[];
}

export const substitutions: Substitution[] = [
{ id: 'wheat-flour', original: 'Wheat flour', family: 'Flours & grains', recipeIds: ['overnight-oats'], alternatives: [
  { name: 'Kurakkan (finger millet) flour', ratio: '1 : 1 in flatbreads, half-and-half in cakes', reason: 'Naturally gluten-free with an earthy, nutty flavour — the base of Sri Lankan roti and pittu.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Absorbs more water; add liquid gradually.' },
  { name: 'Rice flour', ratio: '1 : 1 for frying and thickening', reason: 'Gives a light, crisp finish to batters and string hoppers.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Less stretch — not ideal for yeasted bread.' }]
},
{ id: 'white-rice', original: 'White rice', family: 'Flours & grains', recipeIds: ['red-rice-dhal', 'fried-rice'], alternatives: [
  { name: 'Red rice (rathu kekulu)', ratio: '1 : 1, cook 10 minutes longer', reason: 'Keeps its bran layer, so it is chewier with more fibre than polished white rice.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Soak 30 minutes for a softer texture.' },
  { name: 'Quinoa', ratio: '1 : 1, cook 15 minutes', reason: 'A quick-cooking seed with a light, fluffy texture.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: false, note: 'Rinse well to remove bitterness.' }]
},
{ id: 'cows-milk', original: "Cow's milk", family: 'Dairy', recipeIds: ['overnight-oats', 'kiribath'], alternatives: [
  { name: 'Coconut milk', ratio: '1 : 1, or thin with water for drinking', reason: 'Rich and creamy, already central to Sri Lankan cooking.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Not suitable with a coconut allergy.' },
  { name: 'Oat milk', ratio: '1 : 1', reason: 'Neutral flavour that works well in porridge and baking.', diets: ['vegan', 'vegetarian', 'dairy-free'], local: false, note: 'Choose a certified gluten-free brand if needed.' }]
},
{ id: 'butter', original: 'Butter', family: 'Dairy', recipeIds: ['chocolate-mousse'], alternatives: [
  { name: 'Virgin coconut oil', ratio: '1 : 1 in baking, ¾ in sautéing', reason: 'Solid at cool temperatures, so it behaves similarly in pastry.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Adds a gentle coconut aroma.' },
  { name: 'Extra virgin olive oil', ratio: '¾ of the butter quantity', reason: 'Fruity flavour for savoury cooking and some cakes.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: false, note: 'Liquid — not for laminated pastry.' }]
},
{ id: 'eggs-baking', original: 'Eggs (in baking)', family: 'Protein', recipeIds: ['avocado-toast', 'shakshuka'], alternatives: [
  { name: 'Ground flaxseed + water', ratio: '1 tbsp flax + 3 tbsp water per egg', reason: 'Forms a gel that binds batters.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: false, note: 'Rest 5 minutes before using.' },
  { name: 'Ripe banana', ratio: '¼ cup mashed per egg', reason: 'Binds and sweetens — great for using an overripe banana.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Adds banana flavour; best in sweet bakes.' }]
},
{ id: 'spinach', original: 'Spinach', family: 'Greens', recipeIds: ['gotukola-sambol', 'red-rice-dhal'], alternatives: [
  { name: 'Gotukola', ratio: '1 : 1 raw in sambols', reason: 'A fresh, slightly bitter herb green eaten raw or in porridge.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Best finely shredded and eaten fresh.' },
  { name: 'Mukunuwenna', ratio: '1 : 1 cooked', reason: 'Mild leafy green ideal for mallung.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Stir-fry briefly to keep colour.' },
  { name: 'Kankun (water spinach)', ratio: '1 : 1 cooked', reason: 'Tender stems and leaves that cook in minutes.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Wash thoroughly.' }]
},
{ id: 'lentils', original: 'Red lentils', family: 'Pulses', recipeIds: ['red-rice-dhal', 'green-gram'], alternatives: [
  { name: 'Green gram (mung)', ratio: '1 : 1, soak overnight', reason: 'Holds its shape and has a sweet, grassy taste.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Takes longer to cook than red lentils.' },
  { name: 'Chickpeas', ratio: '1 : 1 cooked', reason: 'Hearty and creamy in curries.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: false, note: 'Canned chickpeas save soaking time.' }]
},
{ id: 'butternut', original: 'Butternut squash', family: 'Vegetables', recipeIds: ['pumpkin-soup', 'chickpea-curry'], alternatives: [
  { name: 'Sri Lankan pumpkin (wattakka)', ratio: '1 : 1', reason: 'Sweet, dense flesh — the classic for pumpkin curry.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Leave the skin on for curries; it softens.' },
  { name: 'Sweet potato', ratio: '1 : 1', reason: 'Similar sweetness and creamy texture when roasted.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Cooks slightly faster.' }]
},
{ id: 'honey', original: 'Honey', family: 'Sweeteners', recipeIds: ['overnight-oats', 'chocolate-mousse'], alternatives: [
  { name: 'Kithul treacle', ratio: '1 : 1', reason: 'Palm syrup with deep caramel notes — vegan and traditional.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Look for pure kithul, not blended syrups.' },
  { name: 'Jaggery (hakuru)', ratio: 'Grate, use ¾ amount', reason: 'Unrefined sugar that melts into sauces and desserts.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Dissolve in a little warm water for drizzling.' }]
},
{ id: 'cream', original: 'Double cream', family: 'Dairy', recipeIds: ['pumpkin-soup', 'chocolate-mousse'], alternatives: [
  { name: 'Coconut cream', ratio: '1 : 1', reason: 'Whips when chilled and enriches soups.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Chill the can overnight to whip.' },
  { name: 'Cashew cream', ratio: '1 cup soaked cashews + ½ cup water', reason: 'Silky, neutral richness for sauces.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: false, note: 'Contains tree nuts.' }]
},
{ id: 'soy-sauce', original: 'Soy sauce', family: 'Seasonings', recipeIds: ['fried-rice', 'chicken-stirfry'], alternatives: [
  { name: 'Coconut aminos', ratio: '1 : 1, add a pinch of salt', reason: 'Soy-free and gluten-free with a gentle sweetness.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: false, note: 'Milder and sweeter than soy sauce.' },
  { name: 'Tamari', ratio: '1 : 1', reason: 'Usually wheat-free soy sauce for gluten-free cooking.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: false, note: 'Still contains soy.' }]
},
{ id: 'lemon', original: 'Lemon (souring)', family: 'Seasonings', recipeIds: ['gotukola-sambol', 'pesto-pasta'], alternatives: [
  { name: 'Lime', ratio: '1 : 1', reason: 'Brighter, more floral acidity.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Common in Sri Lankan sambols.' },
  { name: 'Goraka', ratio: '2–3 pieces per curry', reason: 'Dried Garcinia that adds a deep, smoky sourness to fish and curries.', diets: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'], local: true, note: 'Soak and grind into a paste before adding.' }]
}];