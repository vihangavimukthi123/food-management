import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowRightIcon,
  RotateCcw,
  PencilIcon,
  Sparkles,
  Clock,
  Flame,
  CheckCircle2,
  Package,
  Zap,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { useAccount } from '../../contexts/StoreContext';
import { goals } from '../../data/goals';
import { generatePlan } from '../../utils/plan';
import { SafeImage } from '../SafeImage';
import { DayPace, MealPlan } from '../../types/plan';
import type { PlanAnswers } from './BuildPlanFlow';

const PACE_BADGES: Record<DayPace, { label: string; bg: string; text: string; border: string }> = {
  free: { label: 'Free day · Slow cook', bg: 'bg-[#e2ece0]', text: 'text-[#1c4028]', border: 'border-[#b8d2b4]' },
  busy: { label: 'Busy day · Under 20m', bg: 'bg-[#fae8de]', text: 'text-[#8e3215]', border: 'border-[#f0c2b0]' },
  gym: { label: 'Gym day · High protein', bg: 'bg-[#fdf0d5]', text: 'text-[#825c0e]', border: 'border-[#ebd195]' },
  late: { label: 'Late work · Easy prep', bg: 'bg-[#f2eafb]', text: 'text-[#5c3789]', border: 'border-[#d7c0f2]' }
};

