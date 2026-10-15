import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { DayPlan, PlannedMeal } from '../../types/plan';
import { completionKey, slotLabel } from '../../utils/plan';
import { SafeImage } from '../SafeImage';

interface Props {
  day: DayPlan;
  dayIndex: number;
  completed: Record<string, boolean>;
  onToggle: (m: PlannedMeal) => void;
  onOpen: (m: PlannedMeal) => void;
}

export function MealTimeline({ day, dayIndex, completed, onToggle, onOpen }: Props) {
  return (
    <ol className="relative">
      <span className="absolute bottom-6 left-[7px] top-3 w-px bg-cocoa/15 sm:left-[131px]" aria-hidden="true" />
      {day.meals.map((m, i) => {
        const done = Boolean(completed[completionKey(dayIndex, m.slot)]);
        return (
          <motion.li
            key={`${day.date}-${m.slot}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
            className="relative grid gap-4 pb-12 pl-8 sm:grid-cols-[110px_1fr] sm:gap-10 sm:pl-0">
            
            <p className="font-display text-xl italic text-botanical sm:pt-1 sm:text-right">{slotLabel(m.slot)}</p>
            <span className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-200 sm:left-[124px] ${done ? 'border-botanical bg-botanical' : 'border-cocoa/30 bg-ivory'}`} aria-hidden="true" />
            <div className="grid gap-5 sm:pl-6 md:grid-cols-[180px_1fr]">
              <button type="button" onClick={() => onOpen(m)} className="block overflow-hidden text-left" aria-label={`View details for ${m.title}`}>
                {m.image ?
                <SafeImage src={m.image} alt="" className={`aspect-[4/3] w-full object-cover transition-[transform,opacity] duration-300 ease-out hover:scale-[1.03] ${done ? 'opacity-60' : ''}`} /> :

                <span className="kraft flex aspect-[4/3] w-full items-center justify-center px-4 text-center font-display text-lg italic text-earth">{m.title}</span>
                }
              </button>
              <div>
                <h3 className={`font-display text-3xl leading-tight ${done ? 'text-cocoa/50' : ''}`}>{m.title}</h3>
                <p className="mt-1.5 text-sm text-cocoa/65">{m.description}</p>
                <p className="mt-3 text-xs text-cocoa/55">{m.portion} · ≈{m.nutrition.calories} kcal · {m.nutrition.protein} g protein · {m.nutrition.carbs} g carbs · {m.nutrition.fat} g fat</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <button
                    type="button"
                    onClick={() => onToggle(m)}
                    aria-pressed={done}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${done ? 'border-botanical bg-botanical text-cream' : 'border-cocoa/25 hover:border-cocoa/60'}`}>
                    
                    <CheckIcon className="h-3.5 w-3.5" />{done ? 'Enjoyed' : 'Mark as enjoyed'}
                  </button>
                  <button type="button" onClick={() => onOpen(m)} className="text-xs font-semibold underline-offset-4 hover:underline">Meal details</button>
                  {m.recipeId && <Link to={`/app/recipes/${m.recipeId}`} className="text-xs font-semibold underline-offset-4 hover:underline">View recipe</Link>}
                </div>
              </div>
            </div>
          </motion.li>);

      })}
    </ol>);

}