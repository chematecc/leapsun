'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import VisionTimeline from '@/components/sections/VisionTimeline';
import InsightsSection from '@/components/sections/InsightsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <PortfolioSection />
      <VisionTimeline />
      <InsightsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
