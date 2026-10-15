import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useAccount } from '../../contexts/StoreContext';
import { daysUntil, expiryLabel } from '../../utils/dates';
import { pantryCategories } from '../../data/options';

export function KitchenPulse() {
  const { data } = useAccount();
  const expiring = useMemo(() => [...data.pantry].filter((p) => daysUntil(p.expiry) <= 4).sort((a, b) => daysUntil(a.expiry) - daysUntil(b.expiry)).slice(0, 5), [data.pantry]);
  const low = data.pantry.filter((p) => p.quantity <= p.lowAt);
  const recentWaste = data.waste.filter((w) => daysUntil(w.date) >= -30);
  const reasonCounts = recentWaste.reduce<Record<string, number>>((acc, w) => ({ ...acc, [w.reason]: (acc[w.reason] ?? 0) + 1 }), {});
  const topReason = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <section aria-labelledby="kitchen-pulse">
        <div className="flex items-baseline justify-between">
          <h2 id="kitchen-pulse" className="font-display text-3xl">Your kitchen, right now</h2>
          <Link to="/app/kitchen" className="text-sm font-semibold hover:underline">{data.pantry.length} ingredients</Link>
        </div>
        {expiring.length ?
        <ul className="mt-5 space-y-2">
            {expiring.map((p) => {
            const d = daysUntil(p.expiry);
            const color = pantryCategories.find((c) => c.id === p.category)?.color;
            return (
              <li key={p.id} className="flex items-center gap-3 border-b border-cocoa/10 pb-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: color }} aria-hidden="true" />
                  <span className="flex-1 font-display text-xl">{p.name}</span>
                  <span className={`text-xs font-semibold ${d <= 1 ? 'text-burnt' : 'text-olive'}`}>{expiryLabel(p.expiry)}</span>
                </li>);

          })}
          </ul> :

        <p className="mt-5 text-sm text-cocoa/60">Nothing expires in the next few days. Lovely.</p>
        }
        <p className="mt-4 text-sm text-cocoa/65">{low.length ? `${low.length} item${low.length === 1 ? '' : 's'} running low — ${low.slice(0, 3).map((l) => l.name.toLowerCase()).join(', ')}.` : 'Nothing is running low.'}</p>
      </section>
      <section aria-labelledby="waste-insight" className="kraft p-7">
        <h2 id="waste-insight" className="font-display text-3xl">Food rescue</h2>
        <p className="mt-4 font-display text-6xl leading-none">{recentWaste.length}</p>
        <p className="mt-1 text-sm text-cocoa/65">items logged as wasted in the last 30 days</p>
        {topReason && <p className="mt-4 text-sm text-cocoa/80">Most often: <span className="font-semibold">{topReason[0].toLowerCase()}</span>. {expiring[0] ? `Rescue your ${expiring[0].name.toLowerCase()} before it goes.` : ''}</p>}
        <Link to="/app/waste" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:underline">Find a rescue recipe <ArrowRightIcon className="h-4 w-4" /></Link>
      </section>
    </div>);

}