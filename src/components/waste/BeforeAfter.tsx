import React, { useState } from 'react';
import { SafeImage } from '../SafeImage';

interface Props {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

export function BeforeAfter({ before, after, beforeAlt, afterAlt }: Props) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden">
      <SafeImage eager src={after} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SafeImage eager src={before} alt={beforeAlt} className="h-full w-full object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-cream" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-xs font-bold text-cocoa shadow-lg">⇆</span>
      </div>
      <span className="pointer-events-none absolute left-4 top-4 bg-cocoa/80 px-3 py-1 font-display text-lg italic text-cream">Before</span>
      <span className="pointer-events-none absolute right-4 top-4 bg-cream/90 px-3 py-1 font-display text-lg italic text-cocoa">After</span>
      <label htmlFor="ba-range" className="sr-only">Compare before and after</label>
      <input id="ba-range" type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>);

}