import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Calendar,
  DollarSign,
  Package,
  Wrench,
  ShieldAlert,
  Sparkles,
  Flame,
  Check,
  AlertTriangle,
  Clock,
  RotateCcw
} from 'lucide-react';
import { useAccount } from '../../contexts/StoreContext';
import { goals } from '../../data/goals';
import { allergenOptions, cookingLevels, dietOptions, dislikeSuggestions, favouriteSuggestions, portionStyles } from '../../data/options';
import { Allergen, Diet, Goal } from '../../types/recipe';
import { BudgetTier, DayPace, ScheduleSettings } from '../../types/plan';
import { Profile } from '../../types/user';
import { daysUntil } from '../../utils/dates';
import { Chip } from '../Chip';
import { TagInput } from '../TagInput';
import { BuildPlanResult } from './BuildPlanResult';

export interface PlanAnswers {
  goal: Goal;
  schedule: ScheduleSettings;
  budget: BudgetTier;
  equipment: string[];
  cookingLevel: Profile['cookingLevel'];
  portion: Profile['portion'];
  spice: Profile['spice'];
  allergies: Allergen[];
  restrictions: Diet[];
  dislikes: string[];
  favourites: string[];
  cuisines: string[];
  extraPantry: string[];
  extraExpiring: string[];
}

const STEPS = [
  { id: 'schedule', title: 'Schedule & Time', icon: Calendar },
  { id: 'budget', title: 'Budget & Portions', icon: DollarSign },
  { id: 'pantry', title: 'Pantry & Waste', icon: Package },
  { id: 'equipment', title: 'Equipment & Level', icon: Wrench },
  { id: 'diet', title: 'Allergies & Preferences', icon: ShieldAlert },
  { id: 'generate', title: 'AI Synthesis', icon: Sparkles }
];

const DAYS_OF_WEEK = [
  { code: 'MON', label: 'Mon' },
  { code: 'TUE', label: 'Tue' },
  { code: 'WED', label: 'Wed' },
  { code: 'THU', label: 'Thu' },
  { code: 'FRI', label: 'Fri' },
  { code: 'SAT', label: 'Sat' },
  { code: 'SUN', label: 'Sun' }
];

