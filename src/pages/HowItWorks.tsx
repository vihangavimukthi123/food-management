import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { images, recipeImages } from '../data/images';
import { buttonClass } from '../utils/styles';

const steps = [
{ t: 'Create your account', d: 'Register in a minute with your name and email. Your world is private to this browser.', img: images.auth },
{ t: 'Shape your food profile', d: 'Add your goal, favourite foods, dislikes, allergies, dietary choices and cooking ability.', img: images.profile },
{ t: 'Talk with the AI Coach', d: 'Ask what to eat, what to cook with what you have, or how to waste less. Every answer reads your profile.', img: images.coach },
{ t: 'Build a Plan, inside the coach', d: 'Six thoughtful questions — never budget or schedule — become a personal food direction.', img: recipeImages.redRiceDhal },
{ t: 'Follow My Plan', d: 'A week of five daily meals for your goal, with portions, estimated nutrition and gentle tracking.', img: images.plan },
{ t: 'Discover recipes', d: 'Browse the Recipe Atelier, save favourites and cook step by step in Cooking Mode.', img: recipeImages.shakshuka },
{ t: 'Tend My Kitchen', d: 'Keep track of ingredients and expiry dates so recipes can show what you already have.', img: images.kitchen },
{ t: 'Rescue food', d: 'Log what gets wasted, spot your own patterns and turn leftovers into dinner.', img: images.wasteBefore },
{ t: 'Keep personalising', d: 'Every change — an allergy, a saved recipe, a used ingredient — ripples through everything.', img: images.novelty }];


export function HowItWorks() {
  return (
    <>
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-36 lg:px-10">
          <h1 className="max-w-4xl font-display text-6xl leading-[0.95] sm:text-8xl">How DailyPlate <span className="italic text-champagne">works.</span></h1>
          <p className="mt-6 max-w-xl text-lg text-cream/70">Nine moments, one connected journey — from your first sign-in to a kitchen that keeps learning what you love.</p>
        </div>
      </section>
      <section className="grain bg-cream text-cocoa">
        <ol className="relative mx-auto max-w-[1200px] px-6 py-24 lg:px-10">
          <span className="absolute bottom-24 left-[39px] top-24 w-px bg-cocoa/15 lg:left-1/2" aria-hidden="true" />
          {steps.map((s, i) =>
          <Reveal as="li" key={s.t} className="relative grid gap-6 pb-20 pl-16 lg:grid-cols-2 lg:gap-24 lg:pl-0">
              <span className="absolute left-[24px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-cocoa font-display text-lg text-cream lg:left-1/2 lg:-translate-x-1/2">{i + 1}</span>
              <div className={i % 2 ? 'lg:order-2' : 'lg:text-right'}>
                <h2 className="font-display text-4xl leading-tight">{s.t}</h2>
                <p className={`mt-3 max-w-md text-cocoa/70 ${i % 2 ? '' : 'lg:ml-auto'}`}>{s.d}</p>
              </div>
              <SafeImage src={s.img} alt="" className={`aspect-[16/10] w-full object-cover ${i % 2 ? 'lg:order-1' : ''}`} />
            </Reveal>
          )}
        </ol>
        <div className="border-t border-cocoa/15">
          <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center lg:px-10">
            <p className="font-display text-4xl">Ready to begin?</p>
            <Link to="/register" className={buttonClass('primary')}>Enter your food world <ArrowRightIcon className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>);

}