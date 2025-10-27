'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const PARALLAX_SPEED = -0.15;
const SECTION_HEIGHT = '70vh';
const DURATION = 1500;

interface ThematicInterludeProps {
  onScroll?: () => void;
}

export default function ThematicInterlude({ onScroll }: ThematicInterludeProps) {
  const interludeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (!interludeRef.current || !imageRef.current) return;

    const rect = interludeRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
      setIsVisible(true);
    }

    const centerOffset = rect.top - windowHeight / 2 + rect.height / 2;
    const translateY = centerOffset * PARALLAX_SPEED;

    requestAnimationFrame(() => {
      imageRef.current!.style.transform = `translateY(${translateY}px) scale(1.02)`;
    });
    
    if (onScroll) onScroll();
  }, [onScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const transitionStyle = `transform ${DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), opacity ${DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`;

  return (
    <section 
      ref={interludeRef}
      className="relative w-full overflow-hidden bg-[#F9F9F9] pointer-events-none"
      style={{ height: SECTION_HEIGHT }}
    >
      <div 
        ref={imageRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] transition-opacity"
        style={{
          backgroundImage: `url('/assets/images/interlude.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: `opacity ${DURATION}ms ease-out`,
          opacity: isVisible ? 1 : 0.5,
        }}
      >
        
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.2) 100%)',
            mixBlendMode: 'multiply'
          }}
        />

        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, rgba(184, 176, 168, 0.05) 0%, rgba(28, 28, 28, 0.05) 100%)',
            mixBlendMode: 'overlay',
            opacity: 0.8
          }}
        />

        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      <div 
        className="absolute inset-0 bg-[#F9F9F9]"
        style={{
          transformOrigin: 'center',
          transition: transitionStyle,
          transform: isVisible ? 'scaleX(0)' : 'scaleX(1)',
        }}
      />
    </section>
  );
}