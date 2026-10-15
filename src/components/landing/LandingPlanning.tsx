import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, Sparkles } from 'lucide-react';
import { Reveal } from '../Reveal';
import { SafeImage } from '../SafeImage';
import { DriftingLeaves } from '../ambient/DriftingLeaves';
import { images, recipeImages } from '../../data/images';

const steps = [
  { t: 'Your goal', d: 'Weight gain, weight loss, balance, wellness, muscle support or a dietary focus.' },
  { t: 'What you love', d: 'Favourite foods, dislikes and the meals you enjoy most.' },
  { t: 'How you eat', d: 'Vegetarian, vegan, gluten-free, dairy-free — or none.' },
  { t: 'What to avoid', d: 'Allergies are respected in every corner of DailyPlate.' },
  { t: 'Your confidence', d: 'Beginner, intermediate or advanced in the kitchen.' },
  { t: 'Your portions', d: 'Light, standard or hearty plates.' },
];

const day = [
  { slot: 'Breakfast', t: 'Kiribath & lunu miris', img: recipeImages.kiribath, kcal: 410 },
  { slot: 'Morning snack', t: 'Mango sunrise bowl', img: recipeImages.smoothieBowl, kcal: 330 },
  { slot: 'Lunch', t: 'Red rice & dhal', img: recipeImages.redRiceDhal, kcal: 480 },
  { slot: 'Afternoon', t: 'Mung ata', img: recipeImages.greenGram, kcal: 260 },
  { slot: 'Dinner', t: 'Pumpkin chickpea curry', img: recipeImages.chickpea, kcal: 520 },
];

export function LandingPlanning() {
  return (
    <>
      <section className="relative overflow-hidden grain bg-[#e3ece0] text-cocoa">
        <DriftingLeaves
          color="#5f8a4a"
          opacity={0.3}
          leaves={[
            { x: 92, y: 20, size: 60, rotate: -25, shape: 'sprig', duration: 19 },
            { x: 6, y: 75, size: 40, rotate: 30, shape: 'leaf', duration: 16 }
          ]}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#faf5eb] border border-[#d6c7b0] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-forest">
                <Sparkles className="h-3.5 w-3.5" /> Thoughtful Methodology
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] text-forest">
                Six thoughtful questions. <span className="italic text-botanical font-normal">A plan that feels like yours.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-md text-base sm:text-lg text-cocoa/75 lg:justify-self-end">
                Inside the AI Coach, Build a Plan synthesizes your culinary rhythm, kitchen tools, and preferences into a realistic weekly roadmap.
              </p>
            </Reveal>
          </div>

          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.t}
                delay={i * 0.04}
                className="flex flex-col rounded-2xl border border-[#d6c7b0] bg-[#faf5eb] p-6 shadow-xs lg:min-h-[220px]"
              >
                <span className="font-display text-4xl italic font-bold text-forest">{i + 1}</span>
                <h3 className="mt-5 font-display text-2xl font-bold text-cocoa">{s.t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-cocoa/70">{s.d}</p>
              </Reveal>
            ))}
          </ol>

          <Link
            to="/app/coach"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-xs font-bold text-cream shadow-sm transition-all hover:bg-emerald-900"
          >
            Build my food plan <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#dfe4d3] text-cocoa">
        <SafeImage src={images.plan} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <DriftingLeaves
          color="#6f8a5e"
          opacity={0.3}
          leaves={[
            { x: 90, y: 10, size: 60, rotate: -20, shape: 'sprig', duration: 18 },
            { x: 4, y: 70, size: 40, rotate: 30, shape: 'leaf', duration: 15 },
          ]}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#faf5eb] border border-[#d6c7b0] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-forest">
              <Sparkles className="h-3.5 w-3.5" /> Weekly Rhythm
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] text-forest">
              A gentle day, laid out like a journal.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-cocoa/75">
              My Plan turns your goal into five meals a day across a week — with portions, ingredients and estimated nutrition. Tick them off as you go.
            </p>
          </Reveal>

          <ol className="relative mt-16 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            <span className="absolute left-0 right-0 top-[72px] hidden h-px bg-cocoa/20 lg:block" aria-hidden="true" />
            {day.map((m, i) => (
              <Reveal as="li" key={m.slot} delay={i * 0.05} className="relative rounded-2xl bg-[#faf5eb]/80 p-5 border border-[#d6c7b0] backdrop-blur-2xs">
                <SafeImage src={m.img} alt={m.t} className="relative h-28 w-28 rounded-full object-cover ring-4 ring-[#dfe4d3] mx-auto shadow-xs" />
                <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-forest text-center">{m.slot}</p>
                <p className="mt-1 font-display text-xl font-bold leading-tight text-cocoa text-center">{m.t}</p>
                <p className="mt-1 text-xs text-cocoa/60 text-center font-medium">≈ {m.kcal} kcal</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}