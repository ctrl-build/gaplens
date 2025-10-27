'use client';

import { useState, useEffect, useRef } from 'react';

interface StudioEthosProps {
  onScroll?: () => void;
}

export default function StudioEthos({ onScroll }: StudioEthosProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedQuote, setSelectedQuote] = useState(0);
  const ethosRef = useRef<HTMLDivElement>(null);

  const quotes = [
    {
      text: "The greatest depth is found not in what we show, but in the silence we allow the eye to hold.",
      focus: "Observation"
    },
    {
      text: "Refinement is the courage to omit, leaving only the essential truth of the moment behind.",
      focus: "Restraint"
    },
    {
      text: "We are curators of the unseen—the quiet archaeology of light and feeling.",
      focus: "Process"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (ethosRef.current) {
        const rect = ethosRef.current.getBoundingClientRect();
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
      ref={ethosRef}
      className="relative w-full bg-gallery-white py-24 lg:py-32"
        style={{ backgroundColor: '#F9F9F9' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex justify-end">
          <div
            className="w-full max-w-sm lg:max-w-md"
            style={{ maxWidth: '300px' }}
          >
            <blockquote 
              className={`transition-all duration-1200 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-5'
              }`}
              style={{
                transform: isVisible 
                  ? 'translateX(0)' 
                  : 'translateX(5px)',
              }}
            >
              <p 
                className="font-serif text-xl lg:text-2xl italic text-signature-ink leading-relaxed mb-4"
                style={{ 
                  fontFamily: 'GaramondPremierPro, serif',
                  fontSize: '24px',
                  lineHeight: '1.6'
                }}
              >
                "{quotes[selectedQuote].text}"
              </p>
              
              <cite 
                className="font-sans text-xs font-medium uppercase tracking-widest text-signature-ink opacity-70"
                style={{ 
                  fontFamily: 'SuisseBPIntl, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.2em'
                }}
              >
                GAPLENS
              </cite>
            </blockquote>
          </div>
        </div>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(249, 249, 249, 0) 0%, rgba(249, 249, 249, 0.1) 50%, rgba(249, 249, 249, 0) 100%)',
          opacity: isVisible ? 0.3 : 0
        }}
      />
    </section>
  );
}
