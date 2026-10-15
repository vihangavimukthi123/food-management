import React from 'react';
import { motion } from 'framer-motion';
import { useAmbient } from './useAmbient';

export function Steam({ className = '', color = '#f3ebdb' }: {className?: string;color?: string;}) {
  const animate = useAmbient();
  const paths = ['M20 90 C 8 70, 32 55, 20 35 C 10 20, 26 10, 20 0', 'M45 90 C 33 72, 57 58, 45 38 C 35 22, 51 12, 45 2', 'M70 90 C 58 70, 82 56, 70 36 C 60 20, 76 10, 70 0'];
  return (
    <svg aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none ${className}`} fill="none">
      {paths.map((d, i) =>
      <motion.path
        key={d}
        d={d}
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ opacity: animate ? 0 : 0.3, y: 0 }}
        animate={animate ? { opacity: [0, 0.45, 0], y: [8, -10] } : undefined}
        transition={{ duration: 4.5, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }} />

      )}
    </svg>);

}