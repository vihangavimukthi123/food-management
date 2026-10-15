import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, MoveRightIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { SafeImage } from '../SafeImage';
import { images, recipeImages } from '../../data/images';

const ingredients = ['Ripe tomatoes', 'Eggs', 'Red onion', 'Smoked paprika', 'Day-old sourdough'];

export function LandingKitchen() {
  return (
    <>
      <section className="bg-terracotta text-cream">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 lg:grid-cols-[1fr_auto_1fr] lg:gap-10 lg:px-10 lg:py-32">
          <Reveal>
            <p className="font-display text-xl italic text-cream/80">From ingredients to inspiration</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] lg:text-6xl">What’s in your kitchen is already a recipe.</h2>
            <ul className="mt-10 space-y-3">
              {ingredients.map((ing, i) =>
              <motion.li
                key={ing}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-4 border-b border-cream/25 pb-3 font-display text-2xl">
                
                  <span className="h-2 w-2 rounded-full bg-champagne" aria-hidden="true" />{ing}
                </motion.li>
              )}
            </ul>
          </Reveal>
          <svg viewBox="0 0 120 200" className="hidden h-64 w-28 lg:block" aria-hidden="true">
            {[20, 60, 100, 140, 180].map((y, i) =>
            <motion.path key={y} d={`M0 ${y} C 60 ${y}, 60 100, 120 100`} stroke="#f3ebdb" strokeOpacity="0.55" strokeWidth="1.2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }} />
            )}
          </svg>
          <Reveal delay={0.1}>
            <figure>
              <SafeImage src={recipeImages.shakshuka} alt="Smoked tomato shakshuka in a cast iron pan" className="aspect-square w-full object-cover" />
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-display text-3xl">Smoked Tomato Shakshuka</span>
                <span className="text-sm text-cream/75">5 of 5 in your kitchen</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="kraft text-cocoa">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="max-w-3xl">
            <p className="font-display text-xl italic text-olive">A more thoughtful kitchen</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] lg:text-7xl">Nothing in your kitchen should lose its possibility.</h2>
          </Reveal>
          <div className="mt-14 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <figure>
              <SafeImage src={images.wasteBefore} alt="Day-old bread, cooked rice, soft tomatoes and an overripe banana on a board" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="mt-3 text-sm text-cocoa/65"><span className="font-display text-xl italic text-cocoa">Before</span> — day-old bread, soft tomatoes, half a cucumber.</figcaption>
            </figure>
            <MoveRightIcon className="mx-auto h-8 w-8 rotate-90 text-olive md:rotate-0" aria-hidden="true" />
            <figure>
              <SafeImage src={recipeImages.panzanella} alt="Tomato and bread panzanella salad" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="mt-3 text-sm text-cocoa/65"><span className="font-display text-xl italic text-cocoa">After</span> — a bright panzanella for three.</figcaption>
            </figure>
          </div>
          <div className="mt-12 flex flex-col gap-6 border-t border-cocoa/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-cocoa/70">Log what gets thrown away, see your own patterns, and get leftover-based recipes that respect your allergies.</p>
            <Link to="/app/waste" className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa hover:underline">Visit Food Rescue <ArrowRightIcon className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>);

}