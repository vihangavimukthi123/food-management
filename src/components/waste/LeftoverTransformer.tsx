import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, SearchIcon } from 'lucide-react';
import { useAccount } from '../../contexts/StoreContext';
import { leftoverSuggestions } from '../../utils/leftovers';
import { daysUntil } from '../../utils/dates';
import { SafeImage } from '../SafeImage';

const QUICK = ['Rice', 'Bread', 'Vegetables', 'Fruit', 'Pumpkin', 'Coconut'];

export function LeftoverTransformer() {
  const { data } = useAccount();
  const soon = data.pantry.filter((p) => daysUntil(p.expiry) <= 3).map((p) => p.name);
  const [input, setInput] = useState('Rice');
  const [query, setQuery] = useState('Rice');
  const { ideas, hidden } = useMemo(() => leftoverSuggestions(query, data.profile, data.pantry), [query, data.profile, data.pantry]);
  const chips = Array.from(new Set([...QUICK, ...soon]));

  return (
    <section aria-labelledby="transform" className="bg-terracotta text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 id="transform" className="font-display text-5xl leading-[1] lg:text-6xl">What’s left over?</h2>
            <p className="mt-4 max-w-md text-cream/80">Tell us what needs using up. We’ll match recipes to it — and to everything else in your kitchen.</p>
            <form onSubmit={(e) => {e.preventDefault();setQuery(input);}} className="mt-8 flex items-center gap-3 border-b border-cream/40 pb-1 focus-within:border-cream">
              <SearchIcon className="h-4 w-4 text-cream/70" aria-hidden="true" />
              <label htmlFor="leftover" className="sr-only">Leftover ingredient</label>
              <input id="leftover" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. day-old bread" className="flex-1 bg-transparent py-2 font-display text-2xl text-cream placeholder:text-cream/50 focus:outline-none" />
              <button type="submit" className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-terracotta">Transform</button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              {chips.map((c) =>
              <button key={c} type="button" onClick={() => {setInput(c);setQuery(c);}} aria-pressed={query === c} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150 ${query === c ? 'border-cream bg-cream text-terracotta' : 'border-cream/40 hover:border-cream'}`}>
                  {c}{soon.includes(c) && <span className="ml-1.5 text-[0.65rem] opacity-70">expiring</span>}
                </button>
              )}
            </div>
          </div>

          <div aria-live="polite">
            {ideas.length ?
            <ol className="space-y-5">
                {ideas.slice(0, 4).map((idea, i) =>
              <motion.li key={`${query}-${idea.recipe.id}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }} className="grid grid-cols-[auto_1fr] items-center gap-4 sm:grid-cols-[110px_60px_1fr]">
                    <span className="hidden truncate rounded-full bg-cream/15 px-3 py-1.5 text-center text-sm sm:block">{query}</span>
                    <svg viewBox="0 0 60 20" className="hidden h-5 w-full sm:block" aria-hidden="true">
                      <motion.path d="M0 10 C 20 0, 40 20, 60 10" stroke="#f3ebdb" strokeWidth="1.4" fill="none" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }} />
                    </svg>
                    <div className="col-span-2 flex gap-4 bg-cream p-3 text-cocoa sm:col-span-1">
                      <SafeImage src={idea.recipe.image} alt="" className="h-24 w-20 shrink-0 object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-2xl leading-tight">{idea.recipe.title}</p>
                        <p className="mt-1 text-xs text-cocoa/60">You have {idea.have.length} of {idea.recipe.ingredients.length} ingredients</p>
                        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                          {idea.have.slice(0, 4).map((h) => <span key={h.name} className="flex items-center gap-1 text-botanical"><CheckIcon className="h-3 w-3" />{h.name}</span>)}
                        </p>
                        {idea.missing.length > 0 && <p className="mt-1 text-xs text-cocoa/55">Missing: {idea.missing.map((m) => m.name.toLowerCase()).join(', ')}</p>}
                        <Link to={`/app/recipes/${idea.recipe.id}`} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-terracotta hover:underline">Open recipe <ArrowRightIcon className="h-3 w-3" /></Link>
                      </div>
                    </div>
                  </motion.li>
              )}
              </ol> :

            <p className="border border-cream/30 p-8 font-display text-2xl">{query ? `No rescue recipes for “${query}” yet. Try rice, bread, vegetables or fruit.` : 'Choose a leftover to begin.'}</p>
            }
            {hidden > 0 && <p className="mt-5 text-xs text-cream/75">{hidden} more {hidden === 1 ? 'idea was' : 'ideas were'} hidden because {hidden === 1 ? 'it conflicts' : 'they conflict'} with your allergies, diet or dislikes.</p>}
          </div>
        </div>
      </div>
    </section>);

}