'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function StudioClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set(['manifesto', 'process', 'ethos']));
  const studioRef = useRef<HTMLDivElement>(null);

  const transitionStyle = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-reveal');
            if (elementId) {
              setVisibleElements(prev => new Set([...prev, elementId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={studioRef}
      className="min-h-screen bg-gallery-white"
      style={{ backgroundColor: '#F9F9F9' }}
    >
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            data-reveal="manifesto"
            className={`font-serif text-5xl lg:text-7xl font-normal text-signature-ink mb-8 transition-all`}
            style={{ 
              fontFamily: 'GaramondPremierPro, serif', 
              letterSpacing: '0.05em',
              transition: transitionStyle,
              opacity: visibleElements.has('manifesto') ? 1 : 0, 
              transform: visibleElements.has('manifesto') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            THE MANIFESTO
          </h1>
          
          <div 
            data-reveal="manifesto-text"
            className={`max-w-3xl mx-auto transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '200ms',
              opacity: visibleElements.has('manifesto-text') ? 1 : 0, 
              transform: visibleElements.has('manifesto-text') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <p 
              className="font-serif text-xl lg:text-2xl leading-relaxed text-[#1C1C1C]"
              style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.6' }}
            >
              We believe in the power of restraint. In the spaces between light and shadow, 
              in the moments of quiet contemplation, in the architecture of silence. 
              Our work is not about what we add, but what we choose to leave out.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div 
              data-reveal="process"
              className={`transition-all`}
              style={{ 
                transition: transitionStyle, 
                transitionDelay: '300ms',
                opacity: visibleElements.has('process') ? 1 : 0, 
                transform: visibleElements.has('process') ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <h2 
                className="font-serif text-3xl lg:text-4xl font-normal text-signature-ink mb-8"
                style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
              >
                The Process
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 
                    className="font-sans text-lg font-medium uppercase tracking-widest text-signature-ink mb-3"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                  >
                    OBSERVATION
                  </h3>
                  <p 
                    className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                  >
                    We begin with deep observation, studying the interplay of light, shadow, and form. 
                    Every element is considered, every detail examined.
                  </p>
                </div>
                
                <div>
                  <h3 
                    className="font-sans text-lg font-medium uppercase tracking-widest text-signature-ink mb-3"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                  >
                    RESTRAINT
                  </h3>
                  <p 
                    className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                  >
                    The art lies in what we choose to exclude. We strip away the unnecessary, 
                    leaving only the essential elements that tell the story.
                  </p>
                </div>
                
                <div>
                  <h3 
                    className="font-sans text-lg font-medium uppercase tracking-widest text-signature-ink mb-3"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                  >
                    REVELATION
                  </h3>
                  <p 
                    className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                  >
                    Through this process of elimination, we reveal the hidden beauty that exists 
                    in the spaces between, in the quiet moments, in the architectural poetry of everyday life.
                  </p>
                </div>
              </div>
            </div>

            <div 
              data-reveal="ethos"
              className={`transition-all`}
              style={{ 
                transition: transitionStyle, 
                transitionDelay: '400ms',
                opacity: visibleElements.has('ethos') ? 1 : 0, 
                transform: visibleElements.has('ethos') ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <h2 
                className="font-serif text-3xl lg:text-4xl font-normal text-signature-ink mb-8"
                style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
              >
                The Ethos
              </h2>
              
              <div className="space-y-6">
                <blockquote 
                  className="font-serif text-lg italic text-[#1C1C1C] border-l-2 border-whisper-grey pl-6"
                  style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.6' }}
                >
                  "In the silence between heartbeats, in the pause between breaths, 
                  in the space between light and shadow—there lies the true essence of beauty."
                </blockquote>
                
                <p 
                  className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                  style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                >
                  Our work is guided by a deep respect for the power of negative space, 
                  the importance of restraint, and the belief that true beauty emerges 
                  not from addition, but from careful subtraction.
                </p>
                
                <p 
                  className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                  style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                >
                  We are not documentarians of the world as it is, but interpreters 
                  of the world as it could be—stripped of noise, focused on essence, 
                  dedicated to the poetry of the minimal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            data-reveal="philosophy"
            className={`transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '500ms',
              opacity: visibleElements.has('philosophy') ? 1 : 0, 
              transform: visibleElements.has('philosophy') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <h2 
              className="font-serif text-3xl lg:text-4xl font-normal text-signature-ink mb-8"
              style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
            >
              The Philosophy
            </h2>
            
            <p 
              className="font-serif text-xl lg:text-2xl leading-relaxed text-[#1C1C1C] mb-12"
              style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.6' }}
            >
              We believe that photography is not about capturing what is, 
              but about revealing what could be. It is about finding the extraordinary 
              in the ordinary, the profound in the simple, the infinite in the finite.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link
                href="/archive"
                className="font-sans text-sm font-medium uppercase tracking-widest text-whisper-grey hover:text-signature-ink transition-colors duration-300"
                style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
              >
                VIEW OUR WORK
              </Link>
              <span 
                className="font-sans text-sm text-whisper-grey hidden sm:block"
                style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
              >
                /
              </span>
              <Link
                href="/contact"
                className="font-sans text-sm font-medium uppercase tracking-widest text-whisper-grey hover:text-signature-ink transition-colors duration-300"
                style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
              >
                START A CONVERSATION
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer onScroll={handleScroll} />
    </div>
  );
}
