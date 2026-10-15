import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpIcon, SproutIcon } from 'lucide-react';
import { SpiceDust } from '../ambient/SpiceDust';

const quick = ['What can I prepare using my ingredients?', 'Suggest a healthy breakfast', 'Give me healthy snack ideas'];

export function CoachQuickAsk() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const go = (prompt: string) => navigate('/app/coach', { state: { prompt } });

  return (
    <section aria-labelledby="coach-quick" className="relative overflow-hidden bg-forest p-8 text-cream lg:p-10">
      <SpiceDust count={14} color="#e6d3a3" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne/15"><SproutIcon className="h-5 w-5 text-champagne" /></span>
          <h2 id="coach-quick" className="font-display text-3xl">Ask your coach</h2>
        </div>
        <form
          className="mt-6 flex items-center gap-2 border-b border-cream/25 pb-2 focus-within:border-champagne"
          onSubmit={(e) => {e.preventDefault();if (q.trim()) go(q.trim());}}>
          
          <label htmlFor="quick-ask" className="sr-only">Ask the DailyPlate Coach</label>
          <input id="quick-ask" value={q} onChange={(e) => setQ(e.target.value)} placeholder="What should I cook tonight?" className="flex-1 bg-transparent py-2 font-display text-xl text-cream placeholder:text-cream/40 focus:outline-none" />
          <button type="submit" aria-label="Ask" disabled={!q.trim()} className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne text-forest transition-opacity duration-150 disabled:opacity-40">
            <ArrowUpIcon className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-5 flex flex-wrap gap-2">
          {quick.map((s) =>
          <button key={s} type="button" onClick={() => go(s)} className="rounded-full border border-cream/20 px-3.5 py-1.5 text-xs text-cream/80 transition-colors duration-150 hover:border-cream/60 hover:text-cream">{s}</button>
          )}
        </div>
      </div>
    </section>);

}