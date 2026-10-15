export type PantryCategory =
'Fruits' |
'Vegetables' |
'Grains' |
'Dairy' |
'Meat & seafood' |
'Spices' |
'Oils' |
'Pantry essentials' |
'Other';

export interface PantryItem {
  id: string;
  name: string;
  category: PantryCategory;
  quantity: number;
  unit: string;
  expiry: string;
  added: string;
  photo?: string;
  lowAt: number;
}

export interface PantrySeed {
  name: string;
  category: PantryCategory;
  quantity: number;
  unit: string;
  expiresIn: number;
  addedAgo: number;
  lowAt: number;
}

export type WasteReason =
'Expired' |
'Spoiled' |
'Overcooked' |
'Leftovers not eaten' |
'Bought too much' |
'Other';

export interface WasteEntry {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  date: string;
  reason: WasteReason;
  note: string;
}

export interface WasteSeed {
  item: string;
  quantity: number;
  unit: string;
  daysAgo: number;
  reason: WasteReason;
  note: string;
}