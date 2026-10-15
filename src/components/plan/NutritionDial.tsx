import React from 'react';
import { motion } from 'framer-motion';
import { Nutrition } from '../../types/recipe';

export function NutritionDial({ totals }: {totals: Nutrition;}) {
  const parts = [
  { k: 'Protein', kcal: totals.protein * 4, g: totals.protein, color: '#c0623f' },
  { k: 'Carbohydrates', kcal: totals.carbs * 4, g: totals.carbs, color: '#d9a441' },
  { k: 'Fat', kcal: totals.fat * 9, g: totals.fat, color: '#6c6a3a' }];

  const sum = parts.reduce((s, p) => s + p.kcal, 0) || 1;
  const r = 70;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-8">
      <div className="relative h-44 w-44 shrink-0">
        <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90" role="img" aria-label={`Estimated ${totals.calories} kcal: ${totals.protein} g protein, ${totals.carbs} g carbohydrates, ${totals.fat} g fat`}>
          <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(36,23,15,0.08)" strokeWidth="14" />
          {parts.map((p) => {
            const len = p.kcal / sum * c;
            const el =
            <motion.circle
              key={p.k}
              cx="90" cy="90" r={r} fill="none" stroke={p.color} strokeWidth="14"
              strokeDasharray={`${Math.max(0, len - 3)} ${c}`}
              initial={false}
              animate={{ strokeDashoffset: -offset }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />;


            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl leading-none">{totals.calories.toLocaleString()}</span>
          <span className="mt-1 text-xs text-cocoa/55">kcal, estimated</span>
        </div>
      </div>
      <dl className="space-y-3 text-sm">
        {parts.map((p) =>
        <div key={p.k} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} aria-hidden="true" />
            <dt className="w-28 text-cocoa/65">{p.k}</dt>
            <dd className="tabular-nums font-semibold">{p.g} g</dd>
          </div>
        )}
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-botanical" aria-hidden="true" />
          <dt className="w-28 text-cocoa/65">Fibre</dt>
          <dd className="tabular-nums font-semibold">{totals.fibre} g</dd>
        </div>
      </dl>
    </div>);

}