'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  isScrolled?: boolean;
}

export default function Header({ isScrolled: externalScrolled }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const navigationLinks = [
    { name: 'Archive', href: '/archive' },
    { name: 'Editorial', href: '/editorial' },
    { name: 'Studio', href: '/studio' },
    { name: 'Contact', href: '/contact' }
  ];

  const getCurrentPage = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/archive')) return 'archive';
    if (pathname.startsWith('/editorial')) return 'editorial';
    if (pathname.startsWith('/studio')) return 'studio';
    if (pathname.startsWith('/contact')) return 'contact';
    if (pathname.startsWith('/project/')) return 'archive';
    return 'home';
  };

  const currentPage = getCurrentPage();

  useEffect(() => {
    if (externalScrolled !== undefined) {
      setIsScrolled(externalScrolled);
    } else {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 100);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [externalScrolled]);

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
      {!isTouchDevice && (
        <div
          className="custom-cursor"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: isHovering ? 'translate(-50%, -50%) scale(2)' : 'translate(-50%, -50%) scale(1)'
          }}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'opacity-90' : 'opacity-100'
        }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none'
        }}
      >
        <div className="relative h-16 flex items-center justify-between px-6 lg:px-12">
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className="group relative inline-block"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span 
                className={`font-serif text-xl font-normal tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-light-grey' : 'text-signature-ink'
                }`}
                style={{ fontFamily: 'GaramondPremierPro, serif' }}
              >
                GapLens
              </span>
              
              <div 
                className="absolute bottom-0 left-0 h-px bg-whisper-grey transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ width: '100%' }}
              />
            </Link>
          </div>

          <div className="flex-1" />

          <nav className="hidden md:flex items-center space-x-8 flex-shrink-0">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${
                  currentPage === link.name.toLowerCase()
                    ? 'text-signature-ink'
                    : isScrolled 
                      ? 'text-light-grey' 
                      : 'text-whisper-grey'
                }`}
                style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span 
              className={`block w-4 h-px bg-whisper-grey transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            />
            <span 
              className={`block w-4 h-px bg-whisper-grey transition-all duration-300 mt-1 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block w-4 h-px bg-whisper-grey transition-all duration-300 mt-1 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </button>
        </div>

        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-whisper-grey" />
        )}
      </header>

      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          transform: isMobileMenuOpen ? 'perspective(1000px) rotateY(0deg)' : 'perspective(1000px) rotateY(1deg)'
        }}
      >
        <div className="flex flex-col justify-center items-center h-full space-y-12">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-serif text-4xl font-normal transition-all duration-500 ${
                currentPage === link.name.toLowerCase()
                  ? 'text-signature-ink'
                  : 'text-whisper-grey hover:text-signature-ink'
              }`}
              style={{ 
                fontFamily: 'GaramondPremierPro, serif',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 100}ms`
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
