import React from 'react';
import { motion } from 'framer-motion';
import { useAmbient } from '../ambient/useAmbient';

/** The coach's visual identity: a slowly turning botanical seed-head. */
export function CoachOrb({ size = 112, thinking = false }: {size?: number;thinking?: boolean;}) {
  const animate = useAmbient();
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden="true">
      <motion.svg viewBox="0 0 120 120" className="absolute inset-0" animate={animate ? { rotate: 360 } : undefined} transition={{ duration: thinking ? 8 : 40, repeat: Infinity, ease: 'linear' }}>
        <circle cx="60" cy="60" r="56" fill="none" stroke="#e6d3a3" strokeOpacity="0.25" strokeDasharray="2 6" />
        {Array.from({ length: 8 }).map((_, i) =>
        <path key={i} d="M60 60 C 52 44, 56 26, 60 14 C 64 26, 68 44, 60 60 Z" fill="#a7b79a" fillOpacity={0.18 + i % 2 * 0.12} transform={`rotate(${i * 45} 60 60)`} />
        )}
      </motion.svg>
      <motion.span
        className="absolute inset-[34%] rounded-full bg-champagne"
        animate={animate ? { scale: thinking ? [1, 1.12, 1] : [1, 1.04, 1], opacity: [0.85, 1, 0.85] } : undefined}
        transition={{ duration: thinking ? 1.2 : 4, repeat: Infinity, ease: 'easeInOut' }} />
      
    </div>);

}