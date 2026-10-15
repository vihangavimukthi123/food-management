import { images, recipeImages } from './images';

export const worlds = [
{ name: 'My Culinary World', place: 'Dashboard', text: 'A warm, sunlit home for today’s food, your plan and what’s waiting in your kitchen.', image: images.dashboard, to: '/app' },
{ name: 'Botanical Intelligence Studio', place: 'AI Coach & Build a Plan', text: 'A calm companion that knows your goal, your allergies and what you love to eat.', image: images.coach, to: '/app/coach' },
{ name: 'The Wellness Sanctuary', place: 'My Plan', text: 'Your goal, turned into a gentle week of meals you can follow and tick off.', image: images.plan, to: '/app/plan' },
{ name: 'The Recipe Atelier', place: 'Recipe discovery', text: 'A culinary magazine of Sri Lankan and international dishes, filtered to you.', image: recipeImages.pesto, to: '/app/recipes' },
{ name: 'The Cooking Atelier', place: 'Recipe details & Cooking Mode', text: 'One step at a time, in a quiet, distraction-free studio.', image: images.about, to: '/app/recipes/chickpea-curry' },
{ name: 'The Ingredient Garden', place: 'My Kitchen', text: 'A living pantry that knows what’s fresh, what’s low and what to use first.', image: images.kitchen, to: '/app/kitchen' },
{ name: 'Food Rescue', place: 'Food waste', text: 'Where day-old bread and leftover rice get a second, delicious chance.', image: images.wasteBefore, to: '/app/waste' },
{ name: 'The Flavour Lab', place: 'Ingredient substitutions', text: 'Kurakkan for flour, kithul for honey — thoughtful swaps with reasons.', image: images.lab, to: '/app/substitutions' },
{ name: 'Your Food Identity', place: 'Profile', text: 'Everything DailyPlate knows about how you like to eat, in one place.', image: images.profile, to: '/app/profile' },
{ name: 'The Innovation Universe', place: 'How it all connects', text: 'See how every part of DailyPlate learns from every other part.', image: images.novelty, to: '/novelty' }];


export const principles = [
{ title: 'Every ingredient has a story.', text: 'Red rice from the paddies, gotukola from the garden wall, coconut from the tree outside. We keep that story visible.' },
{ title: 'Every meal has a purpose.', text: 'Fuel for a training day, comfort on a slow evening, a dish to share. Meals are planned around what you need.' },
{ title: 'Every person has a food identity.', text: 'Your allergies, favourites, cooking confidence and goals shape everything you see — everywhere.' },
{ title: 'Every leftover has another possibility.', text: 'Yesterday’s rice is tomorrow’s fried rice. Nothing in your kitchen should lose its possibility.' }];


export const comparison = [
{ feature: 'Recipes filtered by your allergies everywhere', dp: true, recipe: false, planner: 'partial' },
{ feature: 'A coach that reads your food profile', dp: true, recipe: false, planner: false },
{ feature: 'Goal-based weekly meal plan', dp: true, recipe: false, planner: true },
{ feature: 'Knows what’s in your kitchen', dp: true, recipe: false, planner: 'partial' },
{ feature: 'Turns leftovers into recipes', dp: true, recipe: false, planner: false },
{ feature: 'Local Sri Lankan ingredient swaps', dp: true, recipe: 'partial', planner: false },
{ feature: 'No budget or schedule questions', dp: true, recipe: true, planner: false }];


export const testimonials = [
{ quote: 'I told it I can’t eat dairy once, and it simply never forgot. Every recipe, every plan, every suggestion — it just fits.', name: 'Amaya R.', role: 'Teacher, Kandy' },
{ quote: 'The leftover rice idea saved my Tuesday dinner. And probably a lot of rice.', name: 'Daniel K.', role: 'Nurse, Galle' },
{ quote: 'It feels like opening a food magazine that already knows me.', name: 'Ishara P.', role: 'Architecture student, Colombo' }];


export const gallery = [
{ image: recipeImages.kiribath, caption: 'Kiribath, cut into diamonds', tall: true },
{ image: recipeImages.salmonBowl, caption: 'Miso salmon, black rice', tall: false },
{ image: recipeImages.gotukola, caption: 'Gotukola sambol', tall: false },
{ image: recipeImages.mousse, caption: 'Chocolate & coconut', tall: true },
{ image: recipeImages.smoothieBowl, caption: 'Mango & papaya sunrise', tall: false },
{ image: recipeImages.shakshuka, caption: 'Smoked tomato shakshuka', tall: true },
{ image: recipeImages.pumpkinSoup, caption: 'Roasted pumpkin & ginger', tall: false },
{ image: recipeImages.greenGram, caption: 'Mung ata, curry leaves', tall: false }];