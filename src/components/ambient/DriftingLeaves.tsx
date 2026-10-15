import React from 'react';
import { motion } from 'framer-motion';
import { useAmbient } from './useAmbient';

interface LeafSpec {
  x: number;
  y: number;
  size: number;
  rotate: number;
  shape: 'leaf' | 'sprig' | 'curry';
  duration: number;
}

interface DriftingLeavesProps {
  leaves: LeafSpec[];
  color?: string;
  opacity?: number;
  className?: string;
}

function LeafShape({ shape, color }: {shape: LeafSpec['shape'];color: string;}) {
  if (shape === 'sprig') {
    return (
      <svg viewBox="0 0 60 100" className="h-full w-full" fill={color}>
        <path d="M30 98 C30 70 31 40 30 4" stroke={color} strokeWidth="1.4" fill="none" />
        {[18, 34, 50, 66].map((y, i) =>
        <g key={y}>
            <path d={`M30 ${y + 8} C ${18 - i} ${y + 4}, ${10 - i} ${y - 6}, ${12} ${y - 10} C ${22} ${y - 8}, ${29} ${y}, 30 ${y + 8} Z`} />
            <path d={`M30 ${y + 12} C ${42 + i} ${y + 8}, ${50 + i} ${y - 2}, ${48} ${y - 6} C ${38} ${y - 4}, ${31} ${y + 4}, 30 ${y + 12} Z`} />
          </g>
        )}
      </svg>);

  }
  if (shape === 'curry') {
    return (
      <svg viewBox="0 0 80 60" className="h-full w-full" fill={color}>
        <path d="M4 56 C 30 40, 50 24, 76 4" stroke={color} strokeWidth="1.2" fill="none" />
        <path d="M30 40 C 22 26, 30 14, 44 10 C 46 24, 40 36, 30 40 Z" />
        <path d="M46 28 C 50 16, 62 10, 74 12 C 70 24, 58 30, 46 28 Z" opacity="0.85" />
      </svg>);

  }
  return (
    <svg viewBox="0 0 40 80" className="h-full w-full" fill={color}>
      <path d="M20 78 C 2 58, 2 22, 20 2 C 38 22, 38 58, 20 78 Z" />
      <path d="M20 76 L20 8" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
    </svg>);

}

export function DriftingLeaves({ leaves, color = '#a7b79a', opacity = 0.35, className = '' }: DriftingLeavesProps) {
  const animate = useAmbient();
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {leaves.map((l, i) =>
      <motion.div
        key={i}
        className="absolute"
        style={{ left: `${l.x}%`, top: `${l.y}%`, width: l.size, height: l.size * 1.6, opacity, rotate: l.rotate }}
        animate={animate ? { y: [0, -24, 0], x: [0, 10, 0], rotate: [l.rotate, l.rotate + 12, l.rotate] } : undefined}
        transition={{ duration: l.duration, repeat: Infinity, ease: 'easeInOut' }}>
        
          <LeafShape shape={l.shape} color={color} />
        </motion.div>
      )}
    </div>);

}