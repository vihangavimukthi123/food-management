import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { worlds } from '../../data/landing';
import { SafeImage } from '../SafeImage';

export function LandingWorlds() {
  const [active, setActive] = useState(0);
  return (
    <section id="worlds" className="grain grain-light bg-forest text-cream">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-10 lg:py-32">
        <div>
          <p className="font-display text-xl italic text-champagne">Explore the culinary world</p>
          <h2 className="mt-5 font-display text-5xl leading-[1.02] lg:text-7xl">Ten destinations. One universe.</h2>
          <p className="mt-6 max-w-md text-cream/70">Every part of DailyPlate is its own place, with its own light and atmosphere — and every one of them knows you.</p>
          <div className="sticky top-28 mt-12 hidden aspect-[4/5] max-h-[520px] overflow-hidden lg:block">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                <SafeImage src={worlds[active].image} alt="" className="h-full w-full object-cover" fallbackTone="dark" />
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-0 left-0 bg-forest/85 px-4 py-3 font-display text-lg italic">{worlds[active].place}</p>
          </div>
        </div>
        <ol className="border-t border-cream/15">
          {worlds.map((w, i) =>
          <li key={w.name} className="border-b border-cream/15">
              <Link
              to={w.to}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group flex items-start gap-5 py-6 lg:py-7">
              
                <span className="w-8 pt-2 text-xs tabular-nums text-cream/40" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <SafeImage src={w.image} alt="" className="h-16 w-14 shrink-0 object-cover lg:hidden" fallbackTone="dark" />
                <span className="flex-1">
                  <span className={`block font-display text-3xl leading-tight transition-colors duration-150 lg:text-[2.4rem] ${active === i ? 'text-champagne' : 'text-cream'}`}>{w.name}</span>
                  <span className="mt-1 block text-sm text-cream/55">{w.place} — {w.text}</span>
                </span>
                <ArrowUpRightIcon className={`mt-3 h-5 w-5 shrink-0 transition-[transform,opacity] duration-200 ease-out ${active === i ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-30'}`} aria-hidden="true" />
              </Link>
            </li>
          )}
        </ol>
      </div>
    </section>);

}