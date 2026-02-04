import { HeroSection } from "./components/hero-section";
import { WhatWeDoSection } from "./components/what-we-do-section";
import { StatsSection } from "./components/stats-section";
import { JuniorEnterpriseSection } from "./components/junior-enterprise-section";
import { AlumniSpotlightSection } from "./components/alumni-spotlight-section";
import { PartnersSection } from "./components/partners-section";
import { SponsorsSection } from "./components/sponsors-section";

export default function Page() {
  return (
    <>
      <HeroSection />
      <WhatWeDoSection />
      <StatsSection />
      <JuniorEnterpriseSection />
      <AlumniSpotlightSection />
      <PartnersSection />
      <SponsorsSection />
    </>
  );
}
