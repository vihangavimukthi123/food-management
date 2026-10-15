import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoMark } from '../Logo';
import { greeting } from '../../utils/dates';

export function WelcomeOverlay({ name }: {name: string;}) {
  const [show, setShow] = useState(() => !sessionStorage.getItem('dp.welcomed'));

  useEffect(() => {
    if (!show) return;
    sessionStorage.setItem('dp.welcomed', '1');
    const t = window.setTimeout(() => setShow(false), 1200);
    return () => window.clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show &&
      <motion.div
        className="fixed inset-0 z-[90] flex cursor-pointer flex-col items-center justify-center bg-cream px-6 text-center text-cocoa"
        onClick={() => setShow(false)}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        role="status">
        
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
            <LogoMark size={56} tone="onLight" />
          </motion.div>
          <motion.p className="mt-8 font-display text-5xl sm:text-6xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: 0.1 }}>
            {greeting()}, <span className="italic text-terracotta">{name.split(' ')[0]}.</span>
          </motion.p>
          <motion.p className="mt-3 text-cocoa/65" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.3 }}>
            Let’s make today delicious.
          </motion.p>
        </motion.div>
      }
    </AnimatePresence>);

}