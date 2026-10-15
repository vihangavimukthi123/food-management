import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookmarkIcon, EyeOffIcon } from 'lucide-react';
import { Recipe } from '../../types/recipe';
import { SafeImage } from '../SafeImage';

export type EntryVariant = 'large' | 'standard' | 'wide';

interface Props {
  recipe: Recipe;
  variant: EntryVariant;
  conflicts: string[];
  saved: boolean;
  onToggleSave: () => void;
  className?: string;
}

const dietLabel: Record<string, string> = { vegetarian: 'Vegetarian', vegan: 'Vegan', 'gluten-free': 'Gluten-free', 'dairy-free': 'Dairy-free' };

export function RecipeEntry({ recipe: r, variant, conflicts, saved, onToggleSave, className = '' }: Props) {
  const wide = variant === 'wide';
  const aspect = variant === 'large' ? 'aspect-[5/4]' : wide ? 'aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[4/5]';
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className={`group flex flex-col ${wide ? 'gap-6 md:grid md:grid-cols-[1.2fr_1fr] md:gap-10' : ''} ${className}`}>
      
      <Link to={`/app/recipes/${r.id}`} className={`relative block overflow-hidden ${wide ? 'md:min-h-[360px]' : ''}`} tabIndex={-1} aria-hidden="true">
        <SafeImage src={r.image} alt="" className={`w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${aspect} ${conflicts.length ? 'grayscale-[60%]' : ''}`} />
        {conflicts.length > 0 &&
        <span className="absolute left-3 top-3 flex items-center gap-1.5 bg-ivory/95 px-2.5 py-1 text-xs font-semibold text-burnt"><EyeOffIcon className="h-3.5 w-3.5" />Not for you: {conflicts[0]}</span>
        }
      </Link>
      <div className={`flex flex-1 flex-col ${wide ? 'py-2' : 'pt-4'}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">{r.cuisine} · {r.mealType}</p>
        <h3 className={`mt-2 font-display leading-[1.05] ${variant === 'standard' ? 'text-3xl' : 'text-4xl lg:text-5xl'}`}>
          <Link to={`/app/recipes/${r.id}`} className="hover:underline">{r.title}</Link>
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-cocoa/70">{r.description}</p>
        <dl className="mt-4 grid grid-cols-4 gap-2 border-y border-cocoa/10 py-3 text-xs">
          <div><dt className="text-cocoa/50">Prep</dt><dd className="font-semibold">{r.prepTime} min</dd></div>
          <div><dt className="text-cocoa/50">Cook</dt><dd className="font-semibold">{r.cookTime ? `${r.cookTime} min` : 'None'}</dd></div>
          <div><dt className="text-cocoa/50">Level</dt><dd className="font-semibold">{r.difficulty}</dd></div>
          <div><dt className="text-cocoa/50">Serves</dt><dd className="font-semibold">{r.servings}</dd></div>
        </dl>
        <p className="mt-3 text-xs text-cocoa/60">≈{r.nutrition.calories} kcal · {r.nutrition.protein} g protein · {r.nutrition.carbs} g carbs · {r.nutrition.fat} g fat <span className="text-cocoa/40">per serving, estimated</span></p>
        {r.diets.length > 0 &&
        <ul className="mt-3 flex flex-wrap gap-1.5">{r.diets.map((d) => <li key={d} className="border border-cocoa/15 px-2 py-0.5 text-[0.7rem] text-cocoa/70">{dietLabel[d]}</li>)}</ul>
        }
        <div className="mt-auto flex items-center gap-4 pt-5">
          <Link to={`/app/recipes/${r.id}`} className="rounded-full bg-cocoa px-5 py-2.5 text-xs font-semibold text-cream transition-colors duration-150 hover:bg-earth">View recipe</Link>
          <button type="button" onClick={onToggleSave} aria-pressed={saved} className="inline-flex items-center gap-1.5 text-xs font-semibold text-cocoa/75 transition-colors duration-150 hover:text-cocoa">
            <motion.span key={String(saved)} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.18 }}>
              <BookmarkIcon className={`h-4 w-4 ${saved ? 'fill-terracotta text-terracotta' : ''}`} />
            </motion.span>
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </motion.article>);

}