import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PublicNav } from '../nav/PublicNav';
import { Footer } from '../Footer';

export function PublicLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  return (
    <div className="min-h-screen w-full bg-[#f4ece1] text-[#24170f]">
      <PublicNav />
      <motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
        {outlet}
      </motion.main>
      <Footer />
    </div>);

}