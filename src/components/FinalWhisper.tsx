'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface FinalWhisperProps {
  onScroll?: () => void;
}

export default function FinalWhisper({ onScroll }: FinalWhisperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
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

  useEffect(() => {
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
      {!isTouchDevice && (
        <div
          className={`fixed pointer-events-none z-50 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)',
            width: isHovered ? '80px' : '20px',
            height: isHovered ? '80px' : '20px',
            border: '2px solid #B8B0A8', // Archive Sepia
            borderRadius: '50%',
            backgroundColor: 'rgba(184, 176, 168, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: '500',
            color: '#B8B0A8',
            fontFamily: 'SuisseBPIntl, sans-serif',
            letterSpacing: '0.1em'
          }}
        >
          {isHovered ? 'EMAIL' : ''}
        </div>
      )}

      <section 
        ref={ctaRef}
        className="relative w-full bg-gallery-white py-24 lg:py-32"
        style={{ backgroundColor: '#F9F9F9' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex justify-center">
            <div 
              className={`transition-all duration-1500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transform: isVisible 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(32px) scale(0.98)',
              }}
            >
              <Link
                href="/contact"
                className="group relative inline-block"
                onMouseEnter={() => {
                  setIsHovered(true);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setIsHovering(false);
                }}
              >
                <span 
                  className="font-sans text-lg sm:text-xl lg:text-2xl font-bold text-signature-ink transition-all duration-300 whitespace-nowrap"
                  style={{ 
                    fontFamily: 'SuisseBPIntl, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    wordSpacing: '0.15em',
                    lineHeight: '1.2'
                  }}
                >
                  INITIATE A PRIVATE INQUIRY
                </span>
                
                <div 
                  className={`absolute bottom-0 left-0 h-px bg-archive-sepia transition-all duration-1000 ${
                    isHovered ? 'w-0' : 'w-full'
                  }`}
                  style={{
                    backgroundColor: '#B8B0A8',
                    transform: isHovered ? 'scaleX(0)' : 'scaleX(1)',
                    transformOrigin: 'center'
                  }}
                />
              </Link>
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
    </>
  );
}
