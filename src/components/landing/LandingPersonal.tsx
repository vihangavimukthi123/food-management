import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, EyeOffIcon, Sparkles } from 'lucide-react';
import { Reveal } from '../Reveal';
import { SafeImage } from '../SafeImage';
import { SpiceDust } from '../ambient/SpiceDust';
import { DriftingLeaves } from '../ambient/DriftingLeaves';
import { images, recipeImages } from '../../data/images';

const traits = ['Dairy-free', 'Loves mango', 'Intermediate cook', 'Avoids peanuts', 'Sri Lankan & Japanese', 'Hearty portions'];

export function LandingPersonal() {
  return (
    <>
      {/* Food That Understands You */}
      <section className="relative overflow-hidden bg-[#eee4d5] text-cocoa">
        <DriftingLeaves
          color="#5f8a4a"
          opacity={0.3}
          leaves={[
            { x: 8, y: 30, size: 55, rotate: 20, shape: 'sprig', duration: 18 },
            { x: 90, y: 70, size: 40, rotate: -25, shape: 'curry', duration: 16 }
          ]}
        />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-32">
          <div className="relative">
            <SafeImage
              src={images.profile}
              alt="Hands holding a bowl of herbs, cherry tomatoes and lime"
              className="aspect-[4/5] w-full max-w-[520px] rounded-2xl object-cover shadow-sm border border-[#d8c8b0]"
            />
            <ul className="absolute -right-2 bottom-10 flex max-w-[280px] flex-wrap justify-end gap-2 sm:-right-10" aria-label="Example food identity">
              {traits.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: 0.1 + i * 0.05 }}
                  className="rounded-full bg-[#faf5eb] border border-[#d8c8b0] px-4 py-2 text-xs font-bold text-forest shadow-xs"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e2ede0] px-3.5 py-1 text-xs font-bold text-forest uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Living Profile
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] text-forest">
              Tell us once. <span className="italic text-botanical font-normal">We remember everywhere.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-cocoa/75">
              Your allergies, dietary choices, favourite flavours and dislikes quietly shape every recipe, plan and suggestion you see.
            </p>
            <ul className="mt-8 divide-y divide-[#d8c8b0] border-y border-[#d8c8b0]">
              {[
                { img: recipeImages.chickpea, t: 'Pumpkin & Chickpea Coconut Curry', fit: true },
                { img: recipeImages.gotukola, t: 'Gotukola Sambol', fit: true },
                { img: recipeImages.pesto, t: 'Basil Pesto Linguine', fit: false }
              ].map((r) => (
                <li key={r.t} className={`flex items-center gap-4 py-4 ${r.fit ? '' : 'opacity-50'}`}>
                  <SafeImage src={r.img} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-[#d8c8b0]" />
                  <span className={`flex-1 font-display text-xl font-medium ${r.fit ? 'text-cocoa' : 'line-through decoration-cocoa/50 text-cocoa/60'}`}>
                    {r.t}
                  </span>
                  {r.fit ? (
                    <span className="text-xs font-bold text-forest bg-[#e2ede0] px-3 py-1 rounded-full">Fits your profile</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-[#fae8de] px-3 py-1 rounded-full">
                      <EyeOffIcon className="h-3.5 w-3.5" /> Contains dairy
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The Intelligent Culinary Companion */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#183626] via-[#244c36] to-[#1a3828] text-cream">
        <SafeImage src={images.coach} alt="" className="absolute inset-0 h-full w-full object-cover object-left opacity-30" fallbackTone="dark" />
        <SpiceDust count={24} color="#f0d59e" />
        <DriftingLeaves color="#d4a843" opacity={0.35} leaves={[{ x: 85, y: 25, size: 60, rotate: -30, shape: 'sprig', duration: 20 }]} />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 py-24 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-36">
          <div className="hidden lg:block" />
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
              <Sparkles className="h-3.5 w-3.5" /> Intelligent Culinary Companion
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] text-cream">
              A coach that already knows your kitchen.
            </h2>
            <div className="mt-8 space-y-5 rounded-2xl bg-white/10 p-6 backdrop-blur-xs border border-cream/20">
              <p className="ml-auto w-fit rounded-full bg-cream/20 px-4 py-2 text-xs font-semibold text-champagne">
                "What can I make with what I have?"
              </p>
              <p className="font-display text-2xl leading-snug text-cream">
                Your tomatoes, eggs and red onion are all here — <span className="italic text-champagne font-bold">Smoked Tomato Shakshuka</span> uses seven of its nine ingredients. I’ve left out anything with peanuts.
              </p>
              <p className="text-[11px] text-cream/60">Simulated guidance, built from your profile — not a medical adviser.</p>
            </div>
            <Link to="/app/coach" className="mt-8 inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3 text-xs font-bold text-forest shadow-md transition-all hover:bg-cream">
              Meet your coach <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}