const PACE_INFO: Record<DayPace, { label: string; bg: string; text: string; border: string; desc: string }> = {
  free: { label: 'Free day', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', desc: 'Time to simmer & cook fresh' },
  busy: { label: 'Busy day', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', desc: 'Fast, under 20-min recipes' },
  gym: { label: 'Gym day', bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-300', desc: 'High-protein recovery fuel' },
  late: { label: 'Late work', bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-300', desc: 'Low-effort sheet pan / quick prep' }
};

const ALL_EQUIPMENT = [
  { id: 'Stove', label: 'Stovetop / Range', desc: 'Pots, pans, saute' },
  { id: 'Oven', label: 'Baking Oven', desc: 'Roasting & casseroles' },
  { id: 'Air Fryer', label: 'Air Fryer', desc: 'Crisp & rapid oil-free' },
  { id: 'Rice Cooker', label: 'Rice Cooker', desc: 'Fluffy grains & steam' },
  { id: 'Blender', label: 'Blender / Food Proc.', desc: 'Purees, soups, dressings' },
  { id: 'Wok', label: 'Wok / Skillet', desc: 'High-heat stir fry' },
  { id: 'Microwave', label: 'Microwave', desc: 'Fast reheating & steam' },
  { id: 'Pressure Cooker', label: 'Instant Pot / Pressure', desc: 'Tender beans & stews' }
];

export function BuildPlanFlow({ onExit }: { onExit: () => void }) {
  const { data } = useAccount();
  const p = data.profile;
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [genIndex, setGenIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Auto-detect expiring items from pantry (<= 3 days)
  const expiringFromPantry = (data.pantry ?? [])
    .filter((item) => daysUntil(item.expiry) <= 3)
    .map((item) => item.name);

  const [answers, setAnswers] = useState<PlanAnswers>({
    goal: p.goal || 'balanced',
    schedule: p.schedule ?? {
      days: { MON: 'free', TUE: 'busy', WED: 'free', THU: 'gym', FRI: 'busy', SAT: 'free', SUN: 'free' },
      maxCookTime: 20
    },
    budget: p.budget || 'balanced',
    equipment: p.equipment?.length ? p.equipment : ['Stove', 'Oven', 'Blender', 'Air Fryer'],
    cookingLevel: p.cookingLevel || 'comfortable',
    portion: p.portion || 'balanced',
    spice: p.spice || 'medium',
    allergies: p.allergies || [],
    restrictions: p.restrictions || [],
    dislikes: p.dislikes || [],
    favourites: p.favourites || [],
    cuisines: p.cuisines || [],
    extraPantry: [],
    extraExpiring: []
  });

  const setDayPace = (dayCode: string, pace: DayPace) => {
    setAnswers((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        days: { ...prev.schedule.days, [dayCode]: pace }
      }
    }));
  };

  const setMaxCookTime = (mins: number) => {
    setAnswers((prev) => ({
      ...prev,
      schedule: { ...prev.schedule, maxCookTime: mins }
    }));
  };

  const toggleEquipment = (eq: string) => {
    setAnswers((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(eq)
        ? prev.equipment.filter((x) => x !== eq)
        : [...prev.equipment, eq]
    }));
  };

  const handleStartGeneration = () => {
    setGenerating(true);
    setGenIndex(0);

    const msgs = [
      'Reading your weekly pace & max cook time...',
      'Auditing kitchen pantry & flagging expiring greens...',
      'Matching available cookware & dietary boundaries...',
      'Synthesizing balanced 7-day culinary roadmap...'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < msgs.length) {
        setGenIndex(current);
      } else {
        clearInterval(interval);
        setGenerating(false);
        setDone(true);
      }
    }, 700);
  };

  if (done) {
    return <BuildPlanResult answers={answers} onAdjust={() => setDone(false)} onExit={onExit} />;
  }

  return (
    <div className="relative min-h-[600px] text-cocoa">
      {/* AI Processing Overlay */}
      {generating && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-white/95 p-8 backdrop-blur-md shadow-2xl">
          <div className="relative mb-6">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-700" />
            <Sparkles className="absolute inset-0 m-auto h-8 w-8 animate-pulse text-emerald-700" />
          </div>
          <motion.p
            key={genIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl text-forest text-center max-w-md"
          >
            {[
              'Reading your weekly pace & max cook time...',
              'Auditing kitchen pantry & flagging expiring greens...',
              'Matching available cookware & dietary boundaries...',
              'Synthesizing balanced 7-day culinary roadmap...'
            ][genIndex]}
          </motion.p>
          <div className="mt-6 h-2 w-64 overflow-hidden rounded-full bg-cocoa/10">
            <motion.div
              className="h-full bg-forest"
              initial={{ width: '10%' }}
              animate={{ width: `${((genIndex + 1) / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="mt-3 text-xs font-semibold tracking-wider text-cocoa/60 uppercase">
            Step {genIndex + 1} of 4
          </span>
        </div>
      )}

      {/* Stepper Header */}
      <div className="mb-8">
        <ol className="flex items-center justify-between gap-2 overflow-x-auto pb-2" aria-label="Step progress">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isCurrent = i === step;
            const isCompleted = i < step;

            return (
              <li key={s.id} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => i <= step && setStep(i)}
                  disabled={i > step}
                  className={`flex w-full items-center gap-2.5 rounded-xl p-2.5 text-left transition-all ${
                    isCurrent
                      ? 'bg-forest text-cream shadow-sm'
                      : isCompleted
                      ? 'bg-[#f0e6d6] border border-[#d8c8b0] text-cocoa hover:bg-[#e6d8c4]'
                      : 'bg-[#faf5eb] border border-[#e4d6c2] text-cocoa/50 opacity-70'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isCurrent ? 'bg-cream text-forest' : isCompleted ? 'bg-[#e2ede0] text-forest' : 'bg-[#e8dcce] text-cocoa/50'
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <div className="hidden lg:block min-w-0">
                    <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-cream' : 'text-cocoa'}`}>{s.title}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-6 shadow-sm md:p-8"
        >
          {/* STEP 0: Schedule & Pace */}
          {step === 0 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Step 1 of 6</span>
                <h2 className="mt-1 font-display text-3xl text-forest lg:text-4xl">Weekly Rhythm & Time Budget</h2>
                <p className="mt-2 text-sm text-cocoa/70">
                  Tell your AI Coach what each day feels like. On busy days, we’ll choose quick 15-minute meals; on gym days, we prioritize recovery protein.
                </p>
              </div>

              {/* Day Rhythm Tiles */}
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-cocoa/60">Configure Daily Pace</label>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
                  {DAYS_OF_WEEK.map((d) => {
                    const currentPace = answers.schedule.days[d.code] || 'free';
                    const paceObj = PACE_INFO[currentPace];

                    return (
                      <div
                        key={d.code}
                        className={`flex flex-col justify-between rounded-xl border p-3 transition-all ${paceObj.border} ${paceObj.bg}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-lg font-bold text-cocoa">{d.label}</span>
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${paceObj.text} bg-white/70`}>
                            {currentPace}
                          </span>
                        </div>
                        <p className="my-2 text-[11px] text-cocoa/70 leading-tight">{paceObj.desc}</p>
                        <div className="grid grid-cols-2 gap-1 pt-1 border-t border-cocoa/10">
                          {(['free', 'busy', 'gym', 'late'] as DayPace[]).map((pType) => (
                            <button
                              key={pType}
                              type="button"
                              onClick={() => setDayPace(d.code, pType)}
                              className={`rounded py-1 text-[10px] font-bold uppercase transition-all ${
                                currentPace === pType
                                  ? 'bg-forest text-cream shadow-sm'
                                  : 'bg-white/80 text-cocoa/60 hover:bg-white hover:text-cocoa'
                              }`}
                            >
                              {pType}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Max Cook Time */}
              <div className="mt-8 border-t border-cocoa/10 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl text-cocoa">Maximum Weekday Cook Time</h3>
                    <p className="text-xs text-cocoa/65">For days marked as 'Busy', recipes will respect this ceiling.</p>
                  </div>
                  <Clock className="h-5 w-5 text-emerald-700" />
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {[15, 20, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setMaxCookTime(mins)}
                      className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all ${
                        answers.schedule.maxCookTime === mins
                          ? 'border-forest bg-forest text-cream shadow-sm'
                          : 'border-cocoa/15 bg-[#faf8f5] text-cocoa hover:border-cocoa/40'
                      }`}
                    >
                      <Clock className="h-4 w-4" />
                      {mins} minutes max
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Budget & Portions */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Step 2 of 6</span>
                <h2 className="mt-1 font-display text-3xl text-forest lg:text-4xl">Budget Tier & Plate Balance</h2>
                <p className="mt-2 text-sm text-cocoa/70">
                  Pick your budget preference so we know whether to build around affordable pantry staples or premium cuts.
                </p>
              </div>

              {/* Budget Tiers */}
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-cocoa/60">Spending & Grocery Strategy</label>
                <div className="mt-3 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      id: 'budget' as BudgetTier,
                      label: 'Budget-Friendly',
                      sub: 'Stretches your groceries',
                      desc: 'Focuses on lentils, rice, root veggies, eggs, and zero-waste pantry combinations.'
                    },
                    {
                      id: 'balanced' as BudgetTier,
                      label: 'Balanced Value',
                      sub: 'Everyday fresh & smart',
                      desc: 'Healthy mix of seasonal produce, legumes, dairy/proteins, and versatile dry goods.'
                    },
                    {
                      id: 'premium' as BudgetTier,
                      label: 'Gourmet / Premium',
                      sub: 'Organic & artisanal cuts',
                      desc: 'Specialty olive oils, heirloom grains, fresh wild catches, and boutique produce.'
                    }
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, budget: b.id }))}
                      className={`flex flex-col text-left rounded-2xl border p-5 transition-all ${
                        answers.budget === b.id
                          ? 'border-forest bg-emerald-50/50 ring-2 ring-forest/30 shadow-sm'
                          : 'border-cocoa/15 bg-[#faf8f5] hover:border-cocoa/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xl font-bold text-forest">{b.label}</span>
                        {answers.budget === b.id && <Check className="h-5 w-5 text-forest" />}
                      </div>
                      <span className="text-xs font-semibold text-emerald-800 mt-0.5">{b.sub}</span>
                      <p className="mt-3 text-xs leading-relaxed text-cocoa/70">{b.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Portions & Spice */}
              <div className="mt-8 grid gap-8 border-t border-cocoa/10 pt-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl text-cocoa">Serving Size</h3>
                  <p className="text-xs text-cocoa/60 mb-3">Adjust calories & bulk without altering flavors.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {portionStyles.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, portion: p.id }))}
                        className={`rounded-xl border p-3 text-center transition-all ${
                          answers.portion === p.id
                            ? 'border-forest bg-forest text-cream'
                            : 'border-cocoa/15 bg-[#faf8f5] text-cocoa hover:border-cocoa/40'
                        }`}
                      >
                        <span className="block text-sm font-bold">{p.label}</span>
                        <span className="block text-[10px] opacity-80 mt-1">{p.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl text-cocoa">Spice Level</h3>
                  <p className="text-xs text-cocoa/60 mb-3">Heat intensity across curries, bowls and marinades.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['mild', 'medium', 'bold'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, spice: s }))}
                        className={`rounded-xl border p-3 text-center transition-all ${
                          answers.spice === s
                            ? 'border-forest bg-forest text-cream'
                            : 'border-cocoa/15 bg-[#faf8f5] text-cocoa hover:border-cocoa/40'
                        }`}
                      >
                        <span className="block text-sm font-bold capitalize">{s}</span>
                        <span className="block text-[10px] opacity-80 mt-1">
                          {s === 'mild' ? 'Subtle herbs' : s === 'medium' ? 'Warm kick' : 'Fiery heat'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Pantry & Wastage Rescue */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Step 3 of 6</span>
                <h2 className="mt-1 font-display text-3xl text-forest lg:text-4xl">Pantry & Waste Zero Rescue</h2>
                <p className="mt-2 text-sm text-cocoa/70">
                  We automatically loaded your pantry stock. Items flagged with urgent expiry are marked for immediate rescue in your plan.
                </p>
              </div>

              {/* Expiring Items Section */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5">
                <div className="flex items-center gap-2 text-amber-900">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <h3 className="font-bold text-sm">Expiring Soon in Your Kitchen (Rescued First)</h3>
                </div>
                <p className="mt-1 text-xs text-amber-800">
                  DailyPlate will inject recipes containing these ingredients into your first 3 days to avoid waste.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {expiringFromPantry.length > 0 ? (
                    expiringFromPantry.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-900 shadow-xs"
                      >
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        {item} (≤ 3d)
                      </span>
                    ))
                  ) : (
                    <span className="text-xs italic text-amber-700">No expiring items detected in pantry.</span>
                  )}
                </div>

                <div className="mt-4">
                  <TagInput
                    id="extra-expiring"
                    tone="light"
                    label="Add any other fresh items about to spoil"
                    values={answers.extraExpiring}
                    onChange={(vals) => setAnswers((prev) => ({ ...prev, extraExpiring: vals }))}
                    suggestions={['Spinach', 'Coriander', 'Half onion', 'Heavy cream', 'Tomatoes', 'Greek yogurt']}
                  />
                </div>
              </div>

              {/* Pantry Staples */}
              <div className="mt-6">
                <h3 className="font-display text-xl text-cocoa">Current Pantry Items</h3>
                <p className="text-xs text-cocoa/65 mb-3">On-hand dry goods and cold stock we will cook with:</p>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 bg-[#faf8f5] rounded-xl border border-cocoa/10">
                  {(data.pantry ?? []).map((pItem) => (
                    <span
                      key={pItem.id}
                      className="inline-flex items-center gap-1 rounded-full bg-white border border-cocoa/15 px-3 py-1 text-xs font-medium text-cocoa"
                    >
                      {pItem.name} <span className="text-[10px] text-cocoa/50">({pItem.quantity})</span>
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <TagInput
                    id="extra-pantry"
                    tone="light"
                    label="Add any other groceries on hand"
                    values={answers.extraPantry}
                    onChange={(vals) => setAnswers((prev) => ({ ...prev, extraPantry: vals }))}
                    suggestions={['Basmati rice', 'Red lentils', 'Olive oil', 'Canned chickpeas', 'Garlic', 'Oats']}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Equipment & Cooking Level */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Step 4 of 6</span>
                <h2 className="mt-1 font-display text-3xl text-forest lg:text-4xl">Kitchen Tools & Confidence</h2>
                <p className="mt-2 text-sm text-cocoa/70">
                  Select the cookware and appliances you have access to. The generator will filter out recipes requiring tools you don't own.
                </p>
              </div>

              {/* Equipment Grid */}
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-cocoa/60">Available Appliances & Tools</label>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {ALL_EQUIPMENT.map((eq) => {
                    const isSelected = answers.equipment.includes(eq.id);
                    return (
                      <button
                        key={eq.id}
                        type="button"
                        onClick={() => toggleEquipment(eq.id)}
                        className={`flex flex-col text-left rounded-xl border p-4 transition-all ${
                          isSelected
                            ? 'border-forest bg-emerald-50/70 text-forest shadow-xs'
                            : 'border-cocoa/15 bg-[#faf8f5] text-cocoa hover:border-cocoa/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-forest">{eq.label}</span>
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                              isSelected ? 'bg-forest text-cream' : 'border border-cocoa/20 text-transparent'
                            }`}
                          >
                            ✓
                          </span>
                        </div>
                        <span className="mt-1 text-[11px] text-cocoa/65">{eq.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cooking Confidence */}
              <div className="mt-8 border-t border-cocoa/10 pt-6">
                <h3 className="font-display text-xl text-cocoa">Cooking Experience</h3>
                <p className="text-xs text-cocoa/60 mb-3">Determines recipe step complexity and knife skills required.</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {cookingLevels.map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, cookingLevel: lvl.id }))}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        answers.cookingLevel === lvl.id
                          ? 'border-forest bg-forest text-cream shadow-sm'
                          : 'border-cocoa/15 bg-[#faf8f5] text-cocoa hover:border-cocoa/40'
                      }`}
                    >
                      <span className="font-display text-lg font-bold block">{lvl.label}</span>
                      <span className="text-xs opacity-80 mt-1 block leading-snug">{lvl.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Allergies & Preferences */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Step 5 of 6</span>
                <h2 className="mt-1 font-display text-3xl text-forest lg:text-4xl">Allergies & Dietary Boundaries</h2>
                <p className="mt-2 text-sm text-cocoa/70">
                  Strict boundaries are rigorously excluded across the entire plan.
                </p>
              </div>

              {/* Goal Selection */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-cocoa/60">Primary Wellness Goal</label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, goal: g.id }))}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        answers.goal === g.id
                          ? 'border-forest bg-forest text-cream'
                          : 'border-cocoa/15 bg-[#faf8f5] text-cocoa hover:border-cocoa/40'
                      }`}
                    >
                      <span className="block font-bold text-sm">{g.label}</span>
                      <span className="block text-[11px] opacity-75 truncate">{g.tagline}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div className="mb-6 border-t border-cocoa/10 pt-4">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-800">Must Avoid (Allergens)</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {allergenOptions.map((al) => {
                    const sel = answers.allergies.includes(al.id);
                    return (
                      <Chip
                        key={al.id}
                        tone="light"
                        selected={sel}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            allergies: sel ? prev.allergies.filter((x) => x !== al.id) : [...prev.allergies, al.id]
                          }))
                        }
                      >
                        {al.label}
                      </Chip>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Choices */}
              <div className="mb-6 border-t border-cocoa/10 pt-4">
                <label className="text-xs font-bold uppercase tracking-wider text-cocoa/60">Dietary Choices</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dietOptions.map((dt) => {
                    const sel = answers.restrictions.includes(dt.id);
                    return (
                      <Chip
                        key={dt.id}
                        tone="light"
                        selected={sel}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            restrictions: sel ? prev.restrictions.filter((x) => x !== dt.id) : [...prev.restrictions, dt.id]
                          }))
                        }
                      >
                        {dt.label}
                      </Chip>
                    );
                  })}
                </div>
              </div>

              {/* Dislikes & Favorites */}
              <div className="grid gap-4 border-t border-cocoa/10 pt-4 sm:grid-cols-2">
                <TagInput
                  id="pref-dislikes"
                  tone="light"
                  label="Foods you dislike"
                  values={answers.dislikes}
                  onChange={(vals) => setAnswers((prev) => ({ ...prev, dislikes: vals }))}
                  suggestions={dislikeSuggestions}
                />
                <TagInput
                  id="pref-favs"
                  tone="light"
                  label="Favorite staples"
                  values={answers.favourites}
                  onChange={(vals) => setAnswers((prev) => ({ ...prev, favourites: vals }))}
                  suggestions={favouriteSuggestions}
                />
              </div>
            </div>
          )}

          {/* STEP 5: Review & Generate */}
          {step === 5 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Step 6 of 6</span>
                <h2 className="mt-1 font-display text-3xl text-forest lg:text-4xl">Review Your Food Blueprint</h2>
                <p className="mt-2 text-sm text-cocoa/70">
                  Ready to weave your schedule, kitchen stock, and budget into an actionable week plan.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-[#d8c8b0] bg-[#f0e6d6] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cocoa/50">Schedule</span>
                  <p className="mt-1 font-display text-lg text-cocoa">
                    {Object.values(answers.schedule.days).filter((p) => p === 'busy').length} Busy days · Max{' '}
                    {answers.schedule.maxCookTime}m
                  </p>
                  <p className="text-xs text-cocoa/70 mt-1">
                    Gym days: {Object.values(answers.schedule.days).filter((p) => p === 'gym').length} · Free days:{' '}
                    {Object.values(answers.schedule.days).filter((p) => p === 'free').length}
                  </p>
                </div>

                <div className="rounded-xl border border-[#d8c8b0] bg-[#f0e6d6] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cocoa/50">Budget & Portion</span>
                  <p className="mt-1 font-display text-lg text-cocoa capitalize">{answers.budget} Tier</p>
                  <p className="text-xs text-cocoa/70 mt-1 capitalize">
                    {answers.portion} serving · {answers.spice} spice
                  </p>
                </div>

                <div className="rounded-xl border border-[#d8c8b0] bg-[#f0e6d6] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cocoa/50">Pantry & Expiring</span>
                  <p className="mt-1 font-display text-lg text-cocoa">
                    {expiringFromPantry.length + answers.extraExpiring.length} Rescue items
                  </p>
                  <p className="text-xs text-cocoa/70 mt-1">{(data.pantry ?? []).length} items on hand</p>
                </div>

                <div className="rounded-xl border border-[#d8c8b0] bg-[#f0e6d6] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cocoa/50">Equipment</span>
                  <p className="mt-1 font-display text-lg text-cocoa">{answers.equipment.length} Tools selected</p>
                  <p className="text-xs text-cocoa/70 mt-1 truncate">{answers.equipment.join(', ')}</p>
                </div>

                <div className="rounded-xl border border-[#d8c8b0] bg-[#f0e6d6] p-4 sm:col-span-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cocoa/50">Allergies & Diets</span>
                  <p className="mt-1 font-display text-lg text-cocoa">
                    {answers.allergies.length ? answers.allergies.join(', ') : 'None marked'}
                  </p>
                  <p className="text-xs text-cocoa/70 mt-1">
                    {answers.restrictions.length ? answers.restrictions.join(', ') : 'Omnivore'}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-800 to-forest p-6 text-cream shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-cream">Synthesize Personalized Meal Plan</h3>
                    <p className="text-sm text-cream/80 mt-1">
                      Generates breakfast, lunch, dinner, and recovery snacks for the entire week.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartGeneration}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-3.5 text-sm font-bold text-forest shadow-md transition-all hover:bg-white hover:scale-105 shrink-0"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Week Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-cocoa/10 pt-6">
            <button
              type="button"
              onClick={() => (step === 0 ? onExit() : setStep(step - 1))}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa/70 hover:text-cocoa"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              {step === 0 ? 'Exit' : 'Previous Step'}
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-emerald-800 shadow-xs"
              >
                Continue <ArrowRightIcon className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartGeneration}
                className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-2.5 text-sm font-bold text-cream transition-all hover:bg-emerald-800 shadow-sm"
              >
                Generate Plan <Sparkles className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}