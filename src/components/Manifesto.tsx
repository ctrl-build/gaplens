'use client';

import { useState, useEffect, useRef } from 'react';

interface ManifestoProps {
  onScroll?: () => void;
}

export default function Manifesto({ onScroll }: ManifestoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      
      if (manifestoRef.current) {
        const rect = manifestoRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
      
      if (onScroll) onScroll();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  return (
    <section 
      ref={manifestoRef}
      className="relative min-h-screen w-full bg-gallery-white flex items-center justify-center"
        style={{ backgroundColor: '#F9F9F9' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-32 lg:py-48">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{
            transform: isVisible 
              ? 'translateY(0) scale(1)' 
              : `translateY(${scrollY * 0.1}px) scale(0.95)`,
          }}
        >
          <h1 
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-normal text-signature-ink"
            style={{ 
              fontFamily: 'GaramondPremierPro, serif',
              lineHeight: '1.15',
              letterSpacing: '0.08em',
              wordSpacing: '0.25em',
              maxWidth: '100%',
              fontWeight: 400
            }}
          >
            <span className="block mb-4">Fine Art Photography: We Capture The Space</span>
            <span className="block mb-4">Between The Light</span>
            <span className="block">And The Shadow</span>
          </h1>
        </div>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(249, 249, 249, 0) 0%, rgba(249, 249, 249, 0.3) 50%, rgba(249, 249, 249, 0) 100%)',
          opacity: isVisible ? 0.3 : 0
        }}
      />
    </section>
  );
}
