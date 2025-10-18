'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Defines the visual constants
const PARALLAX_SPEED = -0.15; // Image moves 15% slower (negative value for up-scroll)
const SECTION_HEIGHT = '70vh';
const DURATION = 1500; // Transition duration in milliseconds

interface ThematicInterludeProps {
  onScroll?: () => void;
}

export default function ThematicInterlude({ onScroll }: ThematicInterludeProps) {
  const interludeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle both Parallax and Visibility Check
  const handleScroll = useCallback(() => {
    if (!interludeRef.current || !imageRef.current) return;

    const rect = interludeRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 1. Visibility Check (Scroll Reveal Trigger)
    // Element is considered visible when 10% enters the screen
    if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
      setIsVisible(true);
    } else {
      // Optional: Set isVisible to false if it exits far from view
      // setIsVisible(false); 
    }

    // 2. Parallax Calculation (The Weighted Scroll)
    // Calculate the element's center offset from the viewport center
    const centerOffset = rect.top - windowHeight / 2 + rect.height / 2;
    // Calculate the translation amount
    const translateY = centerOffset * PARALLAX_SPEED;

    // Apply translation using requestAnimationFrame for performance
    requestAnimationFrame(() => {
      imageRef.current!.style.transform = `translateY(${translateY}px) scale(1.02)`; // scale(1.02) to ensure image always covers the viewport during parallax
    });
    
    if (onScroll) onScroll();
  }, [onScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // CSS variables for use in inline styles
  const transitionStyle = `transform ${DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), opacity ${DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`;

  return (
    <section 
      ref={interludeRef}
      className="relative w-full overflow-hidden bg-[#F9F9F9] pointer-events-none" // Gallery White background
      style={{ height: SECTION_HEIGHT }}
    >
      {/* The Immersive Detail Container 
        - The image itself is slightly over-scaled (1.02) and uses parallax for depth.
      */}
      <div 
        ref={imageRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] transition-opacity" // Oversized container for parallax to prevent edges showing
        style={{
          // Note: Initial transform is set by handleScroll on mount
          backgroundImage: `url('/assets/images/interlude.png')`, // Cracked earth texture
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: `opacity ${DURATION}ms ease-out`,
          opacity: isVisible ? 1 : 0.5, // Subtle fade in/out during scroll
        }}
      >
        
        {/* Aesthetic Layer 1: High Contrast & Tonal Range (Simulating deep texture) */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.2) 100%)',
            mixBlendMode: 'multiply'
          }}
        />

        {/* Aesthetic Layer 2: Monochromatic Filter (Subtle Sepia/Warmth) */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, rgba(184, 176, 168, 0.05) 0%, rgba(28, 28, 28, 0.05) 100%)', // Archive Sepia to Signature Ink
            mixBlendMode: 'overlay',
            opacity: 0.8
          }}
        />

        {/* Aesthetic Layer 3: Film Grain for Tactility */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      {/* Scroll Reveal Effect: The Intentional Horizontal Wipe 
        - Uses scaleX to cover the image, then transition to scaleX(0) when visible.
      */}
      <div 
        className="absolute inset-0 bg-[#F9F9F9]" // Gallery White wipe
        style={{
          transformOrigin: 'center',
          transition: transitionStyle,
          transform: isVisible ? 'scaleX(0)' : 'scaleX(1)',
        }}
      />
    </section>
  );
}