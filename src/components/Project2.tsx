'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Project2Props {
  onScroll?: () => void;
}

export default function Project2({ onScroll }: Project2Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const project2Ref = useRef<HTMLDivElement>(null);

  // Scroll reveal animation
  useEffect(() => {
    const handleScroll = () => {
      if (project2Ref.current) {
        const rect = project2Ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Trigger when element is 60% visible
        if (rect.top < windowHeight * 0.6 && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
      
      if (onScroll) onScroll();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  // Custom cursor tracking
  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isTouchDevice) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseEnter = () => {
      if (!isTouchDevice) {
        setIsHovering(true);
      }
    };
    const handleMouseLeave = () => {
      if (!isTouchDevice) {
        setIsHovering(false);
      }
    };

    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice]);

  return (
    <>
      {/* Custom Cursor for Image Hover */}
      {!isTouchDevice && (
        <div
          className={`fixed pointer-events-none z-50 transition-all duration-300 ${
            isImageHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)',
            width: isImageHovered ? '80px' : '20px',
            height: isImageHovered ? '80px' : '20px',
            border: '2px solid #8B7355',
            borderRadius: '50%',
            backgroundColor: 'rgba(139, 115, 85, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: '500',
            color: '#8B7355',
            fontFamily: 'SuisseBPIntl, sans-serif',
            letterSpacing: '0.1em'
          }}
        >
          {isImageHovered ? 'VIEW' : ''}
        </div>
      )}

      {/* Project 2 Section - Asymmetric Teaser */}
      <section 
        ref={project2Ref}
        className="relative w-full bg-gallery-white py-32 lg:py-48"
        style={{ backgroundColor: '#F9F9F9' }}
      >
        {/* Container with controlled white space */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative">
            {/* The Image: Right-Anchored Composition */}
            <div 
              className={`relative transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : 'opacity-0 -translate-x-12 scale-98'
              }`}
              style={{
                transform: isVisible 
                  ? 'translateX(0) scale(1)' 
                  : 'translateX(-48px) scale(0.98)',
              }}
            >
              {/* Image Container - 90% width, anchored right */}
              <Link
                href="/project/2"
                className="relative w-full max-w-5xl mx-auto lg:mr-0 block ml-auto"
                style={{ width: '90%' }}
                onMouseEnter={() => {
                  setIsImageHovered(true);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setIsImageHovered(false);
                  setIsHovering(false);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsTransitioning(true);
                  // Custom fade-to-white transition
                  setTimeout(() => {
                    window.location.href = '/project/2';
                  }, 500);
                }}
              >
                {/* High-impact photograph - The Weight of Memory */}
                <div 
                  className="relative w-full h-96 lg:h-[600px] overflow-hidden bg-gradient-to-bl from-gray-800 via-gray-700 to-gray-900"
                  style={{
                    backgroundImage: `url('/assets/images/project-2.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Subtle overlay for depth and fine-art feel */}
                  <div className="absolute inset-0 bg-black opacity-5" />
                  
                  {/* Film grain overlay for tactility */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      mixBlendMode: 'overlay'
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* The Teaser Text: Bottom-Left Anchored */}
            <div 
              className={`absolute bottom-8 left-8 lg:bottom-12 lg:left-12 transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="text-left space-y-2">
                {/* Project Title */}
                <h3 
                  className="font-serif text-2xl lg:text-3xl font-medium text-signature-ink"
                  style={{ 
                    fontFamily: 'GaramondPremierPro, serif',
                    fontWeight: 500
                  }}
                >
                  The Weight of Memory
                </h3>
                
                {/* Project Link/CTA */}
                <Link
                  href="/project/2"
                  className="inline-block font-sans text-sm font-medium uppercase tracking-widest text-signature-ink transition-all duration-300 hover:text-light-grey"
                  style={{ 
                    fontFamily: 'SuisseBPIntl, sans-serif',
                    letterSpacing: '0.15em'
                  }}
                  onMouseEnter={() => setIsLinkHovered(true)}
                  onMouseLeave={() => setIsLinkHovered(false)}
                >
                  <span className="relative">
                    Explore Work
                    {/* Hover underline */}
                    <div 
                      className={`absolute bottom-0 left-0 h-px bg-archive-sepia transition-all duration-500 ${
                        isLinkHovered ? 'w-full' : 'w-0'
                      }`}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Fade-to-white transition overlay */}
        {isTransitioning && (
          <div 
            className="fixed inset-0 bg-white z-50 transition-opacity duration-500"
            style={{ opacity: 1 }}
          />
        )}
      </section>
    </>
  );
}
