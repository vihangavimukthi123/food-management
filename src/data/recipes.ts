import { Recipe } from '../types/recipe';
import { recipeImages } from './images';

export const recipes: Recipe[] = [
{
  id: 'kiribath', title: 'Kiribath with Lunu Miris', description: 'Coconut milk rice set into diamonds, with a fiery onion–chilli sambol.',
  intro: 'In Sri Lanka, kiribath marks beginnings — the first morning of the year, a new home, a birthday. It is soft, gently salted and made to be shared.',
  image: recipeImages.kiribath, mealType: 'breakfast', categories: ['Breakfast', 'Sri Lankan', 'Vegan', 'Vegetarian', 'Family'], cuisine: 'Sri Lankan',
  prepTime: 10, cookTime: 25, difficulty: 'Easy', servings: 4, nutrition: { calories: 410, protein: 7, carbs: 62, fat: 15, fibre: 3 },
  diets: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'], allergens: ['coconut'], goals: ['weight-gain', 'wellness', 'dietary'],
  ingredients: [
  { name: 'Raw white or red rice', qty: 2, unit: 'cups', key: 'rice' },
  { name: 'Thick coconut milk', qty: 1.5, unit: 'cups', key: 'coconut milk' },
  { name: 'Salt', qty: 1, unit: 'tsp', key: 'salt' },
  { name: 'Red onion', qty: 1, unit: 'medium', key: 'onion' },
  { name: 'Chilli flakes', qty: 1, unit: 'tbsp', key: 'chilli' },
  { name: 'Lime', qty: 1, unit: 'whole', key: 'lime' }],

  steps: [
  'Rinse the rice until the water runs clear, then cook it with 3 cups of water until very soft, about 15 minutes.',
  'Stir in the coconut milk and salt. Keep stirring over low heat until the rice turns thick, glossy and creamy.',
  'Spread onto a flat plate and smooth the top with a banana leaf or the back of a spoon. Let it set for 5 minutes.',
  'For the lunu miris, pound the onion, chilli flakes and a pinch of salt into a coarse paste, then finish with lime juice.',
  'Cut the kiribath into diamonds and serve warm with the sambol alongside.'],

  featured: true, trendingRank: 2, addedDaysAgo: 40
},
{
  id: 'red-rice-dhal', title: 'Red Rice & Parippu Dhal Bowl', description: 'Nutty red rice, silky tempered dhal and wilted greens.',
  intro: 'The quiet backbone of a Sri Lankan lunch. Red lentils simmered in coconut milk, finished with a sizzling tempering of curry leaves and mustard seeds.',
  image: recipeImages.redRiceDhal, mealType: 'lunch', categories: ['Lunch', 'Sri Lankan', 'Healthy', 'Vegan', 'Vegetarian', 'Family'], cuisine: 'Sri Lankan',
  prepTime: 10, cookTime: 30, difficulty: 'Easy', servings: 4, nutrition: { calories: 480, protein: 18, carbs: 78, fat: 10, fibre: 11 },
  diets: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'], allergens: ['coconut'], goals: ['balanced', 'wellness', 'weight-loss', 'healthy-lifestyle', 'dietary'],
  ingredients: [
  { name: 'Red rice', qty: 1.5, unit: 'cups', key: 'rice' },
  { name: 'Red lentils (masoor)', qty: 1, unit: 'cup', key: 'lentil' },
  { name: 'Coconut milk', qty: 1, unit: 'cup', key: 'coconut milk' },
  { name: 'Turmeric', qty: 0.5, unit: 'tsp', key: 'turmeric' },
  { name: 'Curry leaves', qty: 1, unit: 'sprig', key: 'curry leaves' },
  { name: 'Mustard seeds', qty: 1, unit: 'tsp', key: 'mustard' },
  { name: 'Garlic', qty: 3, unit: 'cloves', key: 'garlic' },
  { name: 'Red onion', qty: 1, unit: 'whole', key: 'onion' },
  { name: 'Spinach', qty: 2, unit: 'cups', key: 'spinach' }],

  steps: [
  'Rinse the red rice and simmer in plenty of water for 30 minutes until tender, then drain.',
  'Meanwhile, cook the lentils with turmeric and 2 cups of water until soft and collapsing, about 15 minutes.',
  'Stir the coconut milk into the lentils and season with salt. Keep it at a gentle simmer.',
  'In a small pan, heat oil and fry the mustard seeds, curry leaves, sliced onion and garlic until golden. Pour over the dhal.',
  'Wilt the spinach in the hot pan for a minute and serve everything together in a bowl.'],

  addedDaysAgo: 22
},
{
  id: 'shakshuka', title: 'Smoked Tomato Shakshuka', description: 'Eggs gently poached in smoky tomato and pepper, with sourdough.',
  intro: 'A pan to put in the centre of the table. Tomatoes cooked down with cumin and smoked paprika until jammy, then eggs set softly in little wells.',
  image: recipeImages.shakshuka, mealType: 'breakfast', categories: ['Breakfast', 'Vegetarian', 'Healthy', 'Quick', 'International'], cuisine: 'Middle Eastern',
  prepTime: 10, cookTime: 20, difficulty: 'Easy', servings: 2, nutrition: { calories: 390, protein: 20, carbs: 28, fat: 22, fibre: 7 },
  diets: ['vegetarian', 'dairy-free'], allergens: ['egg', 'gluten'], goals: ['balanced', 'muscle', 'healthy-lifestyle', 'wellness'],
  ingredients: [
  { name: 'Eggs', qty: 4, unit: 'whole', key: 'egg' },
  { name: 'Tomatoes', qty: 6, unit: 'whole', key: 'tomato' },
  { name: 'Red pepper', qty: 1, unit: 'whole', key: 'pepper' },
  { name: 'Red onion', qty: 1, unit: 'whole', key: 'onion' },
  { name: 'Garlic', qty: 2, unit: 'cloves', key: 'garlic' },
  { name: 'Smoked paprika', qty: 1, unit: 'tsp', key: 'paprika' },
  { name: 'Ground cumin', qty: 1, unit: 'tsp', key: 'cumin' },
  { name: 'Sourdough bread', qty: 2, unit: 'slices', key: 'bread' },
  { name: 'Olive oil', qty: 2, unit: 'tbsp', key: 'olive oil' }],

  steps: [
  'Warm the olive oil in a wide pan and soften the sliced onion and pepper for 6 minutes.',
  'Add garlic, cumin and smoked paprika and stir for 30 seconds until fragrant.',
  'Add the chopped tomatoes with a pinch of salt and simmer for 10 minutes until thick and jammy.',
  'Make four wells, crack in the eggs, cover and cook on low for 5–6 minutes until the whites are set.',
  'Scatter with herbs and serve straight from the pan with toasted sourdough.'],

  addedDaysAgo: 5
},
{
  id: 'salmon-bowl', title: 'Miso Salmon & Black Rice Bowl', description: 'Lacquered salmon over black rice, edamame and quick-pickled cucumber.',
  intro: 'A restaurant-style bowl at home. White miso caramelises on the salmon under a hot grill, set against the deep nuttiness of black rice.',
  image: recipeImages.salmonBowl, mealType: 'dinner', categories: ['Dinner', 'High-protein', 'Healthy', 'International'], cuisine: 'Japanese',
  prepTime: 15, cookTime: 20, difficulty: 'Medium', servings: 2, nutrition: { calories: 620, protein: 42, carbs: 58, fat: 22, fibre: 6 },
  diets: ['dairy-free'], allergens: ['fish', 'soy', 'sesame'], goals: ['muscle', 'weight-gain', 'balanced'],
  ingredients: [
  { name: 'Salmon fillets', qty: 2, unit: 'fillets', key: 'salmon' },
  { name: 'Black rice', qty: 1, unit: 'cup', key: 'rice' },
  { name: 'White miso', qty: 2, unit: 'tbsp', key: 'miso' },
  { name: 'Edamame', qty: 1, unit: 'cup', key: 'edamame' },
  { name: 'Cucumber', qty: 1, unit: 'whole', key: 'cucumber' },
  { name: 'Fresh ginger', qty: 1, unit: 'thumb', key: 'ginger' },
  { name: 'Sesame seeds', qty: 1, unit: 'tbsp', key: 'sesame' }],

  steps: [
  'Simmer the black rice in salted water for 25–30 minutes until tender with a little bite.',
  'Thinly slice the cucumber and toss with a pinch of salt and a splash of rice vinegar.',
  'Mix the miso with grated ginger and a teaspoon of water, then brush thickly over the salmon.',
  'Grill the salmon on high for 7–8 minutes until the glaze blisters and the fish flakes.',
  'Blanch the edamame for 2 minutes. Build bowls with rice, salmon, cucumber and edamame, then finish with sesame.'],

  featured: true, trendingRank: 4, addedDaysAgo: 12
},
{
  id: 'overnight-oats', title: 'Kurakkan & Oat Overnight Pot', description: 'Finger millet and oats soaked overnight with yogurt, berries and kithul.',
  intro: 'Kurakkan, the finger millet of Sri Lankan villages, brings an earthy depth to a make-ahead breakfast you can take straight from the fridge.',
  image: recipeImages.oats, mealType: 'breakfast', categories: ['Breakfast', 'Healthy', 'Vegetarian', 'Quick'], cuisine: 'Global',
  prepTime: 10, cookTime: 0, difficulty: 'Easy', servings: 2, nutrition: { calories: 360, protein: 16, carbs: 52, fat: 9, fibre: 8 },
  diets: ['vegetarian'], allergens: ['dairy', 'gluten'], goals: ['weight-loss', 'balanced', 'wellness', 'healthy-lifestyle'],
  ingredients: [
  { name: 'Rolled oats', qty: 1, unit: 'cup', key: 'oats' },
  { name: 'Kurakkan (finger millet) flour', qty: 2, unit: 'tbsp', key: 'kurakkan' },
  { name: 'Greek yogurt', qty: 1, unit: 'cup', key: 'yogurt' },
  { name: 'Milk', qty: 0.5, unit: 'cup', key: 'milk' },
  { name: 'Mixed berries', qty: 1, unit: 'cup', key: 'berries' },
  { name: 'Kithul treacle', qty: 1, unit: 'tbsp', key: 'treacle' }],

  steps: [
  'Toast the kurakkan flour in a dry pan for 2 minutes until it smells nutty. Let it cool.',
  'Stir together oats, kurakkan, yogurt and milk until smooth.',
  'Spoon into two jars, cover and refrigerate overnight, or at least 4 hours.',
  'In the morning, top with berries and a thread of kithul treacle.'],

  addedDaysAgo: 3
},
{
  id: 'pesto-pasta', title: 'Basil Pesto Linguine', description: 'Bright hand-pounded pesto with parmesan and toasted pine nuts.',
  intro: 'A ten-minute dinner that tastes like summer in Liguria. Pound the basil rather than blend it, and it stays vivid green.',
  image: recipeImages.pesto, mealType: 'dinner', categories: ['Dinner', 'Vegetarian', 'Quick', 'International', 'Family'], cuisine: 'Italian',
  prepTime: 10, cookTime: 12, difficulty: 'Easy', servings: 4, nutrition: { calories: 640, protein: 20, carbs: 78, fat: 28, fibre: 5 },
  diets: ['vegetarian'], allergens: ['gluten', 'dairy', 'nuts'], goals: ['weight-gain', 'dietary'],
  ingredients: [
  { name: 'Linguine', qty: 400, unit: 'g', key: 'pasta' },
  { name: 'Fresh basil', qty: 2, unit: 'cups', key: 'basil' },
  { name: 'Parmesan', qty: 50, unit: 'g', key: 'parmesan' },
  { name: 'Pine nuts', qty: 40, unit: 'g', key: 'pine nuts' },
  { name: 'Garlic', qty: 1, unit: 'clove', key: 'garlic' },
  { name: 'Olive oil', qty: 0.5, unit: 'cup', key: 'olive oil' },
  { name: 'Lemon', qty: 1, unit: 'whole', key: 'lemon' }],

  steps: [
  'Bring a large pot of well-salted water to the boil and cook the linguine until al dente.',
  'Toast the pine nuts in a dry pan until golden, watching closely.',
  'Pound the garlic, basil and most of the pine nuts with a pinch of salt, then stir in the parmesan and olive oil.',
  'Toss the drained pasta with the pesto and a splash of pasta water until glossy.',
  'Finish with lemon zest, the remaining pine nuts and extra parmesan.'],

  addedDaysAgo: 30
},
{
  id: 'chickpea-curry', title: 'Pumpkin & Chickpea Coconut Curry', description: 'Golden pumpkin and chickpeas in roasted curry spices and coconut.',
  intro: 'Sri Lankan roasted curry powder gives this curry its toasted, almost smoky warmth. The pumpkin melts partly into the sauce, thickening it naturally.',
  image: recipeImages.chickpea, mealType: 'dinner', categories: ['Dinner', 'Vegan', 'Vegetarian', 'Healthy', 'Sri Lankan', 'Family'], cuisine: 'Sri Lankan',
  prepTime: 15, cookTime: 30, difficulty: 'Easy', servings: 4, nutrition: { calories: 520, protein: 17, carbs: 64, fat: 21, fibre: 14 },
  diets: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'], allergens: ['coconut'], goals: ['balanced', 'wellness', 'weight-loss', 'healthy-lifestyle', 'dietary'],
  ingredients: [
  { name: 'Pumpkin', qty: 500, unit: 'g', key: 'pumpkin' },
  { name: 'Chickpeas', qty: 2, unit: 'cups', key: 'chickpea' },
  { name: 'Coconut milk', qty: 1, unit: 'can', key: 'coconut milk' },
  { name: 'Red onion', qty: 1, unit: 'whole', key: 'onion' },
  { name: 'Garlic', qty: 3, unit: 'cloves', key: 'garlic' },
  { name: 'Ginger', qty: 1, unit: 'thumb', key: 'ginger' },
  { name: 'Roasted curry powder', qty: 2, unit: 'tbsp', key: 'curry powder' },
  { name: 'Curry leaves', qty: 1, unit: 'sprig', key: 'curry leaves' },
  { name: 'Fresh coriander', qty: 1, unit: 'handful', key: 'coriander' }],

  steps: [
  'Fry the onion, garlic, ginger and curry leaves in a little oil until soft and fragrant.',
  'Add the roasted curry powder and stir for 30 seconds without letting it burn.',
  'Add the cubed pumpkin and chickpeas, stir to coat, then pour in the coconut milk and half a cup of water.',
  'Simmer gently for 20–25 minutes until the pumpkin is tender and the sauce has thickened.',
  'Season with salt, scatter with coriander and serve with red rice.'],

  featured: true, trendingRank: 5, addedDaysAgo: 8
},
{
  id: 'avocado-toast', title: 'Avocado Toast with a Jammy Egg', description: 'Crushed avocado on sourdough, lime, chilli and a 6½-minute egg.',
  intro: 'Simple food done carefully. The egg is timed for a set white and a molten, jammy yolk that becomes the sauce.',
  image: recipeImages.avocadoToast, mealType: 'breakfast', categories: ['Breakfast', 'Snacks', 'Vegetarian', 'Quick', 'Healthy'], cuisine: 'Global',
  prepTime: 5, cookTime: 7, difficulty: 'Easy', servings: 1, nutrition: { calories: 420, protein: 17, carbs: 34, fat: 24, fibre: 9 },
  diets: ['vegetarian', 'dairy-free'], allergens: ['gluten', 'egg'], goals: ['balanced', 'muscle', 'healthy-lifestyle'],
  ingredients: [
  { name: 'Sourdough bread', qty: 2, unit: 'slices', key: 'bread' },
  { name: 'Avocado', qty: 1, unit: 'whole', key: 'avocado' },
  { name: 'Egg', qty: 1, unit: 'whole', key: 'egg' },
  { name: 'Lime', qty: 0.5, unit: 'whole', key: 'lime' },
  { name: 'Chilli flakes', qty: 1, unit: 'pinch', key: 'chilli' },
  { name: 'Microgreens', qty: 1, unit: 'handful', key: 'greens' }],

  steps: [
  'Lower the egg into boiling water and cook for exactly 6½ minutes, then cool in cold water.',
  'Toast the sourdough until deeply golden.',
  'Crush the avocado with lime juice and a pinch of salt.',
  'Spread over the toast, add the halved egg, chilli flakes and microgreens.'],

  addedDaysAgo: 18
},
{
  id: 'chocolate-mousse', title: 'Dark Chocolate & Coconut Mousse', description: 'A silky, dairy-free mousse with cacao nibs and toasted coconut.',
  intro: 'Chilled coconut cream whips into clouds, then folds into melted dark chocolate. Sweetened with kithul treacle for a caramel depth.',
  image: recipeImages.mousse, mealType: 'dessert', categories: ['Desserts', 'Vegan', 'Vegetarian'], cuisine: 'Global',
  prepTime: 15, cookTime: 0, difficulty: 'Medium', servings: 4, nutrition: { calories: 310, protein: 4, carbs: 22, fat: 24, fibre: 4 },
  diets: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'], allergens: ['coconut'], goals: ['dietary', 'weight-gain'],
  ingredients: [
  { name: 'Dark chocolate (70%)', qty: 150, unit: 'g', key: 'chocolate' },
  { name: 'Coconut cream (chilled)', qty: 1, unit: 'can', key: 'coconut' },
  { name: 'Kithul treacle', qty: 2, unit: 'tbsp', key: 'treacle' },
  { name: 'Vanilla extract', qty: 1, unit: 'tsp', key: 'vanilla' },
  { name: 'Cacao nibs', qty: 1, unit: 'tbsp', key: 'cacao' }],

  steps: [
  'Melt the chocolate gently over a pan of barely simmering water, then let it cool slightly.',
  'Scoop the solid coconut cream from the chilled can and whip with the treacle and vanilla until fluffy.',
  'Fold a third of the cream into the chocolate, then gently fold in the rest.',
  'Spoon into glasses and chill for at least an hour. Top with cacao nibs and toasted coconut.'],

  addedDaysAgo: 2
},
{
  id: 'gotukola-sambol', title: 'Gotukola Sambol', description: 'Finely shredded pennywort with fresh coconut, lime and onion.',
  intro: 'Gotukola is eaten across Sri Lanka as a fresh, slightly bitter herb salad. Shred it finely and dress it just before serving to keep it bright.',
  image: recipeImages.gotukola, mealType: 'lunch', categories: ['Lunch', 'Sri Lankan', 'Vegan', 'Vegetarian', 'Healthy', 'Quick'], cuisine: 'Sri Lankan',
  prepTime: 15, cookTime: 0, difficulty: 'Easy', servings: 2, nutrition: { calories: 160, protein: 3, carbs: 9, fat: 12, fibre: 5 },
  diets: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'], allergens: ['coconut'], goals: ['weight-loss', 'wellness', 'healthy-lifestyle', 'balanced', 'dietary'],
  ingredients: [
  { name: 'Gotukola leaves', qty: 2, unit: 'bunches', key: 'gotukola' },
  { name: 'Fresh grated coconut', qty: 0.5, unit: 'cup', key: 'coconut' },
  { name: 'Red onion', qty: 1, unit: 'small', key: 'onion' },
  { name: 'Green chilli', qty: 1, unit: 'whole', key: 'chilli' },
  { name: 'Lime', qty: 1, unit: 'whole', key: 'lime' },
  { name: 'Salt', qty: 0.5, unit: 'tsp', key: 'salt' }],

  steps: [
  'Wash the gotukola well and pat completely dry.',
  'Bunch the leaves tightly and slice as finely as you can.',
  'Finely chop the onion and green chilli.',
  'Just before serving, toss everything with the coconut, lime juice and salt.'],

  trendingRank: 3, addedDaysAgo: 1
},
{
  id: 'pumpkin-soup', title: 'Roasted Pumpkin & Ginger Soup', description: 'Velvety roasted pumpkin, warming ginger and a swirl of coconut cream.',
  intro: 'Roasting the pumpkin first concentrates its sweetness. Ginger keeps it lively, and toasted seeds add the crunch.',
  image: recipeImages.pumpkinSoup, mealType: 'lunch', categories: ['Lunch', 'Vegan', 'Vegetarian', 'Healthy', 'Family'], cuisine: 'Global',
  prepTime: 10, cookTime: 35, difficulty: 'Easy', servings: 4, nutrition: { calories: 280, protein: 6, carbs: 34, fat: 14, fibre: 7 },
  diets: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'], allergens: ['coconut'], goals: ['weight-loss', 'wellness', 'healthy-lifestyle', 'balanced'],
  ingredients: [
  { name: 'Pumpkin', qty: 800, unit: 'g', key: 'pumpkin' },
  { name: 'Fresh ginger', qty: 1, unit: 'thumb', key: 'ginger' },
  { name: 'Red onion', qty: 1, unit: 'whole', key: 'onion' },
  { name: 'Garlic', qty: 2, unit: 'cloves', key: 'garlic' },
  { name: 'Vegetable stock', qty: 1, unit: 'L', key: 'stock' },
  { name: 'Coconut cream', qty: 0.25, unit: 'cup', key: 'coconut' },
  { name: 'Pumpkin seeds', qty: 2, unit: 'tbsp', key: 'seeds' }],

  steps: [
  'Roast the cubed pumpkin with a little oil and salt at 200°C for 25 minutes until caramelised.',
  'Soften the onion, garlic and grated ginger in a pot for 5 minutes.',
  'Add the roasted pumpkin and stock and simmer for 10 minutes.',
  'Blend until velvety, season, and serve with a swirl of coconut cream and toasted seeds.'],

  addedDaysAgo: 14
},
{
  id: 'chicken-stirfry', title: 'Ginger Chicken & Greens Stir-fry', description: 'Fast, glossy wok-fried chicken with bok choy, carrot and spring onion.',
  intro: 'Have everything chopped before the wok heats — the cooking itself takes under ten minutes, and the high heat is what makes it taste right.',
  image: recipeImages.stirfry, mealType: 'dinner', categories: ['Dinner', 'High-protein', 'Quick', 'Healthy', 'International'], cuisine: 'Pan-Asian',
  prepTime: 15, cookTime: 12, difficulty: 'Medium', servings: 2, nutrition: { calories: 540, protein: 46, carbs: 38, fat: 20, fibre: 6 },
  diets: ['dairy-free'], allergens: ['soy', 'sesame'], goals: ['muscle', 'weight-loss', 'balanced', 'weight-gain'],
  ingredients: [
  { name: 'Chicken breast', qty: 400, unit: 'g', key: 'chicken' },
  { name: 'Fresh ginger', qty: 2, unit: 'thumbs', key: 'ginger' },
  { name: 'Garlic', qty: 3, unit: 'cloves', key: 'garlic' },
  { name: 'Bok choy', qty: 2, unit: 'heads', key: 'bok choy' },
  { name: 'Carrots', qty: 1, unit: 'whole', key: 'carrot' },
  { name: 'Soy sauce', qty: 2, unit: 'tbsp', key: 'soy' },
  { name: 'Sesame oil', qty: 1, unit: 'tsp', key: 'sesame' },
  { name: 'Spring onions', qty: 3, unit: 'whole', key: 'spring onion' },
  { name: 'Cooked rice', qty: 2, unit: 'cups', key: 'rice' }],

  steps: [
  'Slice the chicken thinly and toss with a teaspoon of soy sauce.',
  'Heat a wok until smoking, add oil and sear the chicken in one layer for 3 minutes. Remove.',
  'Stir-fry ginger, garlic and carrot for 1 minute, then add the bok choy.',
  'Return the chicken with the remaining soy sauce and a splash of water. Toss until glossy.',
  'Finish with sesame oil and spring onions and serve over rice.'],

  trendingRank: 6, addedDaysAgo: 26
},
{
  id: 'fried-rice', title: 'Second-Day Vegetable Fried Rice', description: 'Yesterday’s rice, crisped in the wok with vegetables and a fried egg.',
  intro: 'Cold, day-old rice is the secret — the grains are drier and fry instead of steaming. One of the best reasons to cook a little extra rice.',
  image: recipeImages.friedRice, mealType: 'lunch', categories: ['Lunch', 'Vegetarian', 'Quick', 'Family', 'International'], cuisine: 'Pan-Asian',
  prepTime: 10, cookTime: 12, difficulty: 'Easy', servings: 2, nutrition: { calories: 510, protein: 16, carbs: 72, fat: 16, fibre: 5 },
  diets: ['vegetarian', 'dairy-free'], allergens: ['egg', 'soy'], goals: ['weight-gain', 'balanced', 'dietary'],
  ingredients: [
  { name: 'Cooked rice (day-old)', qty: 3, unit: 'cups', key: 'rice' },
  { name: 'Eggs', qty: 2, unit: 'whole', key: 'egg' },
  { name: 'Carrots', qty: 1, unit: 'whole', key: 'carrot' },
  { name: 'Leeks', qty: 1, unit: 'whole', key: 'leek' },
  { name: 'Cabbage', qty: 1, unit: 'cup', key: 'cabbage' },
  { name: 'Garlic', qty: 2, unit: 'cloves', key: 'garlic' },
  { name: 'Soy sauce', qty: 1.5, unit: 'tbsp', key: 'soy' },
  { name: 'Spring onions', qty: 2, unit: 'whole', key: 'spring onion' },
  { name: 'Coconut oil', qty: 1, unit: 'tbsp', key: 'oil' }],

  steps: [
  'Break up the cold rice with your fingers so there are no clumps.',
  'Heat the oil in a wok and stir-fry the garlic, carrot, leek and cabbage for 3 minutes.',
  'Add the rice and spread it out. Let it sit for 1 minute to crisp, then toss. Repeat twice.',
  'Season with soy sauce and spring onions.',
  'Fry the eggs separately until the edges are lacy, and lay one over each bowl.'],

  trendingRank: 1, addedDaysAgo: 6
},
{
  id: 'smoothie-bowl', title: 'Mango & Papaya Sunrise Bowl', description: 'Thick tropical fruit blend with passion fruit, banana and chia.',
  intro: 'A bowl of Sri Lankan sunshine. Freeze ripe bananas ahead of time for a thick, spoonable texture without ice.',
  image: recipeImages.smoothieBowl, mealType: 'snack', categories: ['Snacks', 'Breakfast', 'Vegan', 'Vegetarian', 'Healthy', 'Quick'], cuisine: 'Global',
  prepTime: 8, cookTime: 0, difficulty: 'Easy', servings: 1, nutrition: { calories: 330, protein: 6, carbs: 62, fat: 9, fibre: 9 },
  diets: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'], allergens: ['coconut'], goals: ['wellness', 'healthy-lifestyle', 'weight-loss', 'balanced'],
  ingredients: [
  { name: 'Ripe mango', qty: 1, unit: 'whole', key: 'mango' },
  { name: 'Papaya', qty: 1, unit: 'cup', key: 'papaya' },
  { name: 'Frozen banana', qty: 1, unit: 'whole', key: 'banana' },
  { name: 'Passion fruit', qty: 1, unit: 'whole', key: 'passion' },
  { name: 'Coconut flakes', qty: 1, unit: 'tbsp', key: 'coconut' },
  { name: 'Chia seeds', qty: 1, unit: 'tsp', key: 'chia' }],

  steps: [
  'Blend the mango, papaya and frozen banana until thick and smooth, adding a splash of water only if needed.',
  'Pour into a chilled bowl.',
  'Top with banana slices, passion fruit pulp, coconut flakes and chia seeds.'],

  addedDaysAgo: 9
},
{
  id: 'green-gram', title: 'Mung Ata with Coconut & Chilli', description: 'Tender green gram tossed with coconut, dried chilli and curry leaves.',
  intro: 'A classic Sri Lankan tea-time snack — humble, filling and quietly protein-rich. Often served on a Poya day morning.',
  image: recipeImages.greenGram, mealType: 'snack', categories: ['Snacks', 'Sri Lankan', 'Vegan', 'Vegetarian', 'High-protein', 'Healthy'], cuisine: 'Sri Lankan',
  prepTime: 5, cookTime: 25, difficulty: 'Easy', servings: 3, nutrition: { calories: 260, protein: 14, carbs: 36, fat: 7, fibre: 12 },
  diets: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'], allergens: ['coconut'], goals: ['muscle', 'balanced', 'wellness', 'weight-loss'],
  ingredients: [
  { name: 'Green gram (mung beans), soaked', qty: 1, unit: 'cup', key: 'green gram' },
  { name: 'Grated coconut', qty: 0.25, unit: 'cup', key: 'coconut' },
  { name: 'Dried red chilli', qty: 1, unit: 'whole', key: 'chilli' },
  { name: 'Red onion', qty: 0.5, unit: 'whole', key: 'onion' },
  { name: 'Curry leaves', qty: 1, unit: 'sprig', key: 'curry leaves' },
  { name: 'Salt', qty: 0.5, unit: 'tsp', key: 'salt' }],

  steps: [
  'Boil the soaked green gram in salted water for 20–25 minutes until tender but whole. Drain.',
  'Temper the onion, curry leaves and broken chilli in a little oil for a minute.',
  'Toss the green gram with the tempering and grated coconut. Serve warm.'],

  addedDaysAgo: 4
},
{
  id: 'panzanella', title: 'Day-Old Bread & Tomato Panzanella', description: 'Toasted stale bread soaking up ripe tomatoes, basil and olive oil.',
  intro: 'Italy’s answer to the leftover loaf. The bread drinks up tomato juices and olive oil, becoming the best part of the salad.',
  image: recipeImages.panzanella, mealType: 'lunch', categories: ['Lunch', 'Vegetarian', 'Vegan', 'Quick', 'Healthy', 'International'], cuisine: 'Italian',
  prepTime: 15, cookTime: 8, difficulty: 'Easy', servings: 3, nutrition: { calories: 340, protein: 8, carbs: 42, fat: 16, fibre: 5 },
  diets: ['vegetarian', 'vegan', 'dairy-free'], allergens: ['gluten'], goals: ['wellness', 'balanced', 'healthy-lifestyle'],
  ingredients: [
  { name: 'Day-old sourdough bread', qty: 4, unit: 'slices', key: 'bread' },
  { name: 'Ripe tomatoes', qty: 4, unit: 'whole', key: 'tomato' },
  { name: 'Cucumber', qty: 1, unit: 'whole', key: 'cucumber' },
  { name: 'Red onion', qty: 0.5, unit: 'whole', key: 'onion' },
  { name: 'Fresh basil', qty: 1, unit: 'handful', key: 'basil' },
  { name: 'Olive oil', qty: 3, unit: 'tbsp', key: 'olive oil' },
  { name: 'Red wine vinegar', qty: 1, unit: 'tbsp', key: 'vinegar' }],

  steps: [
  'Tear the bread into bite-sized pieces and toast in a hot pan with a little olive oil until crisp.',
  'Chop the tomatoes and salt them in a large bowl for 5 minutes to draw out their juices.',
  'Add the cucumber, thinly sliced onion, vinegar and remaining oil.',
  'Toss in the bread and basil and let it rest for 10 minutes before serving.'],

  addedDaysAgo: 11
}];