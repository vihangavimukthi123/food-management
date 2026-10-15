import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  PlusIcon,
  SearchIcon,
  SproutIcon,
  Wrench,
  UtensilsCrossed,
  Sparkles,
  Check,
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { images } from '../data/images';
import { pantryCategories } from '../data/options';
import { recipes } from '../data/recipes';
import { SafeImage } from '../components/SafeImage';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';
import { IngredientTag } from '../components/kitchen/IngredientTag';
import { IngredientForm } from '../components/kitchen/IngredientForm';
import { PantryItem } from '../types/kitchen';
import { daysUntil, expiryLabel, isoDaysFromNow, uid } from '../utils/dates';
import { buttonClass } from '../utils/styles';

type KitchenTab = 'pantry' | 'equipment' | 'matcher';
type View = 'all' | 'expiring' | 'low';

const EQUIPMENT_CATALOG = [
  { id: 'Stove', name: 'Stovetop / Range', desc: 'Everyday pans, boiling pasta, shallow frying & curries', icon: '🍳' },
  { id: 'Oven', name: 'Baking Oven', desc: 'Roasting vegetables, casseroles, baking sourdough & trays', icon: '🔥' },
  { id: 'Air Fryer', name: 'Air Fryer', desc: 'Rapid convection, ultra-crisp veggies, tofu & zero-oil frying', icon: '⚡' },
  { id: 'Rice Cooker', name: 'Rice Cooker', desc: 'Fluffy whole grains, quinoa, steamed dumplings & warm porridge', icon: '🍚' },
  { id: 'Blender', name: 'Blender / Food Processor', desc: 'Smoothies, creamy legume soups, pesto & sambols', icon: '🌪️' },
  { id: 'Wok', name: 'Wok / Heavy Skillet', desc: 'High-heat searing, rapid vegetable stir-fries & noodles', icon: '🥘' },
  { id: 'Microwave', name: 'Microwave', desc: 'Rapid steam vegetables, softening aromatics & reheating', icon: '⏱️' },
  { id: 'Pressure Cooker', name: 'Pressure Cooker / Instant Pot', desc: 'Tender beans, dal, bone broths & hearty root stews in minutes', icon: '🍲' },
  { id: 'Slow Cooker', name: 'Slow Cooker / Crockpot', desc: 'Low-and-slow braises, aromatic curry bases & tender lentils', icon: '🥣' },
  { id: 'Cast Iron', name: 'Cast Iron Skillet', desc: 'High-sear crust, rustic cornbread & even heat retention', icon: '🥩' },
  { id: 'Grill', name: 'Grill / Griddle Pan', desc: 'Charred skewers, grilled corn & charred eggplant slices', icon: '🍢' },
  { id: 'Toaster', name: 'Toaster', desc: 'Golden slices for avocado toasts & sourdough breakfasts', icon: '🍞' }
];

