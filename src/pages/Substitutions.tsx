import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, MapPinIcon, SearchIcon, XIcon, Sparkles } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { substitutions, Alternative } from '../data/substitutions';
import { images } from '../data/images';
import { SafeImage } from '../components/SafeImage';
import { SpiceDust } from '../components/ambient/SpiceDust';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';
import { Allergen } from '../types/recipe';
import { Profile } from '../types/user';
import { allergenLabel, dietSatisfied, inPantry } from '../utils/recommend';

const ALT_ALLERGENS: { word: string; allergen: Allergen }[] = [
  { word: 'coconut', allergen: 'coconut' },
  { word: 'cashew', allergen: 'nuts' },
  { word: 'tamari', allergen: 'soy' },
  { word: 'soy', allergen: 'soy' },
  { word: 'oat', allergen: 'gluten' },
  { word: 'flax', allergen: 'sesame' },
];

function altFit(alt: Alternative, profile: Profile): string[] {
  const issues: string[] = [];
  profile.restrictions.forEach((d) => {
    if (!dietSatisfied(alt.diets, d)) issues.push(`not ${d}`);
  });
  ALT_ALLERGENS.forEach(({ word, allergen }) => {
    if (alt.name.toLowerCase().includes(word) && profile.allergies.includes(allergen) && !(word === 'flax')) {
      issues.push(`contains ${allergenLabel(allergen).toLowerCase()}`);
    }
  });
  return issues;
}

export function Substitutions() {
  const { data } = useAccount();
  const [q, setQ] = useState('');
  const [activeId, setActiveId] = useState(substitutions[0].id);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return substitutions;
    return substitutions.filter(
      (x) =>
        x.original.toLowerCase().includes(s) ||
        x.family.toLowerCase().includes(s) ||
        x.alternatives.some((a) => a.name.toLowerCase().includes(s))
    );
  }, [q]);

  const active = substitutions.find((s) => s.id === activeId) ?? substitutions[0];
  const families = Array.from(new Set(list.map((l) => l.family)));

  return (
    <div className="min-h-screen bg-[#f4ece1] text-cocoa">
      {/* Rich Botanical Header Banner */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#183626] via-[#244c36] to-[#1a3828] text-cream">
        <div className="absolute inset-0 opacity-20">
          <SafeImage
            eager
            src={images.lab}
            alt="Glass dishes of spices, flours and grains"
            className="h-full w-full object-cover"
            fallbackTone="dark"
          />
        </div>
        <DriftingLeaves
          color="#d4a843"
          opacity={0.35}
          leaves={[
            { x: 88, y: 25, size: 60, rotate: -35, shape: 'sprig', duration: 20 },
            { x: 12, y: 65, size: 45, rotate: 25, shape: 'curry', duration: 17 },
          ]}
        />
        <SpiceDust count={26} color="#f0d59e" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1440px] flex-col justify-end px-6 pb-12 pt-28 lg:px-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne w-fit">
            <Sparkles className="h-3.5 w-3.5" /> Culinary Chemistry Studio
          </span>
          <h1 className="mt-3 font-display text-5xl leading-[1.02] text-cream sm:text-7xl">
            The Flavour <span className="italic text-champagne">Lab</span>
          </h1>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-cream/80">
            Missing an ingredient? Discover thoughtful culinary alternatives — with the exact molecular balance and culinary ratio for seamless cooking.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 lg:grid-cols-[320px_1fr] lg:gap-14 lg:px-10">
        {/* Ingredient Index Aside */}
        <aside aria-label="Ingredient index" className="rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-6 shadow-xs h-fit">
          <div className="flex items-center gap-2.5 rounded-xl border border-[#d8c8b0] bg-[#f0e6d6] px-3.5 py-2 focus-within:border-forest focus-within:ring-1 focus-within:ring-forest/30">
            <SearchIcon className="h-4 w-4 text-cocoa/50" aria-hidden="true" />
            <label htmlFor="sub-search" className="sr-only">Search ingredients</label>
            <input
              id="sub-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search ingredient…"
              className="flex-1 bg-transparent text-sm font-medium text-cocoa placeholder:text-cocoa/40 focus:outline-none"
            />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label="Clear">
                <XIcon className="h-4 w-4 text-cocoa/50" />
              </button>
            )}
          </div>

          {list.length ? (
            <nav className="mt-6 space-y-5">
              {families.map((f) => (
                <div key={f}>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-forest border-b border-[#e4d6c2] pb-1">
                    {f}
                  </h2>
                  <ul className="mt-2 space-y-1">
                    {list
                      .filter((l) => l.family === f)
                      .map((s) => (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => setActiveId(s.id)}
                            aria-current={s.id === activeId}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-display text-lg transition-all ${
                              s.id === activeId
                                ? 'bg-forest font-bold text-cream shadow-2xs'
                                : 'text-cocoa/80 hover:bg-[#f0e6d6] hover:text-cocoa'
                            }`}
                          >
                            <span>{s.original}</span>
                            <span className={`font-sans text-xs ${s.id === activeId ? 'text-cream/70' : 'text-cocoa/40'}`}>
                              {s.alternatives.length}
                            </span>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </nav>
          ) : (
            <p className="mt-6 text-sm text-cocoa/60">No swaps found for “{q}”. Try flour, milk, rice or spinach.</p>
          )}
        </aside>

        {/* Selected Swap Cards */}
        <AnimatePresence mode="wait">
          <motion.section
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            aria-labelledby="sub-title"
          >
            <div className="rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-6 shadow-xs mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-cocoa/60">Selected Base Ingredient</span>
              <h2 id="sub-title" className="mt-1 font-display text-4xl sm:text-5xl font-bold text-forest">
                {active.original}
              </h2>
              <p className="mt-2 text-xs font-semibold text-cocoa/70">
                {inPantry(active.original.toLowerCase().split(' ')[0], data.pantry)
                  ? '✓ Available in your kitchen right now.'
                  : '— Not currently in your pantry stock.'}
              </p>
            </div>

            <div className={`grid gap-6 ${active.alternatives.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
              {active.alternatives.map((alt, i) => {
                const issues = altFit(alt, data.profile);
                const have = inPantry(alt.name.toLowerCase().split(' ')[0], data.pantry);

                return (
                  <motion.article
                    key={alt.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.06 }}
                    className="flex flex-col rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-6 shadow-sm transition-all hover:border-[#bfa98d] hover:shadow-md lg:p-7"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      Recommended Swap
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-cocoa">
                      {alt.name}
                    </h3>

                    {/* Meta Badges */}
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
                      {alt.local && (
                        <span className="flex items-center gap-1 rounded-full bg-[#e2ede0] px-3 py-1 text-forest">
                          <MapPinIcon className="h-3 w-3" />
                          Sri Lankan Local
                        </span>
                      )}
                      {have && (
                        <span className="flex items-center gap-1 rounded-full bg-[#fdf0d5] px-3 py-1 text-amber-900">
                          <CheckIcon className="h-3 w-3" />
                          In Kitchen
                        </span>
                      )}
                    </div>

                    {/* Culinary Chemistry Box */}
                    <div className="mt-5 rounded-xl border border-[#e2d5c0] bg-[#f0e6d6] p-4 text-xs">
                      <p className="font-semibold text-forest mb-1">Ratio & Chemistry:</p>
                      <p className="text-cocoa/80 leading-relaxed">{alt.ratio || '1:1 standard substitution'}</p>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-cocoa/75">{alt.note}</p>

                    {issues.length > 0 && (
                      <p className="mt-3 text-[11px] font-semibold text-rose-700">
                        ⚠ Profile conflict: {issues.join(', ')}
                      </p>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}