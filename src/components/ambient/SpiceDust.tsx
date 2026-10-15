import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAmbient } from './useAmbient';

interface SpiceDustProps {
  count?: number;
  color?: string;
  className?: string;
}

/** Fine, slow-rising specks — pollen in the Coach studio, spice in the Flavour Lab. */
export function SpiceDust({ count = 22, color = '#d9a441', className = '' }: SpiceDustProps) {
  const animate = useAmbient();
  const specks = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      x: i * 37 % 100,
      y: 20 + i * 53 % 80,
      s: 1.5 + i * 7 % 3,
      d: 9 + i * 11 % 9,
      delay: i % 7 * 0.9
    })),
    [count]
  );
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {specks.map((p, i) =>
      <motion.span
        key={i}
        className="absolute rounded-full"
        style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: color, opacity: animate ? 0 : 0.35 }}
        animate={animate ? { y: [0, -90], opacity: [0, 0.6, 0] } : undefined}
        transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: 'linear' }} />

      )}
    </div>);

}