import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Logo } from '../Logo';
import { useStore } from '../../contexts/StoreContext';

const links = [
{ to: '/#discover', label: 'Discover' },
{ to: '/how-it-works', label: 'How It Works' },
{ to: '/novelty', label: 'Food Experience' },
{ to: '/about', label: 'Our Philosophy' }];


export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding] duration-300 ease-out ${scrolled ? 'bg-ink/85 py-3 backdrop-blur-md' : 'bg-transparent py-6'}`}>
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10" aria-label="Main">
        <Link to="/" aria-label="DailyPlate home"><Logo variant={scrolled ? 'compact' : 'full'} tone="onDark" /></Link>
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) =>
          <li key={l.to}>
              <NavLink to={l.to} className="text-sm font-medium text-cream/80 transition-colors duration-150 hover:text-cream">{l.label}</NavLink>
            </li>
          )}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          {user ?
          <Link to="/app" className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-forest transition-colors duration-150 hover:bg-champagne">Enter my world</Link> :

          <>
              <Link to="/login" className="px-3 py-2 text-sm font-medium text-cream/85 transition-colors duration-150 hover:text-cream">Sign In</Link>
              <Link to="/register" className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-forest transition-colors duration-150 hover:bg-champagne">Get Started</Link>
            </>
          }
        </div>
        <button type="button" className="rounded-full p-2 text-cream lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <MenuIcon className="h-6 w-6" />
        </button>
      </nav>
      <AnimatePresence>
        {open &&
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-forest px-6 py-6 text-cream lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          
            <div className="flex items-center justify-between">
              <Logo variant="compact" tone="onDark" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2"><XIcon className="h-6 w-6" /></button>
            </div>
            <ul className="mt-14 space-y-5">
              {links.map((l, i) =>
            <motion.li key={l.to} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.22 }}>
                  <Link to={l.to} onClick={() => setOpen(false)} className="font-display text-4xl">{l.label}</Link>
                </motion.li>
            )}
            </ul>
            <div className="mt-auto grid gap-3">
              {user ?
            <Link to="/app" onClick={() => setOpen(false)} className="rounded-full bg-cream py-3.5 text-center font-semibold text-forest">Enter my world</Link> :

            <>
                  <Link to="/register" onClick={() => setOpen(false)} className="rounded-full bg-cream py-3.5 text-center font-semibold text-forest">Get Started</Link>
                  <Link to="/login" onClick={() => setOpen(false)} className="rounded-full border border-cream/30 py-3.5 text-center font-semibold">Sign In</Link>
                </>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}