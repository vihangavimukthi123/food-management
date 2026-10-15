import React from 'react';
import { Chip } from '../Chip';
import { TagInput } from '../TagInput';
import { goals } from '../../data/goals';
import { allergenOptions, cookingLevels, cuisineOptions, dietOptions, dislikeSuggestions, equipmentOptions, favouriteSuggestions, mealTypeOptions, portionStyles, recipeCategories } from '../../data/options';
import { Profile } from '../../types/user';
import { inputClass } from '../../utils/styles';

interface Props {
  value: Profile;
  onChange: (p: Profile) => void;
}

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function Group({ id, title, note, children }: {id: string;title: string;note?: string;children: React.ReactNode;}) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-cocoa/15 py-10 lg:grid-cols-[240px_1fr] lg:gap-12">
      <div>
        <h2 id={id} className="font-display text-3xl">{title}</h2>
        {note && <p className="mt-2 text-sm text-cocoa/60">{note}</p>}
      </div>
      <div className="space-y-8">{children}</div>
    </section>);

}

export function ProfileForm({ value: p, onChange }: Props) {
  const set = <K extends keyof Profile,>(k: K, v: Profile[K]) => onChange({ ...p, [k]: v });
  return (
    <div>
      <Group id="personal" title="Personal details">
        <div className="grid gap-5 sm:grid-cols-2">
          {([['name', 'Name', 'text'], ['age', 'Age', 'number'], ['location', 'Location', 'text'], ['occupation', 'Occupation', 'text']] as const).map(([k, l, t]) =>
          <div key={k}>
              <label htmlFor={`p-${k}`} className="mb-2 block text-sm font-semibold">{l}</label>
              <input id={`p-${k}`} type={t} min={t === 'number' ? 1 : undefined} value={p[k]} onChange={(e) => set(k, e.target.value)} className={inputClass()} />
            </div>
          )}
        </div>
      </Group>

      <Group id="goals" title="Personal goal" note="Your plan and coach follow this.">
        <div className="flex flex-wrap gap-2">{goals.map((g) => <Chip key={g.id} selected={p.goal === g.id} onClick={() => set('goal', g.id)}>{g.label}</Chip>)}</div>
      </Group>

      <Group id="prefs" title="Food preferences">
        <TagInput id="p-fav" label="Favourite foods" values={p.favourites} onChange={(v) => set('favourites', v)} suggestions={favouriteSuggestions} />
        <TagInput id="p-dis" label="Disliked foods" values={p.dislikes} onChange={(v) => set('dislikes', v)} suggestions={dislikeSuggestions} />
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Preferred food categories</legend>
          <div className="flex flex-wrap gap-2">{recipeCategories.map((c) => <Chip key={c} size="sm" selected={p.categories.includes(c)} onClick={() => set('categories', toggle(p.categories, c))}>{c}</Chip>)}</div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Favourite cuisines</legend>
          <div className="flex flex-wrap gap-2">{cuisineOptions.map((c) => <Chip key={c} size="sm" selected={p.cuisines.includes(c)} onClick={() => set('cuisines', toggle(p.cuisines, c))}>{c}</Chip>)}</div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Meals you enjoy</legend>
          <div className="flex flex-wrap gap-2">{mealTypeOptions.map((m) => <Chip key={m.id} size="sm" selected={p.mealTypes.includes(m.id)} onClick={() => set('mealTypes', toggle(p.mealTypes, m.id))}>{m.label}</Chip>)}</div>
        </fieldset>
      </Group>

      <Group id="allergies" title="Allergies" note="Never recommended anywhere in DailyPlate. Not a substitute for medical advice.">
        <div className="flex flex-wrap gap-2">{allergenOptions.map((a) => <Chip key={a.id} selected={p.allergies.includes(a.id)} onClick={() => set('allergies', toggle(p.allergies, a.id))}>{a.label}</Chip>)}</div>
      </Group>

      <Group id="diet" title="Dietary restrictions">
        <div className="flex flex-wrap gap-2">{dietOptions.map((d) => <Chip key={d.id} selected={p.restrictions.includes(d.id)} onClick={() => set('restrictions', toggle(p.restrictions, d.id))}>{d.label}</Chip>)}</div>
      </Group>

      <Group id="cooking" title="Cooking & lifestyle">
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Cooking ability</legend>
          <div className="flex flex-wrap gap-2">{cookingLevels.map((c) => <Chip key={c.id} selected={p.cookingLevel === c.id} onClick={() => set('cookingLevel', c.id)}>{c.label}</Chip>)}</div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Portion style</legend>
          <div className="flex flex-wrap gap-2">{portionStyles.map((c) => <Chip key={c.id} selected={p.portion === c.id} onClick={() => set('portion', c.id)}>{c.label}</Chip>)}</div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Kitchen equipment</legend>
          <div className="flex flex-wrap gap-2">{equipmentOptions.map((c) => <Chip key={c} size="sm" selected={p.equipment.includes(c)} onClick={() => set('equipment', toggle(p.equipment, c))}>{c}</Chip>)}</div>
        </fieldset>
        <TagInput id="p-ing" label="Ingredients you love cooking with" values={p.preferredIngredients} onChange={(v) => set('preferredIngredients', v)} suggestions={['Coconut', 'Red rice', 'Curry leaves', 'Gotukola', 'Pumpkin', 'Kurakkan']} />
      </Group>
    </div>);

}