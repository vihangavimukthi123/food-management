import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../contexts/StoreContext';
import { recipes } from '../../data/recipes';
import { Allergen } from '../../types/recipe';
import { defaultProfile } from '../../utils/seed';
import { recipeConflicts } from '../../utils/recommend';
import { leftoverSuggestions } from '../../utils/leftovers';

const OPTIONS: { id: Allergen; label: string }[] = [
  { id: 'dairy', label: 'Dairy' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'coconut', label: 'Coconut' },
  { id: 'egg', label: 'Egg' },
  { id: 'soy', label: 'Soy' },
];

export function RippleDemo() {
  const { data } = useStore();
  const base = data?.profile ?? defaultProfile('Guest', false);
  const [extra, setExtra] = useState<Allergen[]>([]);
  const profile = useMemo(() => ({ ...base, allergies: Array.from(new Set([...base.allergies, ...extra])) }), [base, extra]);
  const available = recipes.filter((r) => recipeConflicts(r, profile).length === 0);
  const removed = recipes.filter((r) => recipeConflicts(r, profile).length > 0);
  const rescue = leftoverSuggestions('rice', profile, data?.pantry ?? []).ideas.length;

  const panels = [
    { k: 'Recipe Atelier', v: `${available.length} of ${recipes.length}`, t: 'recipes match this profile' },
    { k: 'My Plan Schedule', v: String(available.length), t: 'recipes ready to schedule' },
    { k: 'Zero-Waste Rescue', v: String(rescue), t: 'safe ideas for leftover rice' },
    { k: 'AI Culinary Coach', v: profile.allergies.length ? String(profile.allergies.length) : '0', t: 'allergens strictly avoided' },
  ];

  return (
    <section aria-labelledby="ripple" className="border-t border-[#d8c8b0] bg-[#eae1d2] text-cocoa">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 id="ripple" className="font-display text-4xl sm:text-5xl leading-[1.02] font-bold text-forest">
              Follow one change through the universe.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/75 max-w-md">
              Toggle an allergen below and watch every connected studio adapt simultaneously. {data ? 'Using your active profile — changes here are temporary simulations.' : 'Simulated on a guest profile.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {OPTIONS.map((o) => {
                const on = extra.includes(o.id) || base.allergies.includes(o.id);
                const locked = base.allergies.includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    disabled={locked}
                    aria-pressed={on}
                    onClick={() => setExtra((e) => (e.includes(o.id) ? e.filter((x) => x !== o.id) : [...e, o.id]))}
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition-all duration-150 ${
                      on
                        ? 'border-forest bg-forest text-cream shadow-xs'
                        : 'border-[#d8c8b0] bg-[#faf5eb] text-cocoa hover:border-forest hover:bg-[#f0e6d6]'
                    } disabled:opacity-60`}
                  >
                    {o.label}
                    {locked ? ' · in profile' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <dl className="grid grid-cols-2 gap-4">
              {panels.map((p) => (
                <div key={p.k} className="bg-[#faf5eb] p-6 rounded-2xl border border-[#d8c8b0] shadow-xs">
                  <dt className="text-xs font-bold uppercase tracking-wider text-forest">{p.k}</dt>
                  <motion.dd
                    key={p.v}
                    initial={{ opacity: 0.3, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 font-display text-4xl sm:text-5xl font-bold text-forest"
                  >
                    {p.v}
                  </motion.dd>
                  <dd className="mt-1 text-xs text-cocoa/65">{p.t}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-cocoa/70">
              {removed.length ? `Now filtered out: ${removed.map((r) => r.title).join(', ')}.` : 'Zero recipes conflicting for this profile.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}