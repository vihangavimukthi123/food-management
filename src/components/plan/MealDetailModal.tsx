import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Modal } from '../Modal';
import { SafeImage } from '../SafeImage';
import { PlannedMeal } from '../../types/plan';
import { slotLabel } from '../../utils/plan';
import { buttonClass } from '../../utils/styles';

interface Props {
  meal: PlannedMeal | null;
  done: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function MealDetailModal({ meal, done, onClose, onToggle }: Props) {
  return (
    <Modal open={Boolean(meal)} onClose={onClose} title={meal?.title ?? ''} size="lg">
      {meal &&
      <div className="grid gap-8 sm:grid-cols-[1fr_1.1fr]">
          <div>
            {meal.image ? <SafeImage src={meal.image} alt={meal.title} className="aspect-[4/5] w-full object-cover" /> : <div className="kraft flex aspect-[4/5] w-full items-center justify-center font-display text-2xl italic text-earth">{slotLabel(meal.slot)}</div>}
          </div>
          <div>
            <p className="text-xs font-semibold text-terracotta">{slotLabel(meal.slot)} · {meal.portion}</p>
            <p className="mt-3 text-cocoa/75">{meal.description}</p>
            <h3 className="mt-6 text-sm font-semibold">Ingredients</h3>
            <ul className="mt-2 space-y-1.5">{meal.ingredients.map((i) => <li key={i} className="border-b border-cocoa/10 pb-1.5 text-sm">{i}</li>)}</ul>
            <h3 className="mt-6 text-sm font-semibold">Estimated nutrition for this portion</h3>
            <dl className="mt-2 grid grid-cols-4 gap-2 text-center">
              {[['kcal', meal.nutrition.calories], ['protein', `${meal.nutrition.protein}g`], ['carbs', `${meal.nutrition.carbs}g`], ['fat', `${meal.nutrition.fat}g`]].map(([k, v]) =>
            <div key={k} className="bg-cocoa/[0.04] py-3"><dd className="font-display text-2xl">{v}</dd><dt className="text-xs text-cocoa/55">{k}</dt></div>
            )}
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={onToggle} className={buttonClass(done ? 'secondary' : 'primary')}>
                <CheckIcon className="h-4 w-4" />{done ? 'Enjoyed — undo' : 'Mark as enjoyed'}
              </button>
              {meal.recipeId && <Link to={`/app/recipes/${meal.recipeId}`} className={buttonClass('ghost')}>View recipe <ArrowRightIcon className="h-4 w-4" /></Link>}
            </div>
          </div>
        </div>
      }
    </Modal>);

}