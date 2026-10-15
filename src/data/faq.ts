export const faqGroups = [
{ topic: 'AI Coach', items: [
  { q: 'Is the AI Coach a real AI?', a: 'No. In this prototype the coach is a transparent, rule-based simulation that runs in your browser. It reads your profile, allergies and kitchen to choose its answers. No external AI service is connected.' },
  { q: 'Can the coach give medical advice?', a: 'No. The coach offers general food ideas only. For medical or dietary conditions, please speak with a qualified professional.' }]
},
{ topic: 'Build a Plan', items: [
  { q: 'What does Build a Plan ask?', a: 'Your goal, favourite and disliked foods, dietary choices, allergies, cooking confidence and portion style. It never asks about budget, schedule or available cooking time.' },
  { q: 'Where do I find Build a Plan?', a: 'Inside the AI Coach — choose “Build My Food Plan”. When you finish, you can save your preferences or go straight to My Plan.' }]
},
{ topic: 'My Plan', items: [
  { q: 'How is my plan generated?', a: 'DailyPlate picks five meals a day for seven days from recipes and simple meals that fit your profile, ranking them by your goal (for example, more protein-containing options for muscle-supportive eating). Changing your goal creates a different week.' },
  { q: 'Are the calories accurate?', a: 'They are rough estimates for orientation, scaled to your portion style — not a prescription.' }]
},
{ topic: 'Recipes', items: [
  { q: 'Why is a recipe marked “Not for you”?', a: 'It contains one of your allergens, doesn’t match a dietary restriction, or includes a food you dislike. Turn on “Fits my profile” to hide these entirely.' },
  { q: 'How does Cooking Mode work?', a: 'It shows one instruction at a time with Previous and Next controls, a progress bar and an ingredient checklist. You can also use the arrow keys.' }]
},
{ topic: 'Pantry', items: [
  { q: 'What is My Kitchen used for?', a: 'It keeps track of ingredients, quantities and expiry dates. Recipes, the coach and Food Rescue use it to tell you what you already have.' }]
},
{ topic: 'Food Waste', items: [
  { q: 'Does DailyPlate calculate my environmental impact?', a: 'No. Summaries are based only on what you log. We don’t estimate environmental impact figures.' },
  { q: 'How are leftover recipes chosen?', a: 'By matching your leftover to recipe ingredients, then filtering out anything that conflicts with your allergies, diet or dislikes, and ranking by what else you already have.' }]
},
{ topic: 'Allergies, profile & personalisation', items: [
  { q: 'If I change an allergy, what updates?', a: 'Everything: coach answers, Build a Plan, My Plan (you’ll be prompted to regenerate), recipe filtering and leftover suggestions.' },
  { q: 'Where is my data stored?', a: 'Only in this browser’s localStorage. You can export or reset it in Settings. This is a prototype — please don’t use a real password.' }]
}];