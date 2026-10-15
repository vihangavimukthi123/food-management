import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { SafeImage } from '../SafeImage';
import { Steam } from '../ambient/Steam';
import { gallery, testimonials } from '../../data/landing';
import { recipeImages } from '../../data/images';
import { useStore } from '../../contexts/StoreContext';
import { buttonClass } from '../../utils/styles';

export function LandingGallery() {
  const { user } = useStore();
  const [lead, ...rest] = testimonials;
  return (
    <>
      <section className="bg-cream text-cocoa">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="font-display text-5xl leading-[1.02] lg:text-7xl">A gallery of <span className="italic text-terracotta">everyday beautiful.</span></h2>
            <Link to="/app/recipes" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">Open the Recipe Atelier <ArrowRightIcon className="h-4 w-4" /></Link>
          </Reveal>
          <div className="mt-14 columns-2 gap-4 lg:columns-4 lg:gap-6">
            {gallery.map((g, i) =>
            <Reveal key={g.caption} delay={i % 4 * 0.05} className="mb-4 break-inside-avoid lg:mb-6">
                <figure className="group overflow-hidden">
                  <div className="overflow-hidden">
                    <SafeImage src={g.image} alt={g.caption} className={`w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${g.tall ? 'aspect-[3/4]' : 'aspect-square'}`} />
                  </div>
                  <figcaption className="mt-2 font-display text-lg italic text-cocoa/75">{g.caption}</figcaption>
                </figure>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="grain grain-light bg-botanical text-cream">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-24 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:px-10 lg:py-32">
          <Reveal>
            <blockquote>
              <p className="font-display text-4xl leading-[1.15] lg:text-[3.4rem]">“{lead.quote}”</p>
              <footer className="mt-8 text-sm text-cream/70"><span className="font-semibold text-cream">{lead.name}</span> · {lead.role}</footer>
            </blockquote>
          </Reveal>
          <div className="flex flex-col justify-end gap-10 border-t border-cream/20 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {rest.map((t) =>
            <blockquote key={t.name}>
                <p className="font-display text-2xl leading-snug">“{t.quote}”</p>
                <footer className="mt-3 text-sm text-cream/65"><span className="font-semibold text-cream">{t.name}</span> · {t.role}</footer>
              </blockquote>
            )}
            <p className="text-xs text-cream/50">Fictional testimonials, written for this demonstration.</p>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink text-cream">
        <SafeImage src={recipeImages.chickpea} alt="" className="absolute inset-0 h-full w-full object-cover" fallbackTone="dark" />
        <div className="absolute inset-0 bg-ink/60" />
        <Steam className="absolute left-1/2 top-[18%] h-40 w-40 -translate-x-1/2" />
        <Reveal className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-6xl leading-[0.98] lg:text-8xl">Your food journey <span className="italic text-champagne">starts here.</span></h2>
          <p className="mx-auto mt-6 max-w-md text-cream/75">Create your food identity in a minute. Everything else adapts to you.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to={user ? '/app' : '/register'} className={`${buttonClass('gold')} px-8 py-4`}>Enter Your Food World <ArrowRightIcon className="h-4 w-4" /></Link>
            <Link to="/how-it-works" className={`${buttonClass('secondary', 'dark')} px-8 py-4`}>How it works</Link>
          </div>
        </Reveal>
      </section>
    </>);

}