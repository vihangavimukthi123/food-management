import React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { cuisineOptions, dietOptions, mealTypeOptions, recipeCategories } from '../../data/options';

export interface FilterState {
  q: string;
  category: string;
  diet: string;
  cuisine: string;
  meal: string;
  savedOnly: boolean;
  fitsMe: boolean;
}

interface Props {
  value: FilterState;
  onChange: (v: FilterState) => void;
  count: number;
}

const selectClass = 'appearance-none border-b border-cocoa/20 bg-transparent py-2 pr-6 text-sm font-medium text-cocoa focus:border-cocoa focus:outline-none';

export function RecipeFilters({ value, onChange, count }: Props) {
  const set = <K extends keyof FilterState,>(k: K, v: FilterState[K]) => onChange({ ...value, [k]: v });
  const active = value.q || value.category !== 'All' || value.diet || value.cuisine || value.meal || value.savedOnly;
  return (
    <div className="sticky top-16 z-30 -mx-5 border-y border-cocoa/15 bg-cream/95 px-5 py-4 backdrop-blur-md lg:top-[72px] lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-1 items-center gap-3 border-b border-cocoa/25 pb-1 focus-within:border-cocoa">
          <SearchIcon className="h-4 w-4 text-cocoa/50" aria-hidden="true" />
          <label htmlFor="recipe-search" className="sr-only">Search recipes</label>
          <input id="recipe-search" value={value.q} onChange={(e) => set('q', e.target.value)} placeholder="Search dishes, ingredients, cuisines…" className="flex-1 bg-transparent py-1.5 font-display text-xl placeholder:text-cocoa/40 focus:outline-none" />
          {value.q && <button type="button" onClick={() => set('q', '')} aria-label="Clear search"><XIcon className="h-4 w-4 text-cocoa/50" /></button>}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <label className="sr-only" htmlFor="f-diet">Dietary filter</label>
          <select id="f-diet" value={value.diet} onChange={(e) => set('diet', e.target.value)} className={selectClass}>
            <option value="">Any diet</option>
            {dietOptions.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
          <label className="sr-only" htmlFor="f-cuisine">Cuisine filter</label>
          <select id="f-cuisine" value={value.cuisine} onChange={(e) => set('cuisine', e.target.value)} className={selectClass}>
            <option value="">Any cuisine</option>
            {cuisineOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="sr-only" htmlFor="f-meal">Meal type filter</label>
          <select id="f-meal" value={value.meal} onChange={(e) => set('meal', e.target.value)} className={selectClass}>
            <option value="">Any meal</option>
            {mealTypeOptions.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
          <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={value.savedOnly} onChange={(e) => set('savedOnly', e.target.checked)} className="h-4 w-4 accent-[#c0623f]" />Saved</label>
          <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={value.fitsMe} onChange={(e) => set('fitsMe', e.target.checked)} className="h-4 w-4 accent-[#1d4631]" />Fits my profile</label>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="no-scrollbar flex flex-1 gap-1 overflow-x-auto" role="tablist" aria-label="Recipe categories">
          {['All', ...recipeCategories].map((c) =>
          <button key={c} type="button" role="tab" aria-selected={value.category === c} onClick={() => set('category', c)} className={`shrink-0 whitespace-nowrap px-3 py-1.5 text-sm transition-colors duration-150 ${value.category === c ? 'bg-cocoa text-cream' : 'text-cocoa/65 hover:text-cocoa'}`}>{c}</button>
          )}
        </div>
        <p className="hidden shrink-0 text-xs text-cocoa/55 sm:block" aria-live="polite">{count} {count === 1 ? 'recipe' : 'recipes'}</p>
        {active && <button type="button" onClick={() => onChange({ q: '', category: 'All', diet: '', cuisine: '', meal: '', savedOnly: false, fitsMe: value.fitsMe })} className="shrink-0 text-xs font-semibold underline">Reset</button>}
      </div>
    </div>);

}