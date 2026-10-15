import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { TriangleAlertIcon, BookmarkIcon, RefreshCwIcon, SparklesIcon, HistoryIcon } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { usePlanActions } from '../hooks/usePlanActions';
import { goals } from '../data/goals';
import { images } from '../data/images';
import { SafeImage } from '../components/SafeImage';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';
import { MealTimeline } from '../components/plan/MealTimeline';
import { NutritionDial } from '../components/plan/NutritionDial';
import { WeeklyTable } from '../components/plan/WeeklyTable';
import { MealDetailModal } from '../components/plan/MealDetailModal';
import { PrototypeNotice } from '../components/PrototypeNotice';
import { PlannedMeal } from '../types/plan';
import { completionKey, dayTotals, todayIndex } from '../utils/plan';
import { formatDay, isoDaysFromNow } from '../utils/dates';
import { getRecipe, recipeConflicts } from '../utils/recommend';
import { buttonClass } from '../utils/styles';

export function MyPlan() {
  const { data } = useAccount();
  const { toggleMeal, regenerate, savePlan } = usePlanActions();
  const plan = data.plan;
  const [selected, setSelected] = useState(() => plan ? todayIndex(plan) : 0);
  const [detail, setDetail] = useState<PlannedMeal | null>(null);
  const [busy, setBusy] = useState(false);

  const activeGoal = plan?.goal ?? data.profile.goal;
  const goal = goals.find((g) => g.id === activeGoal) ?? goals[0];

  const outdated = useMemo(() => {
    if (!plan) return 0;
    return plan.days.flatMap((d) => d.meals).filter((m) => {
      const r = m.recipeId ? getRecipe(m.recipeId) : undefined;
      return r ? recipeConflicts(r, data.profile).length > 0 : false;
    }).length;
  }, [plan, data.profile]);

  const run = (g = activeGoal) => {
    setBusy(true);
    window.setTimeout(() => {
      const next = regenerate(g);
      setSelected(todayIndex(next));
      setBusy(false);
      toast.success('A fresh week is ready', { description: `${goals.find((x) => x.id === g)?.label} · respecting your allergies and diet` });
    }, 350);
  };

  const day = plan?.days[selected];
  const totals = day ? dayTotals(day) : null;
  const doneToday = day ? day.meals.filter((m) => data.completed[completionKey(selected, m.slot)]).length : 0;

  return (
    <div className="grain min-h-screen bg-ivory text-cocoa">
      <header className="relative h-[380px] overflow-hidden sm:h-[440px]">
        <SafeImage eager src={images.plan} alt="Small bowls of grains, greens, lentils and fruit on ivory linen" className="h-full w-full object-cover" />
        <DriftingLeaves color="#6f8a5e" opacity={0.35} leaves={[{ x: 85, y: 30, size: 50, rotate: -20, shape: 'sprig', duration: 18 }, { x: 12, y: 18, size: 30, rotate: 25, shape: 'leaf', duration: 15 }]} />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="max-w-2xl bg-ivory px-6 pb-2 pt-7 sm:px-10">
            <p className="font-display text-xl italic text-botanical">My Plan · {formatDay(isoDaysFromNow(0), 'EEEE d MMMM')}</p>
            <h1 className="mt-2 font-display text-5xl leading-[1] sm:text-6xl">A week for <span className="italic">{goal.label.toLowerCase()}.</span></h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 pb-24 lg:px-8">
        <div className="max-w-2xl px-6 sm:px-10">
          <p className="pt-3 text-cocoa/65">{goal.direction}</p>
        </div>

        <section aria-labelledby="goal-select" className="mt-10 flex flex-col gap-5 border-y border-cocoa/10 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <h2 id="goal-select" className="shrink-0 text-xs font-semibold text-cocoa/55">Goal</h2>
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {goals.map((g) =>
              <button key={g.id} type="button" disabled={busy} aria-pressed={activeGoal === g.id} onClick={() => g.id !== activeGoal && run(g.id)} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${activeGoal === g.id ? 'bg-botanical text-cream' : 'text-cocoa/70 hover:bg-cocoa/5'}`}>{g.label}</button>
              )}
            </div>
          </div>
          <div className="flex shrink-0 gap-2 items-center">
            <Link to="/app/history" className={buttonClass('secondary')}>
              <HistoryIcon className="h-4 w-4" />History
            </Link>
            <button type="button" onClick={() => run()} disabled={busy} className={buttonClass('secondary')}>
              <RefreshCwIcon className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} />{plan ? 'Regenerate' : 'Generate plan'}
            </button>
            {plan && <button type="button" onClick={savePlan} disabled={plan.saved} className={buttonClass('primary')}><BookmarkIcon className="h-4 w-4" />{plan.saved ? 'Saved' : 'Save plan'}</button>}
          </div>
        </section>

        {outdated > 0 &&
        <div role="alert" className="mt-6 flex flex-col gap-3 border-l-2 border-terracotta bg-terracotta/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm"><TriangleAlertIcon className="h-4 w-4 text-terracotta" />Your profile changed — {outdated} planned meal{outdated === 1 ? '' : 's'} no longer fit your allergies, diet or dislikes.</p>
            <button type="button" onClick={() => run()} className="text-sm font-semibold text-terracotta hover:underline">Regenerate to fix</button>
          </div>
        }

        {!plan || !day || !totals ?
        <div className="py-28 text-center">
            <SparklesIcon className="mx-auto h-8 w-8 text-botanical" />
            <h2 className="mt-4 font-display text-4xl">Your week is waiting to be written.</h2>
            <p className="mx-auto mt-2 max-w-md text-cocoa/65">Generate a goal-based plan in a moment, or build a more personal one with your coach.</p>
            <div className="mt-8 flex justify-center gap-3">
              <button type="button" onClick={() => run()} className={buttonClass('primary')}>Generate my plan</button>
              <Link to="/app/coach" state={{ build: true }} className={buttonClass('secondary')}>Build with my coach</Link>
            </div>
          </div> :

        <motion.div key={plan.seed} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav aria-label="Days of the week" className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
              {plan.days.map((d, i) => {
              const n = d.meals.filter((m) => data.completed[completionKey(i, m.slot)]).length;
              return (
                <button key={d.date} type="button" onClick={() => setSelected(i)} aria-current={selected === i ? 'date' : undefined} className={`flex min-w-[96px] flex-col items-start px-4 py-3 text-left transition-colors duration-150 ${selected === i ? 'bg-botanical text-cream' : 'bg-cocoa/[0.03] hover:bg-cocoa/[0.07]'}`}>
                    <span className="text-xs opacity-70">{i === todayIndex(plan) ? 'Today' : formatDay(d.date, 'EEEE')}</span>
                    <span className="font-display text-2xl">{formatDay(d.date, 'd MMM')}</span>
                    <span className="mt-2 flex gap-1" aria-label={`${n} of 5 enjoyed`}>
                      {d.meals.map((m, k) => <span key={m.slot} className={`h-1 w-3 rounded-full ${k < n ? selected === i ? 'bg-champagne' : 'bg-botanical' : selected === i ? 'bg-cream/25' : 'bg-cocoa/15'}`} />)}
                    </span>
                  </button>);

            })}
            </nav>

            <div className="mt-14 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
              <MealTimeline
              day={day}
              dayIndex={selected}
              completed={data.completed}
              onToggle={(m) => toggleMeal(selected, m.slot, m.title)}
              onOpen={setDetail} />
            
              <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
                <section aria-labelledby="daily-nutrition">
                  <h2 id="daily-nutrition" className="font-display text-3xl">{formatDay(day.date, 'EEEE')}’s nourishment</h2>
                  <div className="mt-6"><NutritionDial totals={totals} /></div>
                </section>
                <section aria-labelledby="progress">
                  <h2 id="progress" className="font-display text-2xl">Progress</h2>
                  <p className="mt-2 text-sm text-cocoa/65">{doneToday} of {day.meals.length} meals enjoyed on this day.</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cocoa/10"><motion.div className="h-full bg-botanical" initial={false} animate={{ width: `${doneToday / day.meals.length * 100}%` }} transition={{ duration: 0.3 }} /></div>
                </section>
                <section aria-labelledby="notes" className="border-t border-cocoa/10 pt-8">
                  <h2 id="notes" className="font-display text-2xl">Notes for {goal.label.toLowerCase()}</h2>
                  <ul className="mt-3 space-y-2 text-sm text-cocoa/70">{goal.considerations.map((c) => <li key={c}>— {c}</li>)}</ul>
                </section>
                <PrototypeNotice>Portions and nutrition are rough estimates to guide you — not a medical or dietetic prescription. No budget or schedule is used.</PrototypeNotice>
              </aside>
            </div>

            <section aria-labelledby="week" className="mt-20 border-t border-cocoa/10 pt-12">
              <h2 id="week" className="font-display text-4xl">The week at a glance</h2>
              <div className="mt-8"><WeeklyTable plan={plan} completed={data.completed} selected={selected} onSelect={setSelected} /></div>
            </section>
          </motion.div>
        }
      </div>

      <MealDetailModal
        meal={detail}
        done={detail ? Boolean(data.completed[completionKey(selected, detail.slot)]) : false}
        onClose={() => setDetail(null)}
        onToggle={() => detail && toggleMeal(selected, detail.slot, detail.title)} />
      
    </div>);

}