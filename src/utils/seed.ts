import { pantrySeed, wasteSeed } from '../data/pantry';
import { recipeImages } from '../data/images';
import { UserData } from '../types/store';
import { Profile, Settings } from '../types/user';
import { isoDaysFromNow, uid } from './dates';
import { generatePlan } from './plan';

export function defaultProfile(name: string, demo: boolean): Profile {
  return {
    name,
    age: demo ? '27' : '',
    location: demo ? 'Colombo, Sri Lanka' : '',
    occupation: demo ? 'Product designer' : '',
    avatar: '',
    goal: 'balanced',
    allergies: demo ? ['peanuts'] : [],
    restrictions: [],
    favourites: demo ? ['Rice & curry', 'Mango', 'Pumpkin'] : [],
    dislikes: demo ? ['Bitter gourd'] : [],
    mealTypes: ['breakfast', 'lunch', 'dinner', 'snack'],
    categories: demo ? ['Healthy', 'Sri Lankan'] : [],
    cuisines: demo ? ['Sri Lankan', 'Japanese'] : [],
    cookingLevel: 'intermediate',
    portion: 'standard',
    spice: 'medium',
    equipment: demo ? ['Stove', 'Air fryer', 'Rice cooker', 'Blender', 'Wok'] : ['Stove', 'Rice cooker'],
    preferredIngredients: demo ? ['Coconut', 'Red rice', 'Curry leaves'] : [],
    schedule: {
      days: { MON: 'free', TUE: 'busy', WED: 'free', THU: 'gym', FRI: 'busy', SAT: 'free', SUN: 'free' },
      maxCookTime: 20
    },
    budget: 'balanced',
    planBuilt: false
  };
}

export const defaultSettings: Settings = {
  mealReminders: true,
  expiryAlerts: true,
  weeklySummary: false,
  coachTips: true,
  reduceMotion: false,
  ambientMotion: true,
  largeText: false
};

export function createUserData(name: string, demo: boolean): UserData {
  const profile = defaultProfile(name, demo);
  const now = Date.now();
  return {
    profile,
    saved: ['chickpea-curry', 'kiribath'],
    recent: ['salmon-bowl', 'gotukola-sambol'],
    pantry: pantrySeed.map((p) => ({
      id: uid(), name: p.name, category: p.category, quantity: p.quantity, unit: p.unit,
      expiry: isoDaysFromNow(p.expiresIn), added: isoDaysFromNow(-p.addedAgo), lowAt: p.lowAt
    })),
    waste: wasteSeed.map((w) => ({ id: uid(), item: w.item, quantity: w.quantity, unit: w.unit, date: isoDaysFromNow(-w.daysAgo), reason: w.reason, note: w.note })),
    plan: generatePlan(profile, profile.goal, 4242),
    completed: { '0-breakfast': true },
    chat: [],
    history: [
      {
        id: uid(),
        title: 'Smoked Tomato Shakshuka',
        slot: 'breakfast',
        date: isoDaysFromNow(-1),
        image: recipeImages.shakshuka,
        recipeId: 'shakshuka',
        calories: 390,
        time: '20 min',
        status: 'cooked',
        note: 'High protein · farm fresh tomatoes',
        rating: 5,
        rescuedItems: ['Tomatoes', 'Eggs']
      },
      {
        id: uid(),
        title: 'Red Rice & Parippu Dhal Bowl',
        slot: 'lunch',
        date: isoDaysFromNow(-1),
        image: recipeImages.redRiceDhal,
        recipeId: 'red-rice-dhal',
        calories: 480,
        time: '30 min',
        status: 'rescued',
        note: 'Rescued expiring spinach and lentils',
        rating: 5,
        rescuedItems: ['Spinach']
      },
      {
        id: uid(),
        title: 'Miso Salmon & Black Rice Bowl',
        slot: 'dinner',
        date: isoDaysFromNow(-2),
        image: recipeImages.salmonBowl,
        recipeId: 'salmon-bowl',
        calories: 620,
        time: '20 min',
        status: 'cooked',
        note: '42g clean protein · air fryer speed',
        rating: 5
      },
      {
        id: uid(),
        title: 'Second-Day Vegetable Fried Rice',
        slot: 'dinner',
        date: isoDaysFromNow(-3),
        image: recipeImages.friedRice,
        recipeId: 'fried-rice',
        calories: 510,
        time: '12 min',
        status: 'rescued',
        note: 'Transformed day-old rice into crisp wok dinner',
        rating: 4,
        rescuedItems: ['Cooked rice', 'Carrots']
      }
    ],
    settings: { ...defaultSettings },
    activity: [
      { id: uid(), text: 'Saved Pumpkin & Chickpea Coconut Curry', kind: 'recipe', at: new Date(now - 3600e3 * 5).toISOString() },
      { id: uid(), text: 'Added gotukola to your kitchen', kind: 'kitchen', at: new Date(now - 3600e3 * 26).toISOString() },
      { id: uid(), text: 'Logged leftover rice in Food Rescue', kind: 'waste', at: new Date(now - 3600e3 * 60).toISOString() }
    ]
  };
}