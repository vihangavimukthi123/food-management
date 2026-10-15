import { PantryItem, WasteEntry } from './kitchen';
import { ChatMessage, MealHistoryEntry, MealPlan } from './plan';
import { Activity, Profile, Settings } from './user';

export interface UserData {
  profile: Profile;
  saved: string[];
  recent: string[];
  pantry: PantryItem[];
  waste: WasteEntry[];
  plan: MealPlan | null;
  completed: Record<string, boolean>;
  chat: ChatMessage[];
  history: MealHistoryEntry[];
  settings: Settings;
  activity: Activity[];
}