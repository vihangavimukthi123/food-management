import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, ListChecksIcon, XIcon } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { LogoMark } from '../components/Logo';
import { getRecipe } from '../utils/recommend';

export function CookingMode() {
  const { id = '' } = useParams();
  const recipe = getRecipe(id);
  const navigate = useNavigate();
  const { logActivity } = useAccount();
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [finished, setFinished] = useState(false);
  const viaKeyboard = useRef(false);

  const total = recipe?.steps.length ?? 0;
  const next = useCallback(() => {
    if (step < total - 1) setStep((s) => s + 1);else
    if (!finished && recipe) {setFinished(true);logActivity(`Cooked ${recipe.title}`, 'recipe');}
  }, [step, total, finished, recipe, logActivity]);
  const prev = useCallback(() => {if (finished) setFinished(false);else setStep((s) => Math.max(0, s - 1));}, [finished]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') {viaKeyboard.current = true;next();}
      if (e.key === 'ArrowLeft') {viaKeyboard.current = true;prev();}
      if (e.key === 'Escape') navigate(`/app/recipes/${id}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, navigate, id]);

  if (!recipe) return <Navigate to="/app/recipes" replace />;
  const instant = viaKeyboard.current;
  viaKeyboard.current = false;
  const toggle = (n: string) => setChecked((c) => c.includes(n) ? c.filter((x) => x !== n) : [...c, n]);

  const checklist =
  <div>
      <h2 className="text-xs font-semibold text-champagne">Ingredients · {checked.length}/{recipe.ingredients.length} ready</h2>
      <ul className="mt-4 space-y-1">
        {recipe.ingredients.map((i) => {
        const on = checked.includes(i.name);
        return (
          <li key={i.name}>
              <label className="flex cursor-pointer items-start gap-3 py-2">
                <input type="checkbox" checked={on} onChange={() => toggle(i.name)} className="sr-only" />
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${on ? 'border-champagne bg-champagne text-ink' : 'border-cream/30'}`} aria-hidden="true">{on && <CheckIcon className="h-3 w-3" />}</span>
                <span className={`text-sm transition-colors duration-150 ${on ? 'text-cream/40 line-through' : 'text-cream/90'}`}>{i.qty} {i.unit} {i.name}</span>
              </label>
            </li>);

      })}
      </ul>
    </div>;


  return (
    <div className="grain grain-light flex min-h-screen w-full flex-col bg-ink text-cream">
      <header className="flex items-center gap-4 px-5 py-5 lg:px-10">
        <LogoMark size={30} tone="onDark" />
        <p className="min-w-0 flex-1 truncate font-display text-xl">{recipe.title}</p>
        <button type="button" onClick={() => setDrawer(true)} className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm lg:hidden"><ListChecksIcon className="h-4 w-4" />Ingredients</button>
        <Link to={`/app/recipes/${recipe.id}`} className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm transition-colors duration-150 hover:border-cream/60"><XIcon className="h-4 w-4" />Exit</Link>
      </header>

      <div className="px-5 lg:px-10" role="progressbar" aria-label="Cooking progress" aria-valuemin={1} aria-valuemax={total} aria-valuenow={finished ? total : step + 1}>
        <div className="flex gap-1.5">
          {recipe.steps.map((s, i) =>
          <button key={s} type="button" onClick={() => {setFinished(false);setStep(i);}} aria-label={`Go to step ${i + 1}`} className="h-1 flex-1 overflow-hidden bg-cream/15">
              <motion.span className="block h-full bg-champagne" initial={false} animate={{ width: finished || i <= step ? '100%' : '0%' }} transition={{ duration: instant ? 0 : 0.25 }} />
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] flex-1 gap-12 px-5 py-12 lg:grid-cols-[1fr_300px] lg:px-10">
        <main className="flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            {finished ?
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: instant ? 0 : 0.25 }} className="my-auto">
                <p className="font-display text-2xl italic text-champagne">Everything is done.</p>
                <h1 className="mt-4 font-display text-7xl leading-none lg:text-9xl">Plated.</h1>
                <p className="mt-6 max-w-lg text-cream/70">Enjoy your {recipe.title.toLowerCase()}. We’ve added it to your activity.</p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link to={`/app/recipes/${recipe.id}`} className="rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-ink">Back to recipe</Link>
                  <Link to="/app/plan" className="rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold">Mark it in My Plan</Link>
                </div>
              </motion.div> :

            <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: instant ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }} className="my-auto" aria-live="polite">
                <p className="font-display text-2xl italic text-champagne">Step {step + 1} <span className="text-cream/40">of {total}</span></p>
                <p className="mt-6 max-w-4xl font-display text-4xl leading-[1.15] sm:text-5xl lg:text-[3.8rem]">{recipe.steps[step]}</p>
              </motion.div>
            }
          </AnimatePresence>
          <nav aria-label="Step controls" className="mt-12 flex items-center justify-between gap-4">
            <button type="button" onClick={prev} disabled={step === 0 && !finished} className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-4 text-sm font-semibold transition-[border-color,opacity] duration-150 hover:border-cream/60 disabled:opacity-30"><ArrowLeftIcon className="h-4 w-4" />Previous</button>
            <p className="hidden text-xs text-cream/40 sm:block">Use ← → keys</p>
            {!finished && <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-full bg-champagne px-8 py-4 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-cream">{step === total - 1 ? 'Finish' : 'Next step'}<ArrowRightIcon className="h-4 w-4" /></button>}
          </nav>
        </main>
        <aside className="hidden border-l border-cream/10 pl-10 lg:block">{checklist}</aside>
      </div>

      <AnimatePresence>
        {drawer &&
        <motion.div className="fixed inset-0 z-50 bg-ink/70 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)}>
            <motion.div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-forest p-6" initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Ingredient checklist">
              <div className="mb-2 flex justify-end"><button type="button" onClick={() => setDrawer(false)} aria-label="Close"><XIcon className="h-5 w-5" /></button></div>
              {checklist}
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}