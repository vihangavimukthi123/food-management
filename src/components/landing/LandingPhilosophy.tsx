import React from 'react';
import { Reveal } from '../Reveal';
import { SafeImage } from '../SafeImage';
import { DriftingLeaves } from '../ambient/DriftingLeaves';
import { principles } from '../../data/landing';
import { images } from '../../data/images';

export function LandingPhilosophy() {
  return (
    <section id="discover" className="relative grain scroll-mt-16 bg-[#f4ece0] text-cocoa overflow-hidden">
      <DriftingLeaves
        color="#5f8a4a"
        opacity={0.3}
        leaves={[
          { x: 92, y: 15, size: 70, rotate: -25, shape: 'sprig', duration: 20 },
          { x: 5, y: 75, size: 45, rotate: 35, shape: 'curry', duration: 16 }
        ]}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
          <Reveal>
            <p className="font-display text-xl italic text-terracotta">The DailyPlate philosophy</p>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-[5.2rem] text-forest font-bold">
              Food is an experience, <span className="italic text-botanical font-normal">not just something we eat.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cocoa/75">
              DailyPlate brings together what you love to eat, what your body needs, what is already in your kitchen and what you might discover next — so that planning food feels less like a chore, and more like a pleasure.
            </p>
          </Reveal>
          <ol className="divide-y divide-[#d8c8b0] border-y border-[#d8c8b0]">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} className="py-7">
                <h3 className="font-display text-2xl font-bold text-forest">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-cocoa/70">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="mt-20 lg:mt-28">
          <figure className="relative rounded-2xl overflow-hidden shadow-sm border border-[#d8c8b0]">
            <SafeImage
              src={images.family}
              alt="A Sri Lankan rice and curry spread on banana leaves with hands reaching in to share"
              className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[560px]"
            />
            <figcaption className="bg-[#faf5eb] p-4 flex flex-col justify-between gap-2 text-sm text-cocoa/70 sm:flex-row border-t border-[#d8c8b0]">
              <span className="font-display text-lg italic text-forest font-bold">
                A table of rice and curry — every dish its own story.
              </span>
              <span className="font-medium text-xs text-cocoa/60">Red rice · parippu · wattakka · gotukola · papadum</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}