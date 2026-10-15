import React from 'react';
import { CheckIcon } from 'lucide-react';
import { MealPlan } from '../../types/plan';
import { SLOTS, completionKey } from '../../utils/plan';
import { formatDay } from '../../utils/dates';

interface Props {
  plan: MealPlan;
  completed: Record<string, boolean>;
  selected: number;
  onSelect: (i: number) => void;
}

export function WeeklyTable({ plan, completed, selected, onSelect }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[880px] table-fixed border-collapse text-left">
        <caption className="sr-only">Weekly meal overview</caption>
        <thead>
          <tr>
            <th scope="col" className="w-36 pb-3 text-xs font-semibold text-cocoa/50">Meal</th>
            {plan.days.map((d, i) =>
            <th key={d.date} scope="col" className="pb-3">
                <button type="button" onClick={() => onSelect(i)} className={`text-left text-sm font-semibold ${selected === i ? 'text-terracotta' : 'text-cocoa'} hover:underline`}>{formatDay(d.date, 'EEE d')}</button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map((s) =>
          <tr key={s.slot} className="border-t border-cocoa/10">
              <th scope="row" className="py-3 pr-3 align-top font-display text-lg font-normal italic text-botanical">{s.label}</th>
              {plan.days.map((d, i) => {
              const meal = d.meals.find((m) => m.slot === s.slot);
              const done = completed[completionKey(i, s.slot)];
              return (
                <td key={d.date} className={`py-3 pr-3 align-top text-xs leading-snug ${selected === i ? 'bg-sage/15' : ''}`}>
                    <button type="button" onClick={() => onSelect(i)} className="flex w-full items-start gap-1.5 px-1 text-left">
                      {done && <CheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-botanical" aria-label="Enjoyed" />}
                      <span className={done ? 'text-cocoa/50' : 'text-cocoa/85'}>{meal?.title}</span>
                    </button>
                  </td>);

            })}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}