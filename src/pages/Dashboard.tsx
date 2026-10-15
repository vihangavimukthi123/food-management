import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { WelcomeOverlay } from '../components/dashboard/WelcomeOverlay';
import { TodayPlan } from '../components/dashboard/TodayPlan';
import { CoachQuickAsk } from '../components/dashboard/CoachQuickAsk';
import { KitchenPulse } from '../components/dashboard/KitchenPulse';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { SafeImage } from '../components/SafeImage';
import { Reveal } from '../components/Reveal';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';
import { images } from '../data/images';
import { goals } from '../data/goals';
import { getRecipe, recommendRecipes, allergenLabel } from '../utils/recommend';
import { completionKey, dayTotals, todayIndex } from '../utils/plan';
import { greeting } from '../utils/dates';

const discoveries = [
{ label: 'Sri Lankan classics', category: 'Sri Lankan' },
{ label: 'Ready in 20 minutes', category: 'Quick' },
{ label: 'High-protein plates', category: 'High-protein' },
{ label: 'Family table', category: 'Family' }];


export function Dashboard() {
  const { data } = useAccount();
  const { profile, plan, pantry } = data;
  const first = profile.name.split(' ')[0];
  const goal = goals.find((g) => g.id === profile.goal);
  const recs = useMemo(() => recommendRecipes(profile, pantry, { limit: 5 }), [profile, pantry]);
  const inspiration = recs[0];
  const recent = data.recent.map(getRecipe).filter(Boolean).slice(0, 4);

  const today = plan ? plan.days[todayIndex(plan)] : null;
  const totals = today ? dayTotals(today) : null;
  const enjoyed = today && plan ? today.meals.filter((m) => data.completed[completionKey(todayIndex(plan), m.slot)]).reduce((s, m) => s + m.nutrition.calories, 0) : 0;
  const weekDone = Object.values(data.completed).filter(Boolean).length;

  return (
    <div className="grain bg-[#f1e6cf] text-cocoa">
      <WelcomeOverlay name={profile.name} />
      <DriftingLeaves color="#b8913f" opacity={0.18} leaves={[{ x: 92, y: 6, size: 60, rotate: -24, shape: 'sprig', duration: 20 }, { x: 2, y: 40, size: 36, rotate: 18, shape: 'leaf', duration: 16 }]} />
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-24 lg:px-8 lg:pt-28">
        {/* Greeting + inspiration + today */}
        <div className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <h1 className="font-display text-5xl leading-[1] sm:text-6xl lg:text-7xl">{greeting()}, <span className="italic text-terracotta">{first}.</span></h1>
              <p className="mt-3 text-lg text-cocoa/65">Let’s make today delicious.</p>
            </Reveal>
            <div className="relative mt-8">
              <SafeImage eager src={images.dashboard} alt="Morning light over a breakfast table with fruit, bread and honey" className="h-[340px] w-full object-cover sm:h-[460px]" />
              {inspiration &&
              <Link to={`/app/recipes/${inspiration.id}`} className="group absolute -bottom-10 left-4 right-4 flex items-center gap-5 bg-ivory p-4 shadow-[0_20px_50px_rgba(36,23,15,0.18)] sm:left-8 sm:right-auto sm:w-[440px]">
                  <SafeImage src={inspiration.image} alt="" className="h-24 w-20 shrink-0 object-cover" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-terracotta">Today’s inspiration</p>
                    <p className="mt-1 font-display text-2xl leading-tight group-hover:underline">{inspiration.title}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-cocoa/60"><ClockIcon className="h-3.5 w-3.5" />{inspiration.prepTime + inspiration.cookTime} min · {inspiration.difficulty}</p>
                  </div>
                  <ArrowRightIcon className="ml-auto h-5 w-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              }
            </div>
          </div>

          <aside className="space-y-10 lg:pt-4">
            <Link to="/app/profile" className="group flex items-center gap-4 border-b border-cocoa/15 pb-6">
              {profile.avatar ? <img src={profile.avatar} alt="" className="h-14 w-14 rounded-full object-cover" /> : <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta font-display text-2xl text-cream">{first[0]}</span>}
              <div className="min-w-0 flex-1">
                <p className="font-display text-2xl group-hover:underline">{profile.name}</p>
                <p className="truncate text-sm text-cocoa/60">{goal?.label}{profile.allergies.length ? ` · avoids ${profile.allergies.map((a) => allergenLabel(a).toLowerCase()).join(', ')}` : ''}</p>
              </div>
            </Link>
            <TodayPlan />
          </aside>
        </div>

        {/* Nutrition + coach */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <section aria-labelledby="nutrition">
            <h2 id="nutrition" className="font-display text-3xl">Today’s nourishment</h2>
            {totals ?
            <>
                <p className="mt-4 text-sm text-cocoa/65"><span className="font-display text-5xl text-cocoa">{enjoyed.toLocaleString()}</span> of ≈{totals.calories.toLocaleString()} kcal planned so far</p>
                <dl className="mt-6 space-y-4">
                  {[{ k: 'Protein', v: totals.protein, max: 140, c: 'bg-terracotta' }, { k: 'Carbohydrates', v: totals.carbs, max: 320, c: 'bg-honey' }, { k: 'Fat', v: totals.fat, max: 110, c: 'bg-olive' }, { k: 'Fibre', v: totals.fibre, max: 50, c: 'bg-botanical' }].map((n) =>
                <div key={n.k} className="grid grid-cols-[110px_1fr_56px] items-center gap-3 text-sm">
                      <dt className="text-cocoa/70">{n.k}</dt>
                      <dd className="h-1.5 overflow-hidden rounded-full bg-cocoa/10"><div className={`h-full ${n.c}`} style={{ width: `${Math.min(100, n.v / n.max * 100)}%` }} /></dd>
                      <dd className="text-right tabular-nums">{n.v} g</dd>
                    </div>
                )}
                </dl>
                <p className="mt-5 text-xs text-cocoa/50">Estimates from your plan, for orientation only. {weekDone} meals enjoyed this week.</p>
              </> :

            <p className="mt-4 text-sm text-cocoa/60">Create a plan to see an estimated daily overview.</p>
            }
          </section>
          <CoachQuickAsk />
        </div>

        {/* Recommendations */}
        <section aria-labelledby="recs" className="mt-24">
          <div className="flex items-baseline justify-between">
            <h2 id="recs" className="font-display text-4xl">Chosen for you</h2>
            <Link to="/app/recipes" className="text-sm font-semibold hover:underline">All recipes</Link>
          </div>
          <div className="no-scrollbar -mx-5 mt-6 flex snap-x gap-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:overflow-visible lg:px-0">
            {recs.slice(1, 5).map((r, i) =>
            <Link key={r.id} to={`/app/recipes/${r.id}`} className="group w-[240px] shrink-0 snap-start lg:w-auto">
                <div className="overflow-hidden">
                  <SafeImage src={r.image} alt={r.title} className={`w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${i === 0 ? 'aspect-[4/5] lg:aspect-[5/4]' : 'aspect-[4/5]'}`} />
                </div>
                <p className="mt-3 text-xs text-cocoa/55">{r.cuisine} · {r.prepTime + r.cookTime} min</p>
                <p className={`font-display leading-tight group-hover:underline ${i === 0 ? 'text-3xl' : 'text-2xl'}`}>{r.title}</p>
              </Link>
            )}
          </div>
        </section>

        {/* Kitchen + waste */}
        <div className="mt-24"><KitchenPulse /></div>

        {/* Recent + discovery + activity */}
        <div className="mt-24 grid gap-14 lg:grid-cols-3">
          <section aria-labelledby="recent">
            <h2 id="recent" className="font-display text-3xl">Recently viewed</h2>
            {recent.length ?
            <ul className="mt-5 space-y-4">
                {recent.map((r) => r &&
              <li key={r.id}>
                    <Link to={`/app/recipes/${r.id}`} className="group flex items-center gap-4">
                      <SafeImage src={r.image} alt="" className="h-14 w-14 object-cover" />
                      <span className="font-display text-xl group-hover:underline">{r.title}</span>
                    </Link>
                  </li>
              )}
              </ul> :
            <p className="mt-4 text-sm text-cocoa/60">Recipes you open will appear here.</p>}
          </section>
          <section aria-labelledby="discover">
            <h2 id="discover" className="font-display text-3xl">Discover something new</h2>
            <ul className="mt-5 divide-y divide-cocoa/10 border-y border-cocoa/10">
              {discoveries.map((d) =>
              <li key={d.label}>
                  <Link to={`/app/recipes?category=${encodeURIComponent(d.category)}`} className="group flex items-center justify-between py-3.5">
                    <span className="font-display text-xl">{d.label}</span>
                    <ArrowRightIcon className="h-4 w-4 text-cocoa/40 transition-[transform,color] duration-150 group-hover:translate-x-0.5 group-hover:text-cocoa" />
                  </Link>
                </li>
              )}
              <li>
                <Link to="/app/substitutions" className="group flex items-center justify-between py-3.5">
                  <span className="font-display text-xl">Local ingredient swaps</span>
                  <ArrowRightIcon className="h-4 w-4 text-cocoa/40 transition-[transform,color] duration-150 group-hover:translate-x-0.5 group-hover:text-cocoa" />
                </Link>
              </li>
            </ul>
          </section>
          <ActivityFeed />
        </div>
      </div>
    </div>);

}