export function Kitchen() {
  const { data, update, logActivity } = useAccount();
  const [activeTab, setActiveTab] = useState<KitchenTab>('pantry');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [view, setView] = useState<View>('all');
  const [editing, setEditing] = useState<PantryItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCookIngredients, setSelectedCookIngredients] = useState<string[]>([]);

  const userEquipment = useMemo(() => data.profile.equipment || ['Stove', 'Air Fryer', 'Rice Cooker', 'Blender'], [data.profile.equipment]);

  const expiring = useMemo(
    () => data.pantry.filter((p) => daysUntil(p.expiry) <= 3).sort((a, b) => daysUntil(a.expiry) - daysUntil(b.expiry)),
    [data.pantry]
  );
  const low = data.pantry.filter((p) => p.quantity <= p.lowAt);

  const filtered = data.pantry.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (cat !== 'All' && p.category !== cat) return false;
    if (view === 'expiring' && daysUntil(p.expiry) > 3) return false;
    if (view === 'low' && p.quantity > p.lowAt) return false;
    return true;
  });

  const save = (v: Omit<PantryItem, 'id' | 'added'>) => {
    if (editing) {
      update((d) => ({ ...d, pantry: d.pantry.map((p) => (p.id === editing.id ? { ...p, ...v } : p)) }));
      toast.success(`${v.name} updated`);
    } else {
      update((d) => ({ ...d, pantry: [{ ...v, id: uid(), added: isoDaysFromNow(0) }, ...d.pantry] }));
      logActivity(`Added ${v.name.toLowerCase()} to your kitchen`, 'kitchen');
      toast.success(`${v.name} is in your garden`, { description: expiryLabel(v.expiry) });
    }
    setFormOpen(false);
    setEditing(null);
  };

  const step = (id: string, delta: number) =>
    update((d) => ({
      ...d,
      pantry: d.pantry.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, Math.round((p.quantity + delta) * 100) / 100) } : p
      )
    }));

  const remove = (item: PantryItem) => {
    update((d) => ({ ...d, pantry: d.pantry.filter((p) => p.id !== item.id) }));
    toast(`${item.name} removed`, {
      action: {
        label: 'Undo',
        onClick: () => update((d) => ({ ...d, pantry: [item, ...d.pantry] }))
      }
    });
  };

  const toggleEquipment = (eqId: string) => {
    const isPresent = userEquipment.includes(eqId);
    const updated = isPresent ? userEquipment.filter((x) => x !== eqId) : [...userEquipment, eqId];
    update((d) => ({
      ...d,
      profile: { ...d.profile, equipment: updated }
    }));
    toast.success(isPresent ? `Removed ${eqId}` : `Added ${eqId} to kitchen equipment`);
  };

  const grouped = pantryCategories
    .map((c) => ({ ...c, items: filtered.filter((p) => p.category === c.id) }))
    .filter((g) => g.items.length);

  // Cook From Kitchen Recipe Matches
  const matchedRecipes = useMemo(() => {
    const activeNames = selectedCookIngredients.length
      ? selectedCookIngredients.map((x) => x.toLowerCase())
      : data.pantry.map((p) => p.name.toLowerCase());

    return recipes
      .map((r) => {
        const total = r.ingredients.length;
        const matching = r.ingredients.filter((i) =>
          activeNames.some((an) => i.name.toLowerCase().includes(an) || an.includes(i.name.toLowerCase()))
        );
        const ratio = total > 0 ? matching.length / total : 0;
        return { recipe: r, matchCount: matching.length, total, ratio };
      })
      .filter((m) => m.matchCount > 0)
      .sort((a, b) => b.ratio - a.ratio || b.matchCount - a.matchCount);
  }, [selectedCookIngredients, data.pantry]);

  const toggleCookPill = (name: string) => {
    setSelectedCookIngredients((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-cocoa">
      {/* Header Banner */}
      <header className="relative overflow-hidden bg-gradient-to-r from-forest via-[#1e3d2c] to-forest text-cream">
        <div className="absolute inset-0 opacity-15">
          <SafeImage
            eager
            src={images.kitchen}
            alt="Crates of fresh tomatoes, greens, carrots, pumpkin and herbs"
            className="h-full w-full object-cover"
            fallbackTone="dark"
          />
        </div>
        <DriftingLeaves
          color="#d4a843"
          opacity={0.35}
          leaves={[
            { x: 10, y: 30, size: 45, rotate: 20, shape: 'sprig', duration: 17 },
            { x: 85, y: 60, size: 35, rotate: -35, shape: 'curry', duration: 19 }
          ]}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
                <SproutIcon className="h-3.5 w-3.5" /> Kitchen Inventory & Tools
              </span>
              <h1 className="mt-3 font-display text-5xl leading-[1.02] sm:text-7xl">
                Your Kitchen <span className="italic text-champagne">Garden</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-cream/80">
                Track pantry stock, configure available cooking equipment, and discover recipes that turn ingredients into delicious zero-waste meals.
              </p>
            </div>

            {/* Quick Hero Stat Badges */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <div className="rounded-xl border border-cream/15 bg-white/10 p-3.5 backdrop-blur-xs">
                <span className="text-xs uppercase tracking-wider text-cream/60">Pantry Items</span>
                <p className="font-display text-3xl font-bold text-cream">{data.pantry.length}</p>
              </div>
              <div className="rounded-xl border border-amber-300/30 bg-amber-500/15 p-3.5 backdrop-blur-xs">
                <span className="text-xs uppercase tracking-wider text-amber-200">Expiring ≤ 3d</span>
                <p className="font-display text-3xl font-bold text-champagne">{expiring.length}</p>
              </div>
              <div className="rounded-xl border border-rose-300/30 bg-rose-500/15 p-3.5 backdrop-blur-xs">
                <span className="text-xs uppercase tracking-wider text-rose-200">Running Low</span>
                <p className="font-display text-3xl font-bold text-cream">{low.length}</p>
              </div>
              <div className="rounded-xl border border-cream/15 bg-white/10 p-3.5 backdrop-blur-xs">
                <span className="text-xs uppercase tracking-wider text-cream/60">Kitchen Tools</span>
                <p className="font-display text-3xl font-bold text-cream">{userEquipment.length}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-10">
        {/* Navigation Tabs */}
        <div className="flex border-b border-cocoa/15 overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('pantry')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'pantry'
                ? 'border-forest text-forest bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-cocoa/60 hover:text-cocoa'
            }`}
          >
            <SproutIcon className="h-4 w-4 text-emerald-700" />
            Pantry & Fresh Produce ({data.pantry.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('equipment')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'equipment'
                ? 'border-forest text-forest bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-cocoa/60 hover:text-cocoa'
            }`}
          >
            <Wrench className="h-4 w-4 text-emerald-700" />
            Cookware & Appliances ({userEquipment.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('matcher')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'matcher'
                ? 'border-forest text-forest bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-cocoa/60 hover:text-cocoa'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-600" />
            Cook From Kitchen ({matchedRecipes.length} matches)
          </button>
        </div>

        {/* ================= TAB 1: PANTRY ================= */}
        {activeTab === 'pantry' && (
          <div className="mt-8">
            {/* Expiring Alert Banner */}
            {expiring.length > 0 && (
              <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 text-amber-900">
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-bold text-amber-950">
                        {expiring.length} Ingredients Expiring Soon
                      </h2>
                      <p className="text-xs text-amber-800">Use these first to maintain zero food waste in your kitchen.</p>
                    </div>
                  </div>
                  <Link
                    to="/app/waste"
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-200/80 px-4 py-1.5 text-xs font-bold text-amber-950 transition-colors hover:bg-amber-300"
                  >
                    View Zero Waste Tracker <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {expiring.map((p) => (
                    <div
                      key={p.id}
                      className="flex shrink-0 items-center gap-3 rounded-xl border border-amber-300/80 bg-white px-4 py-2.5 shadow-xs"
                    >
                      <div>
                        <p className="font-display text-base font-bold text-cocoa">{p.name}</p>
                        <p className="text-xs font-semibold text-amber-700">{expiryLabel(p.expiry)}</p>
                      </div>
                      <span className="text-xs font-semibold text-cocoa/60">
                        {p.quantity} {p.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Filter and Search Bar */}
            <div className="sticky top-16 z-20 flex flex-col gap-4 rounded-2xl border border-cocoa/10 bg-white/95 p-4 backdrop-blur-md shadow-xs md:flex-row md:items-center justify-between">
              <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3.5 py-2">
                <SearchIcon className="h-4 w-4 text-cocoa/50" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search kitchen ingredients (e.g. spinach, rice)..."
                  className="w-full bg-transparent text-sm font-medium placeholder:text-cocoa/40 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="rounded-xl border border-cocoa/15 bg-[#faf8f5] px-3 py-2 text-xs font-semibold text-cocoa focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  {pantryCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id}
                    </option>
                  ))}
                </select>

                <div className="flex rounded-xl bg-[#faf8f5] p-1 border border-cocoa/10 text-xs font-semibold">
                  {(
                    [
                      ['all', 'All'],
                      ['expiring', 'Expiring'],
                      ['low', 'Low Stock']
                    ] as [View, string][]
                  ).map(([k, label]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setView(k)}
                      className={`rounded-lg px-3 py-1.5 transition-all ${
                        view === k ? 'bg-forest text-cream shadow-xs' : 'text-cocoa/70 hover:text-cocoa'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setFormOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-bold text-cream shadow-xs hover:bg-emerald-800 transition-colors"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                  Add Ingredient
                </button>
              </div>
            </div>

            {/* Grouped Ingredients with Photo Cards */}
            {grouped.length > 0 ? (
              <div className="mt-8 space-y-12">
                {grouped.map((g) => (
                  <section key={g.id}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="h-3 w-3 rounded-full" style={{ background: g.color }} />
                      <h2 className="font-display text-2xl font-bold text-forest">{g.id}</h2>
                      <span className="text-xs font-semibold text-cocoa/50">({g.items.length})</span>
                      <div className="h-px flex-1 bg-cocoa/10" />
                    </div>

                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      <AnimatePresence initial={false}>
                        {g.items.map((item) => (
                          <IngredientTag
                            key={item.id}
                            item={item}
                            onStep={(delta) => step(item.id, delta)}
                            onEdit={() => {
                              setEditing(item);
                              setFormOpen(true);
                            }}
                            onDelete={() => remove(item)}
                          />
                        ))}
                      </AnimatePresence>
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <SproutIcon className="mx-auto h-12 w-12 text-forest/40" />
                <h3 className="mt-4 font-display text-2xl font-bold text-forest">No ingredients found</h3>
                <p className="mt-1 text-sm text-cocoa/60">Try searching for something else or clear the filters.</p>
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream"
                >
                  <PlusIcon className="h-4 w-4" /> Add New Ingredient
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: EQUIPMENT ================= */}
        {activeTab === 'equipment' && (
          <div className="mt-8">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-forest">Cookware & Kitchen Appliances</h2>
                <p className="mt-1 text-sm text-cocoa/70">
                  Select what tools you have available in your kitchen. DailyPlate uses these to ensure recipes fit your kitchen setup.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    update((d) => ({
                      ...d,
                      profile: { ...d.profile, equipment: EQUIPMENT_CATALOG.map((e) => e.id) }
                    }));
                    toast.success('Enabled all cookware');
                  }}
                  className="rounded-xl border border-cocoa/15 bg-white px-3.5 py-2 text-xs font-semibold text-cocoa hover:bg-cream"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    update((d) => ({
                      ...d,
                      profile: { ...d.profile, equipment: ['Stove', 'Oven', 'Blender'] }
                    }));
                    toast.success('Reset to standard basic kitchen');
                  }}
                  className="rounded-xl border border-cocoa/15 bg-white px-3.5 py-2 text-xs font-semibold text-cocoa hover:bg-cream"
                >
                  Reset Basics
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {EQUIPMENT_CATALOG.map((eq) => {
                const active = userEquipment.includes(eq.id);
                return (
                  <button
                    key={eq.id}
                    type="button"
                    onClick={() => toggleEquipment(eq.id)}
                    className={`flex flex-col text-left rounded-2xl border p-5 transition-all ${
                      active
                        ? 'border-forest bg-emerald-50/60 ring-2 ring-forest/30 shadow-xs'
                        : 'border-cocoa/10 bg-white hover:border-cocoa/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-3xl">{eq.icon}</span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          active ? 'bg-forest text-cream' : 'border border-cocoa/20 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-bold text-forest">{eq.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-cocoa/70">{eq.desc}</p>

                    <div className="mt-auto pt-4 flex items-center justify-between text-[11px] font-semibold border-t border-cocoa/10">
                      <span className={active ? 'text-forest' : 'text-cocoa/40'}>
                        {active ? 'Available in Kitchen' : 'Not Available'}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-cocoa/50">
                        {active ? 'Tap to disable' : 'Tap to enable'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: COOK FROM KITCHEN MATCHER ================= */}
        {activeTab === 'matcher' && (
          <div className="mt-8">
            <div className="mb-6">
              <h2 className="font-display text-3xl font-bold text-forest">Cook With What You Have</h2>
              <p className="mt-1 text-sm text-cocoa/70">
                Tap the ingredients you want to use up right now. DailyPlate will rank the recipes that match your selection.
              </p>
            </div>

            {/* Ingredient Filter Pills */}
            <div className="rounded-2xl border border-cocoa/10 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cocoa/60">
                  Select Ingredients To Use ({selectedCookIngredients.length} chosen)
                </span>
                {selectedCookIngredients.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedCookIngredients([])}
                    className="text-xs font-semibold text-rose-700 hover:underline"
                  >
                    Clear selection
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {data.pantry.map((item) => {
                  const isSelected = selectedCookIngredients.includes(item.name);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleCookPill(item.name)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-forest text-cream shadow-xs'
                          : 'bg-[#faf8f5] border border-cocoa/15 text-cocoa hover:border-cocoa/30'
                      }`}
                    >
                      {item.name}
                      {isSelected && <Check className="h-3 w-3" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipe Matches Grid */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl font-bold text-forest">
                  Matching Recipes ({matchedRecipes.length})
                </h3>
                <span className="text-xs text-cocoa/60">
                  {selectedCookIngredients.length ? 'Filtered by chosen items' : 'Ranked against your whole pantry'}
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {matchedRecipes.slice(0, 8).map(({ recipe: r, matchCount, total, ratio }) => (
                  <Link
                    key={r.id}
                    to={`/recipes/${r.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-cocoa/10 bg-white shadow-xs transition-all hover:shadow-md hover:border-cocoa/30"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-cream/40">
                      <SafeImage
                        src={r.image}
                        alt={r.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        fallbackTone="light"
                      />
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-forest/90 px-3 py-1 text-[11px] font-bold text-cream backdrop-blur-xs">
                        {matchCount} of {total} ingredients ready
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        {r.mealType} · {r.prepTime + r.cookTime} mins
                      </span>
                      <h4 className="mt-1 font-display text-lg font-bold text-cocoa group-hover:text-forest">
                        {r.title}
                      </h4>
                      <p className="mt-1 text-xs text-cocoa/70 line-clamp-2">{r.description}</p>

                      <div className="mt-auto pt-3 flex items-center justify-between text-xs font-semibold text-forest border-t border-cocoa/10">
                        <span>View recipe</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <IngredientForm
        open={formOpen}
        item={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={save}
      />
    </div>
  );
}