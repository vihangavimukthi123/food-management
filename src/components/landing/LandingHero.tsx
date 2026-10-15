import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { SafeImage } from '../SafeImage';
import { DriftingLeaves } from '../ambient/DriftingLeaves';
import { images } from '../../data/images';
import { useStore } from '../../contexts/StoreContext';
import { buttonClass } from '../../utils/styles';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];
const headline = ['Discover', 'a', 'More', 'Beautiful', 'Way', 'to', 'Eat.'];

export function LandingHero() {
  const ref = useRef<HTMLElement>(null);
  const { user } = useStore();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden bg-ink text-cream">
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.12]">
        <motion.div className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease }}>
          <SafeImage eager src={images.hero} alt="Charred heirloom carrots on herbed farro with nasturtium flowers, on a dark stoneware plate by a window" className="h-full w-full object-cover object-[70%_center]" fallbackTone="dark" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-ink/50" />
      <DriftingLeaves
        color="#7f9a6e"
        opacity={0.55}
        leaves={[
        { x: -3, y: 62, size: 120, rotate: 28, shape: 'sprig', duration: 16 },
        { x: 88, y: 8, size: 70, rotate: -40, shape: 'curry', duration: 19 },
        { x: 78, y: 70, size: 46, rotate: 60, shape: 'leaf', duration: 14 },
        { x: 46, y: 12, size: 26, rotate: 12, shape: 'leaf', duration: 21 }]
        } />
      

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-20 lg:px-10 lg:pb-24">
        <motion.p className="font-display text-2xl italic text-champagne sm:text-3xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1, ease }}>
          Make Every Day Taste Better.
        </motion.p>
        <h1 className="mt-4 max-w-5xl font-display text-[3.4rem] font-medium leading-[0.92] tracking-tight sm:text-7xl lg:text-[7.4rem]">
          {headline.map((w, i) =>
          <span key={w + i} className="inline-block overflow-hidden pb-2 pr-[0.22em] align-bottom">
              <motion.span className={`inline-block ${w === 'Beautiful' ? 'italic text-champagne' : ''}`} initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.3, delay: 0.2 + i * 0.06, ease }}>
                {w}
              </motion.span>
            </span>
          )}
        </h1>
        <motion.div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.7, ease }}>
          <p className="max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Your personal culinary world. Discover meals, transform ingredients, explore new flavours and create a food experience that belongs to you.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to={user ? '/app' : '/register'} className={`${buttonClass('gold')} px-7 py-4 text-[0.95rem]`}>
              Enter Your Food World <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a href="#discover" className={`${buttonClass('secondary', 'dark')} px-7 py-4 text-[0.95rem]`}>Explore DailyPlate</a>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 right-10 z-10 hidden items-center gap-4 text-xs text-cream/60 xl:flex">
        <span className="font-display text-base italic">Plate No. 01 — charred heirloom carrots, farro, nasturtium</span>
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 hidden h-16 w-px -translate-x-1/2 overflow-hidden bg-cream/15 lg:block" aria-hidden="true">
        <motion.span className="block h-6 w-px bg-champagne" animate={{ y: [-24, 64] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }} />
      </div>
    </section>);

}