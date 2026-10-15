import React from 'react';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { comparison } from '../../data/landing';

function Mark({ v }: {v: boolean | string;}) {
  if (v === true) return <CheckIcon className="mx-auto h-5 w-5 text-champagne" aria-label="Yes" />;
  if (v === 'partial') return <span className="block text-center text-xs text-cream/50">Sometimes</span>;
  return <MinusIcon className="mx-auto h-4 w-4 text-cream/25" aria-label="No" />;
}

export function LandingDifference() {
  return (
    <section className="grain grain-light bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <p className="font-display text-xl italic text-champagne">The DailyPlate difference</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] lg:text-6xl">Not a recipe site. Not a meal planner. A connected food world.</h2>
            <p className="mt-6 max-w-md text-cream/65">The value is in the connections: a change to your profile ripples through your coach, your plan, your recipes and your kitchen at once.</p>
          </Reveal>
          <Reveal delay={0.05} className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">How DailyPlate compares with a typical recipe website and meal planner</caption>
              <thead>
                <tr className="border-b border-cream/20 text-sm">
                  <th scope="col" className="py-4 font-medium text-cream/50">Capability</th>
                  <th scope="col" className="w-32 py-4 text-center font-display text-xl text-champagne">DailyPlate</th>
                  <th scope="col" className="w-32 py-4 text-center font-medium text-cream/60">Recipe site</th>
                  <th scope="col" className="w-32 py-4 text-center font-medium text-cream/60">Meal planner</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) =>
                <tr key={row.feature} className="border-b border-cream/10">
                    <th scope="row" className="py-5 pr-4 font-display text-xl font-normal">{row.feature}</th>
                    <td className="bg-cream/[0.04] py-5"><Mark v={row.dp} /></td>
                    <td className="py-5"><Mark v={row.recipe} /></td>
                    <td className="py-5"><Mark v={row.planner} /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </Reveal>
        </div>
      </div>
    </section>);

}