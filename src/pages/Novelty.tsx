import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, Sparkles } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { noveltyNodes } from '../data/novelty';
import { images } from '../data/images';
import { SafeImage } from '../components/SafeImage';
import { SpiceDust } from '../components/ambient/SpiceDust';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';
import { RippleDemo } from '../components/novelty/RippleDemo';

export function Novelty() {
  const { user } = useStore();
  const [active, setActive] = useState(0);
  const gap = 100 / (noveltyNodes.length - 1);

  return (
    <div className="bg-[#f4ece1] text-cocoa min-h-screen">
      {/* Rich Botanical Hero with Animated Golden Constellation */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-gradient-to-r from-[#183626] via-[#244c36] to-[#1a3828] text-cream">
        <SafeImage
          eager
          src={images.novelty}
          alt="Single ingredients arranged like a constellation"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          fallbackTone="dark"
        />

        {/* Animated Constellation Lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[
            [28, 40, 48, 28],
            [48, 28, 67, 38],
            [67, 38, 58, 52],
            [58, 52, 33, 70],
            [58, 52, 52, 78],
            [52, 78, 72, 75],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#f0d59e"
              strokeOpacity="0.55"
              strokeWidth="0.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
            />
          ))}
        </svg>

        <DriftingLeaves
          color="#d4a843"
          opacity={0.35}
          leaves={[
            { x: 10, y: 35, size: 55, rotate: 20, shape: 'sprig', duration: 19 },
            { x: 85, y: 65, size: 40, rotate: -30, shape: 'curry', duration: 16 },
          ]}
        />
        <SpiceDust count={24} color="#f0d59e" />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-32 lg:px-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
            <Sparkles className="h-3.5 w-3.5" /> Connected Food Ecosystem
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl lg:text-8xl text-cream">
            More than recipes. <span className="italic text-champagne">A connected food world.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-cream/80">
            DailyPlate’s value isn’t any single isolated tool — it’s how each one informs the others. Here is how your personal food profile flows through the entire experience.
          </p>
        </div>
      </section>

      {/* The Journey Section */}
      <section aria-labelledby="journey" className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 lg:grid-cols-[360px_1fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="journey" className="font-display text-4xl font-bold text-forest">The Journey</h2>
          <p className="mt-2 text-sm text-cocoa/70">Trace a single ingredient as it interacts with all 6 DailyPlate studios.</p>

          <div className="relative mt-8 hidden h-[540px] lg:block">
            <span className="absolute bottom-0 left-[11px] top-0 w-px bg-[#d8c8b0]" aria-hidden="true" />
            <motion.span
              className="absolute left-[11px] top-0 w-px origin-top bg-forest"
              style={{ height: '100%' }}
              initial={false}
              animate={{ scaleY: active / (noveltyNodes.length - 1) }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            <ol>
              {noveltyNodes.map((n, i) => (
                <li key={n.id} className="absolute left-0 flex -translate-y-1/2 items-center gap-4" style={{ top: `${i * gap}%` }}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      document.getElementById(`node-${n.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="flex items-center gap-4 text-left group"
                    aria-current={active === i ? 'step' : undefined}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${
                        i <= active ? 'border-forest bg-forest shadow-xs' : 'border-[#d8c8b0] bg-[#faf5eb]'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${i <= active ? 'bg-cream' : 'bg-[#c5b59f]'}`} />
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                        active === i ? 'text-forest' : 'text-cocoa/60 group-hover:text-cocoa'
                      }`}
                    >
                      {n.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="space-y-20">
          {noveltyNodes.map((n, i) => (
            <motion.li
              key={n.id}
              id={`node-${n.id}`}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6 }}
              initial={{ opacity: 0.4 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid scroll-mt-28 gap-8 md:grid-cols-[1fr_1.15fr] md:items-center rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-7 shadow-sm transition-all hover:border-[#bfa98d] hover:shadow-md lg:p-8"
            >
              <SafeImage
                src={n.image}
                alt=""
                className={`aspect-[4/3] w-full rounded-xl object-cover shadow-xs ${i % 2 ? 'md:order-2' : ''}`}
                fallbackTone="light"
              />
              <div>
                <p className="font-display text-lg italic text-amber-800">{n.short}</p>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl leading-tight font-bold text-cocoa">{n.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cocoa/75">{n.detail}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-[#e0d0ba] bg-[#f0e6d6] p-3.5">
                    <dt className="font-bold uppercase tracking-wider text-cocoa/50">Receives</dt>
                    <dd className="mt-1 font-semibold text-cocoa">{n.receives}</dd>
                  </div>
                  <div className="rounded-xl border border-[#e0d0ba] bg-[#f0e6d6] p-3.5">
                    <dt className="font-bold uppercase tracking-wider text-cocoa/50">Gives</dt>
                    <dd className="mt-1 font-semibold text-cocoa">{n.gives}</dd>
                  </div>
                </dl>
                <Link
                  to={user ? n.to : '/register'}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-forest hover:underline"
                >
                  {user ? 'Visit this studio' : 'Create your world to visit'} <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Ripple Interactive Demo */}
      <RippleDemo />

      {/* Footer Disclaimer */}
      <section className="border-t border-[#d8c8b0] bg-[#ece2d3]">
        <div className="mx-auto max-w-[1400px] px-6 py-14 text-xs text-cocoa/70 lg:px-10">
          <p className="max-w-3xl leading-relaxed">
            DailyPlate recommendations run locally in your browser through transparent, profile-aligned logic. The innovation is the unified food identity where pantry, health, cooking skills, and sustainability continuously elevate one another.
          </p>
        </div>
      </section>
    </div>
  );
}