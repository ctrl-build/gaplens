'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import FeaturedWork from '@/components/FeaturedWork';
import StudioEthos from '@/components/StudioEthos';
import Project2 from '@/components/Project2';
import ThematicInterlude from '@/components/ThematicInterlude';
import Project3 from '@/components/Project3';
import FinalWhisper from '@/components/FinalWhisper';
import Footer from '@/components/Footer';

export default function HomePageClient() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Hero onScroll={handleScroll} />
      <Manifesto onScroll={handleScroll} />
      <FeaturedWork onScroll={handleScroll} />
      <StudioEthos onScroll={handleScroll} />
      <Project2 onScroll={handleScroll} />
      <ThematicInterlude onScroll={handleScroll} />
      <Project3 onScroll={handleScroll} />
      <FinalWhisper onScroll={handleScroll} />
      <Footer onScroll={handleScroll} />
    </div>
  );
}
