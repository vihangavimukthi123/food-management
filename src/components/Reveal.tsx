import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

export function Reveal({ children, delay = 0, y = 18, className = '', as = 'div' }: RevealProps) {
  const props = {
    className,
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.28, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
  };
  if (as === 'li') return <motion.li {...props}>{children}</motion.li>;
  if (as === 'section') return <motion.section {...props}>{children}</motion.section>;
  if (as === 'article') return <motion.article {...props}>{children}</motion.article>;
  return <motion.div {...props}>{children}</motion.div>;
}