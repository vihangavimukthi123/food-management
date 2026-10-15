import React from 'react';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { Logo } from '../components/Logo';
import { images, recipeImages } from '../data/images';

const pillars = [
{ t: 'Mission', d: 'To make everyday food more personal, more creative and less wasteful — for anyone who loves to eat.' },
{ t: 'Vision', d: 'A world where your kitchen, your goals and your favourite flavours all speak to one another.' },
{ t: 'Philosophy', d: 'Food is an experience, not just fuel. Every ingredient has a story, and every person a food identity.' }];


const stories = [
{ t: 'Food personalisation', d: 'Your allergies are never an afterthought. Your favourites are never forgotten. DailyPlate builds every recommendation from who you are.', img: recipeImages.chickpea },
{ t: 'Kitchen creativity', d: 'A half-used bunch of gotukola, three eggs, some tomatoes — DailyPlate sees a recipe where you might see odds and ends.', img: images.kitchen },
{ t: 'Food waste reduction', d: 'Day-old bread becomes panzanella, yesterday’s rice becomes fried rice. We help you notice patterns without guilt, and without invented statistics.', img: recipeImages.panzanella },
{ t: 'The future of personal food', d: 'We imagine food tools that feel less like spreadsheets and more like a favourite cookbook that knows you — warm, beautiful and quietly intelligent.', img: images.family }];


const palette = [
{ n: 'Forest', c: '#0f231a' }, { n: 'Botanical', c: '#1d4631' }, { n: 'Sage', c: '#a7b79a' }, { n: 'Olive', c: '#6c6a3a' }, { n: 'Terracotta', c: '#c0623f' },
{ n: 'Honey', c: '#d9a441' }, { n: 'Champagne', c: '#e6d3a3' }, { n: 'Cream', c: '#f3ebdb' }, { n: 'Cocoa', c: '#24170f' }];


export function About() {
  return (
    <>
      <section className="relative flex min-h-[85svh] items-end overflow-hidden bg-ink text-cream">
        <SafeImage eager src={images.about} alt="A chef chopping fresh herbs in a sunlit kitchen" className="absolute inset-0 h-full w-full object-cover" fallbackTone="dark" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-36 lg:px-10">
          <p className="font-display text-xl italic text-champagne">About DailyPlate</p>
          <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.95] sm:text-8xl">We believe food is <span className="italic">an experience.</span></h1>
        </div>
      </section>

      <section className="grain bg-ivory text-cocoa">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:grid-cols-3 lg:px-10">
          {pillars.map((p, i) =>
          <Reveal key={p.t} delay={i * 0.05}>
              <h2 className="font-display text-xl italic text-terracotta">{p.t}</h2>
              <p className="mt-4 font-display text-3xl leading-snug">{p.d}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-cream text-cocoa">
        <div className="mx-auto max-w-[1400px] space-y-24 px-6 py-24 lg:px-10">
          {stories.map((s, i) =>
          <Reveal key={s.t} className="grid items-center gap-10 md:grid-cols-2 lg:gap-20">
              <SafeImage src={s.img} alt="" className={`aspect-[4/3] w-full object-cover ${i % 2 ? 'md:order-2' : ''}`} />
              <div>
                <h2 className="font-display text-5xl leading-tight">{s.t}</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-cocoa/70">{s.d}</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section aria-labelledby="identity" className="bg-forest text-cream">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
          <h2 id="identity" className="font-display text-5xl">The DailyPlate identity</h2>
          <p className="mt-3 max-w-xl text-cream/65">A plate seen from above, with a sprig of curry leaf crossing its rim and a single honey-gold seed — the meeting of the table and the garden.</p>
          <div className="mt-12 grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            <figure className="flex flex-col justify-between bg-forest p-8"><Logo variant="full" tone="onDark" /><figcaption className="mt-10 text-xs text-cream/50">Primary, dark backgrounds</figcaption></figure>
            <figure className="flex flex-col justify-between bg-ivory p-8 text-cocoa"><Logo variant="full" tone="onLight" /><figcaption className="mt-10 text-xs text-cocoa/50">Primary, light backgrounds</figcaption></figure>
            <figure className="flex flex-col justify-between bg-ink p-8"><Logo variant="compact" tone="onDark" /><figcaption className="mt-10 text-xs text-cream/50">Compact</figcaption></figure>
            <figure className="flex flex-col justify-between bg-cream p-8 text-cocoa"><div className="flex items-center gap-5"><Logo variant="app" /><Logo variant="mark" tone="onLight" /></div><figcaption className="mt-10 text-xs text-cocoa/50">App icon & symbol</figcaption></figure>
          </div>
          <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-9">
            {palette.map((p) =>
            <li key={p.n}>
                <span className="block aspect-square w-full ring-1 ring-cream/15" style={{ background: p.c }} />
                <span className="mt-2 block text-xs text-cream/70">{p.n}</span>
              </li>
            )}
          </ul>
          <div className="mt-12 grid gap-8 border-t border-cream/10 pt-10 md:grid-cols-2">
            <p className="font-display text-5xl">Cormorant Garamond <span className="italic">for stories</span></p>
            <p className="font-sans text-xl text-cream/80">Manrope for every button, label and number you rely on.</p>
          </div>
        </div>
      </section>
    </>);

}