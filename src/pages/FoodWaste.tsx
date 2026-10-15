import React from 'react';
import { images, recipeImages } from '../data/images';
import { BeforeAfter } from '../components/waste/BeforeAfter';
import { LeftoverTransformer } from '../components/waste/LeftoverTransformer';
import { WasteTracker } from '../components/waste/WasteTracker';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';
import { PrototypeNotice } from '../components/PrototypeNotice';

export function FoodWaste() {
  return (
    <div className="min-h-screen bg-[#f4ece1] text-cocoa">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#ebe1d1] to-[#f4ece1]">
        <DriftingLeaves color="#c0623f" opacity={0.35} leaves={[{ x: 4, y: 12, size: 50, rotate: 30, shape: 'leaf', duration: 17 }, { x: 44, y: 78, size: 70, rotate: -20, shape: 'sprig', duration: 21 }]} />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-20 pt-28 lg:grid-cols-[1fr_1.25fr] lg:px-8 lg:pt-32">
          <div>
            <p className="font-display text-xl italic text-terracotta">Food Rescue Studio</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-7xl">Give every ingredient <span className="italic text-terracotta">another chance.</span></h1>
            <p className="mt-6 max-w-md text-lg text-cocoa/75">Nothing in your kitchen should lose its possibility. Drag across the photograph — yesterday’s bread and tomatoes become today’s panzanella.</p>
            <PrototypeNotice tone="light" className="mt-8 max-w-md">Real-time pantry rescue tracking. Everything here is based on your ingredients and simulated recipe matching.</PrototypeNotice>
          </div>
          <BeforeAfter before={images.wasteBefore} after={recipeImages.panzanella} beforeAlt="Leftover bread, rice, tomatoes and a banana on a board" afterAlt="Bread and tomato panzanella salad" />
        </div>
      </section>
      <LeftoverTransformer />
      <div className="text-cocoa"><WasteTracker /></div>
    </div>);

}