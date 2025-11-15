'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface FooterProps {
  onScroll?: () => void;
}

export default function Footer({ onScroll }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
      
      if (onScroll) onScroll();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-gallery-white"
      style={{       backgroundColor: '#F9F9F9' }}
    >
      <div className="py-24 lg:py-32" />
      
      <div
        className={`transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div         className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-4 sm:space-y-0">
            <div className="flex-shrink-0 text-center sm:text-left">
              <p 
                className="font-sans text-xs text-whisper-grey"
                style={{ 
                  fontFamily: 'SuisseBPIntl, sans-serif',
                  fontSize: '11px',
                  lineHeight: '1.4'
                }}
              >
                © 2025 GAPLENS STUDIO / ALL RIGHTS RESERVED
              </p>
              <p 
                className="font-sans text-xs text-whisper-grey mt-1"
                style={{ 
                  fontFamily: 'SuisseBPIntl, sans-serif',
                  fontSize: '10px',
                  lineHeight: '1.4'
                }}
              >
                DESIGNED & DEVELOPED BY{' '}
                <Link
                  href="https://monk.haus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-signature-ink transition-colors duration-200"
                >
                  monk
                </Link>
              </p>
            </div>

            <div className="flex-shrink-0">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <Link
                  href="https://instagram.com/gaplens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  onMouseEnter={() => setHoveredLink('instagram')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span 
                    className={`font-sans text-xs transition-colors duration-200 ${
                      hoveredLink === 'instagram' ? 'text-signature-ink' : 'text-whisper-grey'
                    }`}
                    style={{ 
                      fontFamily: 'SuisseBPIntl, sans-serif',
                      fontSize: '11px',
                      lineHeight: '1.4'
                    }}
                  >
                    INSTAGRAM
                  </span>
                  
                  <div 
                    className={`absolute inset-0 border border-archive-sepia transition-all duration-150 ${
                      hoveredLink === 'instagram' ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      borderColor: '#B8B0A8',
                      borderWidth: '1px',
                      transform: hoveredLink === 'instagram' ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                </Link>

                <span 
                  className="font-sans text-xs text-whisper-grey"
                  style={{ 
                    fontFamily: 'SuisseBPIntl, sans-serif',
                    fontSize: '11px'
                  }}
                >
                  /
                </span>

                <Link
                  href="https://linkedin.com/company/gaplens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  onMouseEnter={() => setHoveredLink('linkedin')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span 
                    className={`font-sans text-xs transition-colors duration-200 ${
                      hoveredLink === 'linkedin' ? 'text-signature-ink' : 'text-whisper-grey'
                    }`}
                    style={{ 
                      fontFamily: 'SuisseBPIntl, sans-serif',
                      fontSize: '11px',
                      lineHeight: '1.4'
                    }}
                  >
                    LINKEDIN
                  </span>
                  
                  <div 
                    className={`absolute inset-0 border border-archive-sepia transition-all duration-150 ${
                      hoveredLink === 'linkedin' ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      borderColor: '#B8B0A8',
                      borderWidth: '1px',
                      transform: hoveredLink === 'linkedin' ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                </Link>

                <span
                  className="font-sans text-xs text-whisper-grey"
                  style={{ 
                    fontFamily: 'SuisseBPIntl, sans-serif',
                    fontSize: '11px'
                  }}
                >
                  /
                </span>

                <Link
                  href="/terms"
                  className="group relative"
                  onMouseEnter={() => setHoveredLink('terms')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span 
                    className={`font-sans text-xs transition-colors duration-200 ${
                      hoveredLink === 'terms' ? 'text-signature-ink' : 'text-whisper-grey'
                    }`}
                    style={{ 
                      fontFamily: 'SuisseBPIntl, sans-serif',
                      fontSize: '11px',
                      lineHeight: '1.4'
                    }}
                  >
                    TERMS
                  </span>
                  
                  <div 
                    className={`absolute inset-0 border border-archive-sepia transition-all duration-150 ${
                      hoveredLink === 'terms' ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      borderColor: '#B8B0A8',
                      borderWidth: '1px',
                      transform: hoveredLink === 'terms' ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
