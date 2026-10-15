import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, BookmarkIcon } from 'lucide-react';
import { Recipe } from '../../types/recipe';
import { SafeImage } from '../SafeImage';

interface Props {
  featured: Recipe[];
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export function FeaturedSpread({ featured, isSaved, onToggleSave }: Props) {
  const [i, setI] = useState(0);
  if (!featured.length) return null;
  const r = featured[i % featured.length];
  const go = (d: number) => setI((v) => (v + d + featured.length) % featured.length);
  return (
    <section aria-labelledby="featured" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="relative overflow-hidden lg:col-span-7">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={r.id} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
            <Link to={`/app/recipes/${r.id}`} tabIndex={-1} aria-hidden="true"><SafeImage eager src={r.image} alt="" className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]" /></Link>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-col lg:col-span-5 lg:py-4">
        <div className="flex items-center justify-between border-b border-cocoa/20 pb-3">
          <h2 id="featured" className="font-display text-xl italic text-terracotta">The cover story</h2>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => go(-1)} aria-label="Previous featured recipe" className="rounded-full p-2 hover:bg-cocoa/5"><ArrowLeftIcon className="h-4 w-4" /></button>
            <span className="w-10 text-center text-xs tabular-nums text-cocoa/55">{i % featured.length + 1} / {featured.length}</span>
            <button type="button" onClick={() => go(1)} aria-label="Next featured recipe" className="rounded-full p-2 hover:bg-cocoa/5"><ArrowRightIcon className="h-4 w-4" /></button>
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="flex flex-1 flex-col">
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-cocoa/55">{r.cuisine} · {r.prepTime + r.cookTime} minutes · serves {r.servings}</p>
            <h3 className="mt-3 font-display text-5xl leading-[0.98] lg:text-[4.2rem]">{r.title}</h3>
            <p className="mt-6 text-lg leading-relaxed text-cocoa/70">{r.intro}</p>
            <div className="mt-auto flex items-center gap-5 pt-8">
              <Link to={`/app/recipes/${r.id}`} className="rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream transition-colors duration-150 hover:bg-earth">Read the recipe</Link>
              <button type="button" onClick={() => onToggleSave(r.id)} aria-pressed={isSaved(r.id)} className="inline-flex items-center gap-2 text-sm font-semibold">
                <BookmarkIcon className={`h-4 w-4 ${isSaved(r.id) ? 'fill-terracotta text-terracotta' : ''}`} />{isSaved(r.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>);

}