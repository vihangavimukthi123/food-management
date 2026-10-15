import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchXIcon } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { useSavedRecipes } from '../hooks/useSavedRecipes';
import { recipes } from '../data/recipes';
import { categoryMoods } from '../data/categoryMoods';
import { FeaturedSpread } from '../components/recipes/FeaturedSpread';
import { RecipeFilters, FilterState } from '../components/recipes/RecipeFilters';
import { EntryVariant, RecipeEntry } from '../components/recipes/RecipeEntry';
import { SafeImage } from '../components/SafeImage';
import { Reveal } from '../components/Reveal';
import { Diet, MealType } from '../types/recipe';
import { dietSatisfied, recipeConflicts, recommendRecipes } from '../utils/recommend';

const PATTERN: {span: string;variant: EntryVariant;}[] = [
{ span: 'lg:col-span-7', variant: 'large' },
{ span: 'lg:col-span-5 lg:pt-24', variant: 'standard' },
{ span: 'lg:col-span-4', variant: 'standard' },
{ span: 'lg:col-span-4 lg:pt-16', variant: 'standard' },
{ span: 'lg:col-span-4', variant: 'standard' },
{ span: 'lg:col-span-12', variant: 'wide' }];


export function Recipes() {
  const { data } = useAccount();
  const { isSaved, toggleSave } = useSavedRecipes();
  const [params] = useSearchParams();
  const [f, setF] = useState<FilterState>({ q: '', category: params.get('category') ?? 'All', diet: '', cuisine: '', meal: '', savedOnly: false, fitsMe: false });

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return recipes.filter((r) => {
      if (q && ![r.title, r.description, r.cuisine, ...r.ingredients.map((i) => i.name)].some((s) => s.toLowerCase().includes(q))) return false;
      if (f.category !== 'All' && !(r.categories as string[]).includes(f.category)) return false;
      if (f.diet && !dietSatisfied(r.diets, f.diet as Diet)) return false;
      if (f.cuisine && r.cuisine !== f.cuisine) return false;
      if (f.meal && r.mealType !== f.meal as MealType) return false;
      if (f.savedOnly && !data.saved.includes(r.id)) return false;
      if (f.fitsMe && recipeConflicts(r, data.profile).length) return false;
      return true;
    });
  }, [f, data.saved, data.profile]);

  const filtering = Boolean(f.q || f.category !== 'All' || f.diet || f.cuisine || f.meal || f.savedOnly || f.fitsMe);
  const mood = categoryMoods[f.category] ?? categoryMoods.All;
  const featured = recipes.filter((r) => r.featured);
  const trending = recipes.filter((r) => r.trendingRank).sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0)).slice(0, 5);
  const fresh = [...recipes].sort((a, b) => a.addedDaysAgo - b.addedDaysAgo).slice(0, 4);
  const forYou = recommendRecipes(data.profile, data.pantry, { limit: 3 });
  const savedList = recipes.filter((r) => data.saved.includes(r.id));

  return (
    <div className="grain min-h-screen bg-cream text-cocoa">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 lg:px-8 lg:pt-28">
        <header className="border-b-2 border-cocoa pb-6">
          <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.18em] text-cocoa/60">
            <span>DailyPlate · Issue {new Date().getMonth() + 1}</span>
            <span className="hidden sm:inline">{recipes.length} recipes · Sri Lanka & the world</span>
          </div>
          <h1 className="mt-4 font-display text-[3.6rem] leading-[0.88] tracking-tight sm:text-[6rem] lg:text-[9rem]">The Recipe <span className="italic">Atelier</span></h1>
        </header>

        {!filtering && <div className="mt-12"><FeaturedSpread featured={featured} isSaved={isSaved} onToggleSave={toggleSave} /></div>}

        <div className="mt-14"><RecipeFilters value={f} onChange={setF} count={results.length} /></div>

        <motion.section
          aria-label="Category"
          className="-mx-5 mt-0 px-5 py-10 lg:-mx-8 lg:px-8"
          animate={{ backgroundColor: mood.bg, color: mood.ink }}
          transition={{ duration: 0.3 }}>
          
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
            <h2 className="font-display text-4xl italic">{f.category === 'All' ? 'Every recipe' : f.category}</h2>
            <p className="max-w-xl text-sm opacity-75">{mood.blurb}</p>
          </div>
        </motion.section>

        <section aria-label="Recipes" className="pb-10 pt-12">
          {results.length ?
          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-12">
              <AnimatePresence initial={false}>
                {results.map((r, i) => {
                const p = PATTERN[i % PATTERN.length];
                return (
                  <RecipeEntry
                    key={r.id}
                    recipe={r}
                    variant={p.variant}
                    className={`${p.span} ${p.variant === 'wide' || p.variant === 'large' ? 'sm:col-span-2' : ''}`}
                    conflicts={recipeConflicts(r, data.profile)}
                    saved={isSaved(r.id)}
                    onToggleSave={() => toggleSave(r.id)} />);


              })}
              </AnimatePresence>
            </div> :

          <div className="py-24 text-center">
              <SearchXIcon className="mx-auto h-8 w-8 text-cocoa/40" />
              <p className="mt-4 font-display text-3xl">Nothing on this page — yet.</p>
              <p className="mt-2 text-sm text-cocoa/60">Try a different search or loosen a filter.</p>
            </div>
          }
        </section>
      </div>

      {!filtering &&
      <>
          <section aria-labelledby="trending" className="mt-10 bg-cocoa text-cream">
            <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 lg:grid-cols-[1fr_1.6fr] lg:px-8">
              <Reveal>
                <h2 id="trending" className="font-display text-5xl lg:text-6xl">What everyone is <span className="italic text-champagne">cooking.</span></h2>
                <p className="mt-4 max-w-sm text-cream/60">The most-opened recipes in DailyPlate this week (demonstration ranking).</p>
              </Reveal>
              <ol className="divide-y divide-cream/15 border-y border-cream/15">
                {trending.map((r) =>
              <li key={r.id}>
                    <Link to={`/app/recipes/${r.id}`} className="group grid grid-cols-[48px_64px_1fr] items-center gap-5 py-4">
                      <span className="font-display text-4xl italic text-champagne">{r.trendingRank}</span>
                      <SafeImage src={r.image} alt="" className="h-16 w-16 object-cover" fallbackTone="dark" />
                      <span><span className="block font-display text-2xl group-hover:underline">{r.title}</span><span className="text-xs text-cream/55">{r.cuisine} · {r.prepTime + r.cookTime} min</span></span>
                    </Link>
                  </li>
              )}
              </ol>
            </div>
          </section>

          <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8">
            <section aria-labelledby="new">
              <h2 id="new" className="font-display text-4xl">Recently added</h2>
              <ul className="mt-6 grid grid-cols-2 gap-5">
                {fresh.map((r) =>
              <li key={r.id}>
                    <Link to={`/app/recipes/${r.id}`} className="group block">
                      <SafeImage src={r.image} alt="" className="aspect-square w-full object-cover" />
                      <p className="mt-2 text-xs text-cocoa/55">{r.addedDaysAgo === 1 ? 'Added yesterday' : `Added ${r.addedDaysAgo} days ago`}</p>
                      <p className="font-display text-xl leading-tight group-hover:underline">{r.title}</p>
                    </Link>
                  </li>
              )}
              </ul>
            </section>
            <div className="space-y-14">
              <section aria-labelledby="for-you">
                <h2 id="for-you" className="font-display text-4xl">Recommended for you</h2>
                <p className="mt-1 text-sm text-cocoa/60">Matched to your goal, favourites and kitchen — and nothing you’re allergic to.</p>
                <ul className="mt-6 divide-y divide-cocoa/10 border-y border-cocoa/10">
                  {forYou.map((r) =>
                <li key={r.id}><Link to={`/app/recipes/${r.id}`} className="group flex items-center gap-4 py-3"><SafeImage src={r.image} alt="" className="h-14 w-14 object-cover" /><span className="font-display text-xl group-hover:underline">{r.title}</span></Link></li>
                )}
                </ul>
              </section>
              <section aria-labelledby="saved">
                <h2 id="saved" className="font-display text-4xl">Your saved recipes</h2>
                {savedList.length ?
              <ul className="mt-6 flex flex-wrap gap-3">
                    {savedList.map((r) => <li key={r.id}><Link to={`/app/recipes/${r.id}`} className="flex items-center gap-2 border border-cocoa/15 py-1.5 pl-1.5 pr-4 text-sm hover:border-cocoa/40"><SafeImage src={r.image} alt="" className="h-8 w-8 object-cover" />{r.title}</Link></li>)}
                  </ul> :
              <p className="mt-4 text-sm text-cocoa/60">Tap Save on any recipe to keep it here.</p>}
              </section>
            </div>
          </div>
        </>
      }
    </div>);

}