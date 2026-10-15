import React from 'react';
import { motion } from 'framer-motion';
import { MinusIcon, PencilIcon, PlusIcon, Trash2Icon, Clock, AlertTriangle } from 'lucide-react';
import { PantryItem } from '../../types/kitchen';
import { daysUntil, expiryLabel, formatDay } from '../../utils/dates';
import { SafeImage } from '../SafeImage';

interface Props {
  item: PantryItem;
  onStep: (delta: number) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const INGREDIENT_IMAGES: Record<string, string> = {
  mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop',
  banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop',
  lime: 'https://images.unsplash.com/photo-1533083441298-500b5bf088eb?w=500&auto=format&fit=crop',
  tomatoes: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop',
  pumpkin: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=500&auto=format&fit=crop',
  carrots: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop',
  'red onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop',
  gotukola: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop',
  garlic: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500&auto=format&fit=crop',
  ginger: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop',
  'red rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop',
  'rolled oats': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&auto=format&fit=crop',
  'green gram': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop',
  'sourdough bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop',
  eggs: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&auto=format&fit=crop',
  'greek yogurt': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop',
  'chicken breast': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop',
  turmeric: 'https://images.unsplash.com/photo-1615485290150-137b02bc3dfc?w=500&auto=format&fit=crop',
  'curry leaves': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop',
  'roasted curry powder': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop',
  'coconut oil': 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&auto=format&fit=crop',
  'olive oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop',
  'coconut milk': 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=500&auto=format&fit=crop',
  chickpeas: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop'
};

const CATEGORY_FALLBACKS: Record<string, string> = {
  Fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop',
  Vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop',
  Grains: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop',
  Dairy: 'https://images.unsplash.com/photo-1528732263440-4dd1a18a4cc2?w=500&auto=format&fit=crop',
  'Meat & seafood': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop',
  Spices: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop',
  Oils: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop',
  'Pantry essentials': 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=500&auto=format&fit=crop'
};

export function stepFor(unit: string): number {
  if (unit === 'g' || unit === 'ml') return 50;
  if (unit === 'kg' || unit === 'L') return 0.1;
  return 1;
}

export function IngredientTag({ item, onStep, onEdit, onDelete }: Props) {
  const days = daysUntil(item.expiry);
  const fresh = Math.max(0, Math.min(1, days / 14));
  const low = item.quantity <= item.lowAt;
  const step = stepFor(item.unit);

  const imgSrc =
    item.photo ||
    INGREDIENT_IMAGES[item.name.toLowerCase()] ||
    CATEGORY_FALLBACKS[item.category] ||
    CATEGORY_FALLBACKS['Vegetables'];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-xs transition-all duration-200 hover:shadow-md ${
        days <= 3 ? 'border-amber-300 ring-1 ring-amber-200/60' : 'border-cocoa/10 hover:border-cocoa/25'
      }`}
    >
      {/* Ingredient Photo Header */}
      <div className="relative h-36 w-full overflow-hidden bg-cream/40">
        <SafeImage
          src={imgSrc}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          fallbackTone="light"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Top Badges */}
        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest shadow-xs">
          {item.category}
        </span>

        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-90 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${item.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-cocoa shadow-xs backdrop-blur-xs transition-transform hover:scale-110 hover:bg-white"
          >
            <PencilIcon className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${item.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-xs backdrop-blur-xs transition-transform hover:scale-110 hover:bg-white"
          >
            <Trash2Icon className="h-3 w-3" />
          </button>
        </div>

        {/* Name over bottom of image */}
        <div className="absolute bottom-2.5 left-3 right-3">
          <h3 className="font-display text-xl font-bold text-white drop-shadow-sm truncate">{item.name}</h3>
        </div>
      </div>

      {/* Freshness Bar */}
      <div className="h-1.5 w-full bg-cocoa/10" aria-hidden="true">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${fresh * 100}%`,
            background: days <= 1 ? '#e11d48' : days <= 3 ? '#d97706' : '#16a34a'
          }}
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Status Row */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <span
            className={`flex items-center gap-1 rounded-md px-2 py-0.5 ${
              days <= 1
                ? 'bg-rose-100 text-rose-800'
                : days <= 3
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-50 text-emerald-800'
            }`}
          >
            {days <= 3 ? <AlertTriangle className="h-3 w-3 shrink-0" /> : <Clock className="h-3 w-3 shrink-0" />}
            {expiryLabel(item.expiry)}
          </span>

          {low && (
            <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-700">
              Low Stock
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#faf8f5] p-1.5 border border-cocoa/10">
          <button
            type="button"
            onClick={() => onStep(-step)}
            disabled={item.quantity <= 0}
            aria-label={`Use some ${item.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-cocoa/15 text-cocoa transition-all hover:bg-cream active:scale-90 disabled:opacity-30"
          >
            <MinusIcon className="h-3.5 w-3.5" />
          </button>

          <span className="font-semibold text-sm text-cocoa tabular-nums px-2">
            {Math.round(item.quantity * 100) / 100} <span className="text-xs font-normal text-cocoa/60">{item.unit}</span>
          </span>

          <button
            type="button"
            onClick={() => onStep(step)}
            aria-label={`Add more ${item.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-cocoa/15 text-cocoa transition-all hover:bg-cream active:scale-90"
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Footnote */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-cocoa/50">
          <span>Added {formatDay(item.added, 'd MMM')}</span>
          <span>Exp: {formatDay(item.expiry, 'd MMM')}</span>
        </div>
      </div>
    </motion.li>
  );
}