import React from 'react';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingPhilosophy } from '../components/landing/LandingPhilosophy';
import { LandingWorlds } from '../components/landing/LandingWorlds';
import { LandingPersonal } from '../components/landing/LandingPersonal';
import { LandingPlanning } from '../components/landing/LandingPlanning';
import { LandingKitchen } from '../components/landing/LandingKitchen';
import { LandingDifference } from '../components/landing/LandingDifference';
import { LandingGallery } from '../components/landing/LandingGallery';

export function Landing() {
  return (
    <>
      <LandingHero />
      <LandingPhilosophy />
      <LandingWorlds />
      <LandingPersonal />
      <LandingPlanning />
      <LandingKitchen />
      <LandingDifference />
      <LandingGallery />
    </>);

}