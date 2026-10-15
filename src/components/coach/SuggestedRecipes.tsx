import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClockIcon } from 'lucide-react';
import { getRecipe } from '../../utils/recommend';
import { SafeImage } from '../SafeImage';

export function SuggestedRecipes({ ids }: {ids: string[];}) {
  const list = ids.map(getRecipe).filter(Boolean);
  if (!list.length) return null;
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-3">
      {list.map((r, i) => r &&
      <motion.li key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.05 * i, ease: [0.23, 1, 0.32, 1] }}>
          <Link to={`/app/recipes/${r.id}`} className="group flex h-full gap-3 border border-cream/15 bg-forest/60 p-2.5 transition-colors duration-150 hover:border-champagne/60 sm:flex-col">
            <SafeImage src={r.image} alt="" className="h-20 w-20 shrink-0 object-cover sm:aspect-[4/3] sm:h-auto sm:w-full" fallbackTone="dark" />
            <div className="flex min-w-0 flex-1 flex-col sm:px-1 sm:pb-1">
              <p className="font-display text-lg leading-tight text-cream group-hover:underline">{r.title}</p>
              <p className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-cream/55"><ClockIcon className="h-3 w-3" />{r.prepTime + r.cookTime} min · {r.nutrition.protein} g protein</p>
            </div>
          </Link>
        </motion.li>
      )}
    </ul>);

}