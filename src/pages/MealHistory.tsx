import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Calendar,
  Flame,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  Clock,
  Package,
  Utensils,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { MealHistoryEntry, PlanSlot } from '../types/plan';
import { formatDay, isoDaysFromNow, uid } from '../utils/dates';
import { SafeImage } from '../components/SafeImage';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';

type FilterType = 'all' | 'cooked' | 'rescued' | 'breakfast' | 'lunch' | 'dinner' | 'snack';

const SLOT_LABELS: Record<PlanSlot, string> = {
  breakfast: 'Breakfast',
  'morning-snack': 'Morning Snack',
  lunch: 'Lunch',
  'afternoon-snack': 'Afternoon Snack',
  dinner: 'Dinner'
};

export function MealHistory() {
  const { data, update, logActivity } = useAccount();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Meal Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSlot, setNewSlot] = useState<PlanSlot>('dinner');
  const [newDate, setNewDate] = useState(() => isoDaysFromNow(0));
  const [newCalories, setNewCalories] = useState(480);
  const [newTime, setNewTime] = useState('25 mins');
  const [newStatus, setNewStatus] = useState<'cooked' | 'rescued'>('cooked');
  const [newRating, setNewRating] = useState(5);
  const [newNote, setNewNote] = useState('');
  const [newRescued, setNewRescued] = useState('');

  const historyList = useMemo(() => data.history || [], [data.history]);

  // Filtered entries
  const filtered = useMemo(() => {
    return historyList.filter((item) => {
      if (q && !item.title.toLowerCase().includes(q.toLowerCase()) && !item.note?.toLowerCase().includes(q.toLowerCase())) {
        return false;
      }
      if (filter === 'cooked' && item.status !== 'cooked') return false;
      if (filter === 'rescued' && item.status !== 'rescued') return false;
      if (filter === 'breakfast' && item.slot !== 'breakfast') return false;
      if (filter === 'lunch' && item.slot !== 'lunch') return false;
      if (filter === 'dinner' && item.slot !== 'dinner') return false;
      if (filter === 'snack' && !item.slot.includes('snack')) return false;
      return true;
    });
  }, [historyList, q, filter]);

  // Group by Date
  const groupedByDate = useMemo(() => {
    const groups: Record<string, MealHistoryEntry[]> = {};
    for (const item of filtered) {
      const d = item.date || isoDaysFromNow(0);
      if (!groups[d]) groups[d] = [];
      groups[d].push(item);
    }
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  // Compute stats
  const totalCooked = historyList.length;
  const streakDays = 5;
  const totalRescued = historyList.reduce(
    (acc, cur) => acc + (cur.rescuedItems?.length || (cur.status === 'rescued' ? 1 : 0)),
    0
  );
  const avgCalories = totalCooked > 0
    ? Math.round(historyList.reduce((acc, cur) => acc + (cur.calories || 0), 0) / totalCooked)
    : 450;

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error('Please enter a meal title');
      return;
    }

    const rescuedArr = newRescued
      ? newRescued.split(',').map((x) => x.trim()).filter(Boolean)
      : undefined;

    const entry: MealHistoryEntry = {
      id: uid(),
      title: newTitle.trim(),
      slot: newSlot,
      date: newDate,
      calories: Number(newCalories) || 450,
      time: newTime || '20 mins',
      status: newStatus,
      rating: newRating,
      note: newNote.trim() || undefined,
      rescuedItems: rescuedArr,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'
    };

    update((d) => ({
      ...d,
      history: [entry, ...(d.history || [])]
    }));
    logActivity(`Logged ${entry.title} to history`, 'coach');
    toast.success(`Logged ${entry.title} to Meal History!`);

    // Reset and close
    setNewTitle('');
    setNewNote('');
    setNewRescued('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    update((d) => ({
      ...d,
      history: (d.history || []).filter((h) => h.id !== id)
    }));
    toast.success(`Removed ${title} from history`);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-cocoa">
      {/* Header Banner */}
      <header className="relative overflow-hidden bg-gradient-to-r from-forest via-[#1e3d2c] to-forest text-cream">
        <DriftingLeaves
          color="#d4a843"
          opacity={0.3}
          leaves={[
            { x: 15, y: 40, size: 40, rotate: 20, shape: 'sprig', duration: 18 },
            { x: 80, y: 30, size: 30, rotate: -30, shape: 'curry', duration: 16 }
          ]}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
                <Calendar className="h-3.5 w-3.5" /> Culinary Journey & Past Meals
              </span>
              <h1 className="mt-3 font-display text-5xl leading-[1.02] sm:text-7xl">
                Meal <span className="italic text-champagne">History</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-cream/80">
                Celebrate your cooking consistency, track dishes you’ve prepared, and see the ingredients you rescued from going to waste.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3 text-sm font-bold text-forest shadow-md transition-all hover:bg-cream hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                Log a Past Meal
              </button>
              <Link
                to="/app/plan"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-white/10 px-5 py-3 text-sm font-semibold text-cream backdrop-blur-xs transition-colors hover:bg-white/20"
              >
                My Plan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 4 Hero Stats Strip */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-cream/15 bg-white/10 p-4 backdrop-blur-xs">
              <span className="text-xs uppercase tracking-wider text-cream/60">Meals Cooked</span>
              <p className="font-display text-3xl font-bold text-cream mt-1">{totalCooked}</p>
              <span className="text-[11px] text-cream/70">Logged entries</span>
            </div>

            <div className="rounded-2xl border border-amber-300/30 bg-amber-500/15 p-4 backdrop-blur-xs">
              <span className="text-xs uppercase tracking-wider text-amber-200">Cooking Streak</span>
              <p className="font-display text-3xl font-bold text-champagne mt-1">{streakDays} Days</p>
              <span className="text-[11px] text-amber-200/80">Active consistency</span>
            </div>

            <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/15 p-4 backdrop-blur-xs">
              <span className="text-xs uppercase tracking-wider text-emerald-200">Rescued Items</span>
              <p className="font-display text-3xl font-bold text-cream mt-1">{totalRescued}</p>
              <span className="text-[11px] text-emerald-200/80">Zero waste impact</span>
            </div>

            <div className="rounded-2xl border border-cream/15 bg-white/10 p-4 backdrop-blur-xs">
              <span className="text-xs uppercase tracking-wider text-cream/60">Avg. Calories</span>
              <p className="font-display text-3xl font-bold text-cream mt-1">{avgCalories}</p>
              <span className="text-[11px] text-cream/70">Kcal per plate</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
        {/* Filter and Search Bar */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-cocoa/10 bg-white p-4 shadow-xs md:flex-row md:items-center justify-between">
          <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3.5 py-2">
            <Search className="h-4 w-4 text-cocoa/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search logged meals, notes, recipes..."
              className="w-full bg-transparent text-sm font-medium placeholder:text-cocoa/40 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ['all', 'All'],
                ['cooked', 'Cooked'],
                ['rescued', 'Rescued'],
                ['breakfast', 'Breakfast'],
                ['lunch', 'Lunch'],
                ['dinner', 'Dinner']
              ] as [FilterType, string][]
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  filter === k
                    ? 'bg-forest text-cream shadow-xs'
                    : 'bg-[#faf8f5] border border-cocoa/15 text-cocoa hover:border-cocoa/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline vs Sidebar Grid */}
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left Column: Timeline Feed */}
          <div>
            {groupedByDate.length > 0 ? (
              <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-cocoa/15">
                {groupedByDate.map(([dateStr, entries]) => (
                  <div key={dateStr} className="relative mb-10">
                    {/* Date Timeline Dot */}
                    <span className="absolute -left-6 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-forest ring-4 ring-[#faf8f5]" />

                    {/* Date Heading */}
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-display text-2xl font-bold text-forest">
                        {formatDay(dateStr, 'EEEE, d MMMM')}
                      </h3>
                      <span className="text-xs font-semibold text-cocoa/50">
                        {entries.length} dish{entries.length === 1 ? '' : 'es'}
                      </span>
                    </div>

                    {/* List of Meals */}
                    <div className="space-y-4">
                      {entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-cocoa/10 bg-white shadow-xs transition-all hover:shadow-md hover:border-cocoa/25"
                        >
                          {/* Meal Photo */}
                          <div className="relative h-44 w-full sm:h-auto sm:w-48 shrink-0 overflow-hidden bg-cream/40">
                            <SafeImage
                              src={
                                entry.image ||
                                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'
                              }
                              alt={entry.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              fallbackTone="light"
                            />
                            <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest shadow-xs">
                              {SLOT_LABELS[entry.slot] || entry.slot}
                            </span>
                          </div>

                          {/* Meal Details */}
                          <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className="font-display text-xl font-bold text-cocoa">{entry.title}</h4>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-cocoa/60 font-medium">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5 text-emerald-700" /> {entry.time}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Flame className="h-3.5 w-3.5 text-amber-600" /> {entry.calories} kcal
                                  </span>
                                  {entry.rating && (
                                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                      {entry.rating}/5
                                    </span>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDelete(entry.id, entry.title)}
                                aria-label="Delete entry"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-cocoa/40 opacity-70 transition-all hover:bg-rose-50 hover:text-rose-600 hover:opacity-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Status and Rescued badges */}
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {entry.status === 'rescued' ? (
                                <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                                  <Package className="h-3 w-3" /> Rescued from Pantry
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                                  <CheckCircle2 className="h-3 w-3" /> Cooked from Plan
                                </span>
                              )}

                              {entry.rescuedItems?.map((ing) => (
                                <span
                                  key={ing}
                                  className="inline-flex items-center rounded-md border border-amber-300/60 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-900"
                                >
                                  Saved {ing}
                                </span>
                              ))}
                            </div>

                            {/* User notes */}
                            {entry.note && (
                              <p className="mt-3 text-xs leading-relaxed text-cocoa/75 italic bg-[#faf8f5] p-2.5 rounded-xl border border-cocoa/10">
                                "{entry.note}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-cocoa/10 bg-white p-12 text-center shadow-xs">
                <Utensils className="mx-auto h-12 w-12 text-forest/30" />
                <h3 className="mt-4 font-display text-2xl font-bold text-forest">No logged meals found</h3>
                <p className="mt-1 text-sm text-cocoa/60">
                  {historyList.length === 0
                    ? 'Your meal history is currently empty. Cook meals or log dishes to build your culinary diary!'
                    : 'Try clearing your search query or switching filters.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream"
                >
                  <Plus className="h-4 w-4" /> Log Your First Meal
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar Widgets */}
          <div className="space-y-6">
            {/* Streak & Consistency Widget */}
            <div className="rounded-2xl border border-cocoa/10 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl font-bold text-forest">Culinary Streak</h4>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  🔥
                </span>
              </div>
              <p className="mt-1 text-xs text-cocoa/70">
                You’ve cooked at home 5 consecutive days this week.
              </p>

              {/* Day Dots */}
              <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((dayChar, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-cocoa/50">{dayChar}</span>
                    <span
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        i < 5
                          ? 'bg-forest text-cream shadow-xs'
                          : 'bg-[#faf8f5] border border-cocoa/15 text-cocoa/40'
                      }`}
                    >
                      {i < 5 ? '✓' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zero Waste Impact Widget */}
            <div className="rounded-2xl border border-cocoa/10 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl font-bold text-forest">Pantry Rescued</h4>
                <Package className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="font-display text-3xl font-bold text-emerald-800 mt-2">{totalRescued} items</p>
              <p className="mt-1 text-xs text-cocoa/70 leading-relaxed">
                By tracking expiration dates and cooking planned meals, you prevented over ~$42 of food wastage this month.
              </p>
              <Link
                to="/app/waste"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-forest hover:underline"
              >
                Go to Zero-Waste Hub <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Quick Inspiration Card */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-forest p-6 text-cream shadow-sm">
              <Sparkles className="h-6 w-6 text-champagne" />
              <h4 className="mt-3 font-display text-xl font-bold text-cream">Next Meal Planned</h4>
              <p className="mt-1 text-xs text-cream/80 leading-relaxed">
                Head over to your weekly schedule to see today's dinner recipe, ingredients, and prep steps.
              </p>
              <Link
                to="/app/plan"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2 text-xs font-bold text-forest hover:bg-white"
              >
                Open My Plan <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Log a Meal Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-cocoa/10 bg-white p-6 shadow-2xl md:p-8"
            >
              <div className="flex items-center justify-between border-b border-cocoa/10 pb-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-forest">Log a Past Meal</h3>
                  <p className="text-xs text-cocoa/60">Record what you cooked and any pantry items rescued.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1.5 text-cocoa/50 hover:bg-cream hover:text-cocoa"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddMeal} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">Meal / Dish Title</label>
                  <input
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Sourdough French Toast with Mango"
                    className="mt-1 w-full rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3.5 py-2.5 text-sm text-cocoa focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">Meal Slot</label>
                    <select
                      value={newSlot}
                      onChange={(e) => setNewSlot(e.target.value as PlanSlot)}
                      className="mt-1 w-full rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3 py-2 text-sm text-cocoa focus:outline-none"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="morning-snack">Morning Snack</option>
                      <option value="afternoon-snack">Afternoon Snack</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">Date</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3 py-2 text-sm text-cocoa focus:outline-none"
                    >
                    </input>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">Est. Calories</label>
                    <input
                      type="number"
                      value={newCalories}
                      onChange={(e) => setNewCalories(Number(e.target.value))}
                      className="mt-1 w-full rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3 py-2 text-sm text-cocoa focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">Time Cooked</label>
                    <input
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      placeholder="e.g. 20 mins"
                      className="mt-1 w-full rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3 py-2 text-sm text-cocoa focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">Source / Status</label>
                    <div className="mt-1 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setNewStatus('cooked')}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                          newStatus === 'cooked'
                            ? 'bg-forest text-cream'
                            : 'border border-cocoa/15 bg-[#faf8f5] text-cocoa'
                        }`}
                      >
                        Cooked
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewStatus('rescued')}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                          newStatus === 'rescued'
                            ? 'bg-amber-600 text-cream'
                            : 'border border-cocoa/15 bg-[#faf8f5] text-cocoa'
                        }`}
                      >
                        Rescued
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">Rating (1-5)</label>
                    <div className="mt-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-cocoa/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">
                    Rescued Ingredients (comma-separated)
                  </label>
                  <input
                    value={newRescued}
                    onChange={(e) => setNewRescued(e.target.value)}
                    placeholder="e.g. Ripe bananas, Spinach leaves"
                    className="mt-1 w-full rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3.5 py-2 text-sm text-cocoa focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-cocoa/70">Notes / Taste Review</label>
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="How was it? Any substitutions you made?"
                    className="mt-1 w-full rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3.5 py-2 text-sm text-cocoa focus:outline-none"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-cocoa/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-cocoa/70 hover:bg-cream"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-cream shadow-xs hover:bg-emerald-800"
                  >
                    Save to History
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
