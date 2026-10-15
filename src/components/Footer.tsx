import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const groups = [
{ title: 'Explore', links: [{ to: '/#discover', label: 'Discover' }, { to: '/how-it-works', label: 'How It Works' }, { to: '/novelty', label: 'Food Experience' }, { to: '/about', label: 'Our Philosophy' }] },
{ title: 'Your world', links: [{ to: '/register', label: 'Get Started' }, { to: '/login', label: 'Sign In' }, { to: '/app/recipes', label: 'Recipe Atelier' }, { to: '/app/kitchen', label: 'Ingredient Garden' }] },
{ title: 'Help', links: [{ to: '/faq', label: 'Help & FAQ' }, { to: '/contact', label: 'Contact & Feedback' }, { to: '/about', label: 'About DailyPlate' }] }];


export function Footer() {
  return (
    <footer className="grain grain-light bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo variant="full" tone="onDark" />
            <p className="mt-8 max-w-sm font-display text-3xl leading-tight text-cream/90">Make every day taste better.</p>
            <p className="mt-3 text-sm text-cream/55">Your food. Your goals. Your world.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {groups.map((g) =>
            <div key={g.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne/80">{g.title}</h3>
                <ul className="mt-5 space-y-3">
                  {g.links.map((l) =>
                <li key={l.label}><Link to={l.to} className="text-sm text-cream/70 transition-colors duration-150 hover:text-cream">{l.label}</Link></li>
                )}
                </ul>
              </div>
            )}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne/80">Contact</h3>
              <address className="mt-5 space-y-3 text-sm not-italic text-cream/70">
                <p>hello@dailyplate.app</p>
                <p>Colombo · Sri Lanka</p>
                <p className="flex flex-wrap gap-x-3 gap-y-1">
                  {['Instagram', 'Pinterest', 'YouTube'].map((s) =>
                  <a key={s} href="#" onClick={(e) => e.preventDefault()} className="underline decoration-cream/30 underline-offset-4 hover:text-cream">{s}</a>
                  )}
                </p>
                <p className="text-xs text-cream/40">Demonstration contact details</p>
              </address>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} DailyPlate. A design prototype — no real accounts, payments or AI services.</p>
          <p>Crafted for people who love food.</p>
        </div>
      </div>
    </footer>);

}