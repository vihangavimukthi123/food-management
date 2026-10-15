import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, SparklesIcon } from 'lucide-react';
import { useAccount } from '../../contexts/StoreContext';
import { usePlanActions } from '../../hooks/usePlanActions';
import { completionKey, slotLabel, todayIndex } from '../../utils/plan';
import { SafeImage } from '../SafeImage';

export function TodayPlan() {
  const { data } = useAccount();
  const { toggleMeal } = usePlanActions();
  const plan = data.plan;

  if (!plan) {
    return (
      <div className="border border-dashed border-cocoa/25 p-8 text-center">
        <SparklesIcon className="mx-auto h-6 w-6 text-terracotta" />
        <p className="mt-3 font-display text-2xl">No plan yet</p>
        <p className="mt-1 text-sm text-cocoa/60">Generate a week of meals around your goal.</p>
        <Link to="/app/plan" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:underline">Create my plan <ArrowRightIcon className="h-4 w-4" /></Link>
      </div>);

  }

  const di = todayIndex(plan);
  const day = plan.days[di];
  const done = day.meals.filter((m) => data.completed[completionKey(di, m.slot)]).length;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-3xl">Today on your plate</h2>
        <span className="text-sm text-cocoa/60">{done} of {day.meals.length} enjoyed</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-cocoa/10" role="progressbar" aria-valuemin={0} aria-valuemax={day.meals.length} aria-valuenow={done} aria-label="Meals enjoyed today">
        <motion.div className="h-full bg-terracotta" initial={false} animate={{ width: `${done / day.meals.length * 100}%` }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
      </div>
      <ol className="mt-4 divide-y divide-cocoa/10">
        {day.meals.map((m) => {
          const isDone = Boolean(data.completed[completionKey(di, m.slot)]);
          return (
            <li key={m.slot} className="flex items-center gap-4 py-3.5">
              {m.image ?
              <SafeImage src={m.image} alt="" className={`h-12 w-12 shrink-0 rounded-full object-cover transition-opacity duration-200 ${isDone ? 'opacity-50' : ''}`} /> :

              <span className="kraft h-12 w-12 shrink-0 rounded-full" aria-hidden="true" />
              }
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-terracotta">{slotLabel(m.slot)}</p>
                {m.recipeId ?
                <Link to={`/app/recipes/${m.recipeId}`} className={`block truncate font-display text-xl hover:underline ${isDone ? 'text-cocoa/50 line-through' : ''}`}>{m.title}</Link> :

                <p className={`truncate font-display text-xl ${isDone ? 'text-cocoa/50 line-through' : ''}`}>{m.title}</p>
                }
              </div>
              <span className="hidden text-xs text-cocoa/55 sm:block">≈{m.nutrition.calories} kcal</span>
              <button
                type="button"
                onClick={() => toggleMeal(di, m.slot, m.title)}
                aria-pressed={isDone}
                aria-label={isDone ? `Mark ${m.title} as not eaten` : `Mark ${m.title} as enjoyed`}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-150 active:scale-90 ${isDone ? 'border-botanical bg-botanical text-cream' : 'border-cocoa/25 text-transparent hover:border-cocoa/60'}`}>
                
                <CheckIcon className="h-4 w-4" />
              </button>
            </li>);

        })}
      </ol>
      <Link to="/app/plan" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline">Open My Plan <ArrowRightIcon className="h-4 w-4" /></Link>
    </div>);

}