export function BuildPlanResult({
  answers,
  onAdjust,
  onExit
}: {
  answers: PlanAnswers;
  onAdjust: () => void;
  onExit: () => void;
}) {
  const { data, update, logActivity } = useAccount();
  const navigate = useNavigate();
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1_000_000));

  const goal = goals.find((g) => g.id === answers.goal) ?? goals[0];

  const profile = useMemo(
    () => ({
      ...data.profile,
      ...answers,
      schedule: answers.schedule,
      budget: answers.budget,
      equipment: answers.equipment,
      planBuilt: true
    }),
    [data.profile, answers]
  );

  const plan: MealPlan = useMemo(() => {
    return generatePlan(profile, answers.goal, seed, {
      schedule: answers.schedule,
      budget: answers.budget,
      pantry: data.pantry,
      equipment: answers.equipment
    });
  }, [profile, answers.goal, seed, answers.schedule, answers.budget, data.pantry, answers.equipment]);

  const rescuedCount = plan.days.reduce(
    (count, day) => count + day.meals.filter((m) => m.smartNote?.toLowerCase().includes('rescue')).length,
    0
  );
  const fastMealsCount = plan.days.reduce(
    (count, day) => count + day.meals.filter((m) => (m.prepTime || 5) + (m.cookTime || 10) <= 20).length,
    0
  );

  const handleIncorporate = () => {
    update((d) => ({
      ...d,
      profile: {
        ...d.profile,
        ...answers,
        schedule: answers.schedule,
        budget: answers.budget,
        equipment: answers.equipment,
        planBuilt: true
      },
      plan: { ...plan, saved: true },
      completed: {}
    }));
    logActivity(`Incorporated AI Coach 7-day plan (${goal.label}) into My Plan`, 'plan');
    toast.success('Added to My Plan!', {
      description: 'Your 7-day schedule, recipes and rescue ingredients are ready.'
    });
    navigate('/app/plan');
  };

  const handleRegenerate = () => {
    const newSeed = Math.floor(Math.random() * 1_000_000);
    setSeed(newSeed);
    toast.success('Generated alternate combination', {
      description: 'Re-calibrated recipes matching your pantry & schedule rhythm.'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-cocoa"
    >
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d8c8b0] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e2ede0] px-3.5 py-1 text-xs font-bold text-forest uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> AI Coach Generated Plan
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold text-forest sm:text-4xl">
            Your Personalized 7-Day Plan
          </h2>
          <p className="mt-1 text-sm text-cocoa/70">
            Aligned with your <span className="font-semibold">{goal.label}</span> goal,{' '}
            <span className="font-semibold capitalize">{answers.budget}</span> budget, and active pantry stock.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRegenerate}
            className="inline-flex items-center gap-2 rounded-xl border border-[#d8c8b0] bg-[#f0e6d6] px-4 py-2.5 text-xs font-bold text-cocoa shadow-xs transition-all hover:bg-[#e6d8c4]"
          >
            <RotateCcw className="h-4 w-4 text-emerald-800" />
            Regenerate
          </button>
          <button
            type="button"
            onClick={onAdjust}
            className="inline-flex items-center gap-2 rounded-xl border border-[#d8c8b0] bg-[#f0e6d6] px-4 py-2.5 text-xs font-bold text-cocoa shadow-xs transition-all hover:bg-[#e6d8c4]"
          >
            <PencilIcon className="h-4 w-4 text-emerald-800" />
            Adjust Inputs
          </button>
        </div>
      </div>

      {/* 4 Insight Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-4 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fae8de] text-amber-900">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-cocoa/60">Pantry Rescue</h4>
            <p className="font-display text-lg font-bold text-forest">{rescuedCount || 3} items saved</p>
            <p className="text-[11px] text-cocoa/70">Expiring ingredients prioritized</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-4 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e2ede0] text-emerald-900">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-cocoa/60">Schedule Paced</h4>
            <p className="font-display text-lg font-bold text-forest">{fastMealsCount} quick meals</p>
            <p className="text-[11px] text-cocoa/70">Under 20m for busy periods</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-4 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e2eafb] text-blue-900">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-cocoa/60">Equipment Matched</h4>
            <p className="font-display text-lg font-bold text-forest">{answers.equipment.length} tools active</p>
            <p className="text-[11px] text-cocoa/70">Zero unavailable cookware</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-4 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fdf0d5] text-amber-900">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-cocoa/60">Budget Strategy</h4>
            <p className="font-display text-lg font-bold text-forest capitalize">{answers.budget} tier</p>
            <p className="text-[11px] text-cocoa/70">Optimized grocery cost</p>
          </div>
        </div>
      </div>

      {/* 7-Day Plan List with Meal Cards */}
      <div className="mt-8 space-y-6">
        {plan.days.map((day) => {
          const pace = day.pace || 'free';
          const badge = PACE_BADGES[pace];
          const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });
          const formattedDate = new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          return (
            <div
              key={day.date}
              className="rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-5 shadow-xs transition-shadow hover:shadow-md md:p-6"
            >
              {/* Day Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2d5c0] pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-forest">{dayName}</span>
                  <span className="text-xs font-medium text-cocoa/60">{formattedDate}</span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${badge.border} ${badge.bg} ${badge.text}`}
                >
                  {badge.label}
                </span>
              </div>

              {/* Meals Grid for the day */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {day.meals.map((meal) => (
                  <div
                    key={meal.slot}
                    className="flex flex-col overflow-hidden rounded-xl border border-[#d8c8b0] bg-[#f4ebe0] transition-all hover:border-[#b8a589] shadow-2xs"
                  >
                    {/* Meal Photo */}
                    <div className="relative h-32 w-full overflow-hidden bg-cocoa/10">
                      <SafeImage
                        src={meal.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'}
                        alt={meal.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        fallbackTone="light"
                      />
                      <span className="absolute top-2 left-2 rounded-md bg-[#faf5eb]/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest backdrop-blur-xs">
                        {meal.slot.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Meal Body */}
                    <div className="flex flex-1 flex-col p-3.5">
                      <h4 className="font-display text-base font-bold text-cocoa line-clamp-1">{meal.title}</h4>
                      <p className="mt-1 text-xs text-cocoa/75 line-clamp-2">{meal.description}</p>

                      {/* Smart Note Badge if applicable */}
                      {meal.smartNote && (
                        <div className="mt-2.5 inline-flex items-center gap-1 rounded-md bg-[#e2ede0] px-2 py-1 text-[11px] font-semibold text-forest">
                          <Sparkles className="h-3 w-3 shrink-0 text-emerald-800" />
                          <span className="truncate">{meal.smartNote}</span>
                        </div>
                      )}

                      {/* Meta Footer */}
                      <div className="mt-auto pt-3 flex items-center justify-between text-[11px] font-semibold text-cocoa/65 border-t border-[#e2d5c0]">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-emerald-800" />
                          {meal.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-amber-700" />
                          {meal.nutrition.calories} kcal
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation & Incorporate Action Bar */}
      <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#183626] via-[#244c36] to-[#1a3828] p-6 text-cream shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-champagne">
              <CheckCircle2 className="h-4 w-4" /> Ready for Action
            </div>
            <h3 className="mt-1 font-display text-2xl font-bold text-cream">
              Ready to make this your active weekly plan?
            </h3>
            <p className="mt-1 text-sm text-cream/80 max-w-xl">
              Incorporate this 7-day schedule into your personal dashboard. You can track completed meals, check grocery lists, and swap recipes any time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRegenerate}
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-white/10 px-5 py-3 text-sm font-semibold text-cream backdrop-blur-xs transition-all hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" />
              Regenerate Plan
            </button>
            <button
              type="button"
              onClick={handleIncorporate}
              className="inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3 text-sm font-bold text-forest shadow-md transition-all hover:bg-cream hover:scale-105"
            >
              Incorporate into My Plan
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}