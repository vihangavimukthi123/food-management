import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { TriangleAlertIcon, BookmarkIcon, CheckIcon, ChefHatIcon, MinusIcon, PlusIcon, ShoppingBasketIcon } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { useSavedRecipes } from '../hooks/useSavedRecipes';
import { recipes } from '../data/recipes';
import { SafeImage } from '../components/SafeImage';
import { Steam } from '../components/ambient/Steam';
import { Reveal } from '../components/Reveal';
import { allergenLabel, getRecipe, inPantry, isCompatible, recipeConflicts } from '../utils/recommend';
import { guessCategory } from '../utils/kitchen';
import { isoDaysFromNow, uid } from '../utils/dates';
import { buttonClass } from '../utils/styles';

function formatQty(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 100) / 100);
}

export function RecipeDetail() {
  const { id = '' } = useParams();
  const recipe = getRecipe(id);
  const { data, update, logActivity } = useAccount();
  const { isSaved, toggleSave } = useSavedRecipes();
  const [servings, setServings] = useState(recipe?.servings ?? 2);

  useEffect(() => {
    if (!recipe) return;
    setServings(recipe.servings);
    update((d) => ({ ...d, recent: [recipe.id, ...d.recent.filter((x) => x !== recipe.id)].slice(0, 8) }));
  }, [recipe, update]);

  const similar = useMemo(() => recipe ? recipes.filter((r) => r.id !== recipe.id && isCompatible(r, data.profile) && (r.mealType === recipe.mealType || r.categories.some((c) => recipe.categories.includes(c)))).slice(0, 3) : [], [recipe, data.profile]);

  if (!recipe) return <Navigate to="/app/recipes" replace />;
  const r = recipe;
  const conflicts = recipeConflicts(r, data.profile);
  const scale = servings / r.servings;
  const missing = r.ingredients.filter((i) => !inPantry(i.key, data.pantry));
  const saved = isSaved(r.id);

  const addMissing = () => {
    const today = isoDaysFromNow(0);
    update((d) => ({
      ...d,
      pantry: [...d.pantry, ...missing.map((m) => ({ id: uid(), name: m.name, category: guessCategory(m.name), quantity: Math.round(m.qty * scale * 100) / 100, unit: m.unit, expiry: isoDaysFromNow(7), added: today, lowAt: 0 }))]
    }));
    logActivity(`Added ${missing.length} ingredients for ${r.title} to your kitchen`, 'kitchen');
    toast.success(`${missing.length} ingredients added to My Kitchen`, { description: 'Expiry set to one week — adjust it in My Kitchen.' });
  };

  return (
    <div className="bg-cocoa text-cream">
      <header className="relative flex h-[82svh] min-h-[560px] items-end overflow-hidden">
        <SafeImage eager src={r.image} alt={r.title} className="absolute inset-0 h-full w-full object-cover" fallbackTone="dark" />
        <div className="absolute inset-0 bg-ink/45" />
        {r.cookTime > 0 && <Steam className="absolute left-[46%] top-[22%] h-36 w-36 opacity-80" />}
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-14 lg:px-8">
          <Link to="/app/recipes" className="text-sm text-cream/70 hover:text-cream">← The Recipe Atelier</Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-champagne">{r.cuisine} · {r.mealType}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.95] sm:text-7xl lg:text-[6.5rem]">{r.title}</h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`/app/cook/${r.id}`} className={buttonClass('gold')}><ChefHatIcon className="h-4 w-4" />Start Cooking Mode</Link>
            <button type="button" onClick={() => toggleSave(r.id)} aria-pressed={saved} className={buttonClass('secondary', 'dark')}><BookmarkIcon className={`h-4 w-4 ${saved ? 'fill-champagne text-champagne' : ''}`} />{saved ? 'Saved' : 'Save recipe'}</button>
          </div>
        </div>
      </header>

      <div className="border-b border-cream/10 bg-ink">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px px-5 sm:grid-cols-5 lg:px-8">
          {[['Prep', `${r.prepTime} min`], ['Cook', r.cookTime ? `${r.cookTime} min` : 'No cooking'], ['Difficulty', r.difficulty], ['Per serving', `≈${r.nutrition.calories} kcal`]].map(([k, v]) =>
          <div key={k} className="py-5"><dt className="text-xs text-cream/50">{k}</dt><dd className="mt-1 font-display text-2xl">{v}</dd></div>
          )}
          <div className="py-5">
            <dt className="text-xs text-cream/50">Servings</dt>
            <dd className="mt-1 flex items-center gap-3">
              <button type="button" onClick={() => setServings((s) => Math.max(1, s - 1))} aria-label="Fewer servings" className="rounded-full border border-cream/25 p-1 hover:border-cream/60"><MinusIcon className="h-3.5 w-3.5" /></button>
              <span className="w-6 text-center font-display text-2xl tabular-nums" aria-live="polite">{servings}</span>
              <button type="button" onClick={() => setServings((s) => Math.min(12, s + 1))} aria-label="More servings" className="rounded-full border border-cream/25 p-1 hover:border-cream/60"><PlusIcon className="h-3.5 w-3.5" /></button>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-8 lg:py-24">
        {conflicts.length > 0 &&
        <p role="alert" className="mb-12 flex items-start gap-3 border-l-2 border-terracotta bg-terracotta/10 px-5 py-4 text-sm">
            <TriangleAlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />This recipe doesn’t fit your profile: it {conflicts.join(', ')}. Try the Flavour Lab for swaps.
          </p>
        }
        <Reveal><p className="max-w-3xl font-display text-3xl leading-snug text-cream/90 lg:text-4xl">{r.intro}</p></Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <section aria-labelledby="ingredients">
            <h2 id="ingredients" className="font-display text-4xl">Ingredients</h2>
            <p className="mt-1 text-sm text-cream/55">For {servings} {servings === 1 ? 'serving' : 'servings'} · checked against My Kitchen</p>
            <ul className="mt-6 divide-y divide-cream/10 border-y border-cream/10">
              {r.ingredients.map((i) => {
                const have = inPantry(i.key, data.pantry);
                return (
                  <li key={i.name} className="flex items-baseline gap-4 py-3">
                    <span className="w-24 shrink-0 text-sm tabular-nums text-champagne">{formatQty(i.qty * scale)} {i.unit}</span>
                    <span className="flex-1">{i.name}</span>
                    {have ? <span className="flex items-center gap-1 text-xs text-sage"><CheckIcon className="h-3.5 w-3.5" />In kitchen</span> : <span className="text-xs text-cream/40">Missing</span>}
                  </li>);

              })}
            </ul>
            {missing.length > 0 &&
            <button type="button" onClick={addMissing} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-champagne hover:underline"><ShoppingBasketIcon className="h-4 w-4" />Bought them? Add {missing.length} missing to My Kitchen</button>
            }

            <h2 className="mt-16 font-display text-3xl">Nutrition, per serving</h2>
            <table className="mt-4 w-full text-sm">
              <caption className="sr-only">Estimated nutrition per serving</caption>
              <tbody className="divide-y divide-cream/10">
                {[['Energy', `${r.nutrition.calories} kcal`], ['Protein', `${r.nutrition.protein} g`], ['Carbohydrates', `${r.nutrition.carbs} g`], ['Fat', `${r.nutrition.fat} g`], ['Fibre', `${r.nutrition.fibre} g`]].map(([k, v]) =>
                <tr key={k}><th scope="row" className="py-2.5 text-left font-normal text-cream/65">{k}</th><td className="py-2.5 text-right tabular-nums">{v}</td></tr>
                )}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-cream/45">Estimates for guidance only.</p>

            <h2 className="mt-12 font-display text-3xl">Dietary information</h2>
            <p className="mt-3 text-sm text-cream/75">{r.diets.length ? `Suitable for: ${r.diets.join(', ')}.` : 'Contains animal products and common allergens.'}</p>
            <p className="mt-2 text-sm text-cream/75">{r.allergens.length ? `Contains: ${r.allergens.map((a) => allergenLabel(a).toLowerCase()).join(', ')}.` : 'No common allergens listed.'}</p>
          </section>

          <section aria-labelledby="method">
            <h2 id="method" className="font-display text-4xl">Method</h2>
            <ol className="mt-8 space-y-10">
              {r.steps.map((s, i) =>
              <Reveal as="li" key={s} delay={i * 0.03} className="grid grid-cols-[56px_1fr] gap-4">
                  <span className="font-display text-5xl italic leading-none text-champagne/80">{i + 1}</span>
                  <p className="pt-1 text-lg leading-relaxed text-cream/90">{s}</p>
                </Reveal>
              )}
            </ol>
            <Link to={`/app/cook/${r.id}`} className={`${buttonClass('gold')} mt-12`}><ChefHatIcon className="h-4 w-4" />Cook step by step</Link>
          </section>
        </div>

        {similar.length > 0 &&
        <section aria-labelledby="similar" className="mt-28 border-t border-cream/10 pt-14">
            <h2 id="similar" className="font-display text-4xl">You might also cook</h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-3">
              {similar.map((s) =>
            <li key={s.id}>
                  <Link to={`/app/recipes/${s.id}`} className="group block">
                    <div className="overflow-hidden"><SafeImage src={s.image} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" fallbackTone="dark" /></div>
                    <p className="mt-3 font-display text-2xl group-hover:underline">{s.title}</p>
                    <p className="text-xs text-cream/55">{s.prepTime + s.cookTime} min · {s.difficulty}</p>
                  </Link>
                </li>
            )}
            </ul>
          </section>
        }
      </div>
    </div>);

}