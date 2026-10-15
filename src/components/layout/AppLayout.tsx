import React from 'react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppNav } from '../nav/AppNav';

export function AppLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  return (
    <div className="min-h-screen w-full bg-[#f4ece1] text-cocoa">
      <AppNav tone="light" />
      <motion.main key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
        {outlet}
      </motion.main>
      <footer className="border-t border-[#d8c8b0] bg-[#ede3d4] px-6 py-8 text-xs text-cocoa/75">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>DailyPlate prototype · recommendations are simulated and stored only in this browser.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-5">
            <Link to="/app/history" className="hover:underline">Meal History</Link>
            <Link to="/app/substitutions" className="hover:underline">Flavour Lab</Link>
            <Link to="/app/novelty" className="hover:underline">The DailyPlate system</Link>
            <Link to="/app/settings" className="hover:underline">Settings</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/faq" className="hover:underline">Help</Link>
            <Link to="/contact" className="hover:underline">Feedback</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}