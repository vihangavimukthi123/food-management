import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { faqGroups } from '../data/faq';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';

export function Faq() {
  const [open, setOpen] = useState<string | null>(faqGroups[0].items[0].q);
  const [q, setQ] = useState('');
  const s = q.trim().toLowerCase();
  const groups = faqGroups.map((g) => ({ ...g, items: g.items.filter((i) => !s || i.q.toLowerCase().includes(s) || i.a.toLowerCase().includes(s)) })).filter((g) => g.items.length);

  return (
    <>
      <section className="relative overflow-hidden bg-botanical text-cream">
        <DriftingLeaves color="#a7b79a" opacity={0.2} leaves={[{ x: 82, y: 30, size: 70, rotate: -25, shape: 'sprig', duration: 19 }]} />
        <div className="relative mx-auto max-w-[1100px] px-6 pb-16 pt-36 lg:px-10">
          <h1 className="font-display text-6xl leading-[0.95] sm:text-7xl">Questions, <span className="italic text-champagne">answered.</span></h1>
          <div className="mt-10 flex max-w-xl items-center gap-3 border-b border-cream/30 pb-1 focus-within:border-champagne">
            <SearchIcon className="h-4 w-4 text-cream/60" aria-hidden="true" />
            <label htmlFor="faq-search" className="sr-only">Search questions</label>
            <input id="faq-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for allergies, plans, pantry…" className="flex-1 bg-transparent py-2 font-display text-xl placeholder:text-cream/40 focus:outline-none" />
          </div>
        </div>
      </section>
      <section className="grain bg-ivory text-cocoa">
        <div className="mx-auto max-w-[1100px] px-6 py-20 lg:px-10">
          {groups.length ? groups.map((g) =>
          <div key={g.topic} className="grid gap-6 border-t border-cocoa/15 py-10 md:grid-cols-[240px_1fr]">
              <h2 className="font-display text-3xl">{g.topic}</h2>
              <ul className="divide-y divide-cocoa/10">
                {g.items.map((item) => {
                const isOpen = open === item.q;
                const id = `faq-${item.q.replace(/\W+/g, '-').toLowerCase()}`;
                return (
                  <li key={item.q}>
                      <h3>
                        <button type="button" onClick={() => setOpen(isOpen ? null : item.q)} aria-expanded={isOpen} aria-controls={id} className="flex w-full items-start justify-between gap-6 py-5 text-left">
                          <span className="font-display text-2xl leading-snug">{item.q}</span>
                          <PlusIcon className={`mt-1.5 h-5 w-5 shrink-0 transition-transform duration-200 ease-out ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true" />
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen &&
                      <motion.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden">
                            <p className="max-w-2xl pb-6 leading-relaxed text-cocoa/70">{item.a}</p>
                          </motion.div>
                      }
                      </AnimatePresence>
                    </li>);

              })}
              </ul>
            </div>
          ) : <p className="py-16 text-center font-display text-3xl">No questions match “{q}”.</p>}
          <p className="mt-12 border-t border-cocoa/15 pt-8 text-cocoa/70">Still curious? <Link to="/contact" className="font-semibold text-cocoa underline">Send us a note</Link>.</p>
        </div>
      </section>
    </>);

}