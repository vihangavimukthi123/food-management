import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';
import { Logo } from '../Logo';
import { SafeImage } from '../SafeImage';
import { DriftingLeaves } from '../ambient/DriftingLeaves';
import { images } from '../../data/images';
import { PrototypeNotice } from '../PrototypeNotice';

interface AuthShellProps {
  title: React.ReactNode;
  subtitle: string;
  quote: string;
  children: React.ReactNode;
}

export function AuthShell({ title, subtitle, quote, children }: AuthShellProps) {
  return (
    <div className="grid min-h-screen w-full bg-cream lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-cocoa text-cream lg:block">
        <SafeImage eager src={images.auth} alt="A candlelit private dining table set for two" className="absolute inset-0 h-full w-full object-cover" fallbackTone="dark" />
        <div className="absolute inset-0 bg-cocoa/45" />
        <DriftingLeaves color="#e6d3a3" opacity={0.18} leaves={[{ x: 8, y: 14, size: 40, rotate: 20, shape: 'leaf', duration: 18 }, { x: 80, y: 60, size: 70, rotate: -30, shape: 'curry', duration: 20 }]} />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" aria-label="DailyPlate home"><Logo variant="full" tone="onDark" /></Link>
          <motion.blockquote initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className="max-w-md">
            <p className="font-display text-4xl leading-[1.12]">{quote}</p>
            <footer className="mt-5 text-sm text-cream/65">Your private culinary destination</footer>
          </motion.blockquote>
        </div>
      </aside>
      <main className="grain flex flex-col px-6 py-8 sm:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          <Link to="/" className="lg:hidden" aria-label="DailyPlate home"><Logo variant="compact" tone="onLight" /></Link>
          <Link to="/" className="ml-auto inline-flex items-center gap-1.5 text-sm text-cocoa/60 hover:text-cocoa"><ArrowLeftIcon className="h-4 w-4" />Back to DailyPlate</Link>
        </div>
        <motion.div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
          <h1 className="font-display text-5xl leading-[1.02] text-cocoa">{title}</h1>
          <p className="mt-3 text-cocoa/65">{subtitle}</p>
          <div className="mt-10">{children}</div>
        </motion.div>
        <PrototypeNotice className="mx-auto max-w-md pb-2">
          Prototype-only sign-in: accounts are stored in this browser’s localStorage and are not secure. Never use a real password.
        </PrototypeNotice>
      </main>
    </div>);

}