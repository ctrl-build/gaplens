'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function EditorialClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set(['title', 'intro', 'article-1']));
  const editorialRef = useRef<HTMLDivElement>(null);

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

  const articles = [
    {
      id: '1',
      title: 'The Architecture of Silence',
      excerpt: 'Exploring the relationship between brutalist architecture and the spaces of contemplation in urban environments.',
      date: 'December 2024',
      category: 'Architectural Study',
      image: '/assets/images/projects/project-1/1-1.png',
      slug: 'architecture-of-silence'
    }
  ];

  return (
    <div 
      ref={editorialRef}
      className="min-h-screen bg-gallery-white"
      style={{ backgroundColor: '#F9F9F9' }}
    >
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            data-reveal="title"
            className={`font-serif text-5xl lg:text-7xl font-normal text-signature-ink mb-8 transition-all`}
            style={{ 
              fontFamily: 'GaramondPremierPro, serif', 
              letterSpacing: '0.05em',
              transition: transitionStyle,
              opacity: visibleElements.has('title') ? 1 : 0, 
              transform: visibleElements.has('title') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            THE EDITORIAL
          </h1>
          
          <div 
            data-reveal="intro"
            className={`max-w-2xl mx-auto transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '200ms',
              opacity: visibleElements.has('intro') ? 1 : 0, 
              transform: visibleElements.has('intro') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <p 
              className="font-serif text-lg lg:text-xl leading-relaxed text-[#1C1C1C]"
              style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.6' }}
            >
              Thoughts on the process, philosophy, and practice of fine art photography. 
              A collection of essays exploring the spaces between light and shadow.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16 lg:space-y-24">
            {articles.map((article, index) => (
              <article 
                key={article.id}
                data-reveal={`article-${article.id}`}
                className={`group transition-all`}
                style={{ 
                  transition: transitionStyle, 
                  transitionDelay: `${300 + (index * 100)}ms`,
                  opacity: visibleElements.has(`article-${article.id}`) ? 1 : 0, 
                  transform: visibleElements.has(`article-${article.id}`) ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                <Link href={`/editorial/${article.slug}`} className="block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="order-2 lg:order-1">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <span 
                            className="font-sans text-xs uppercase tracking-widest text-whisper-grey"
                            style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                          >
                            {article.category}
                          </span>
                          <span 
                            className="font-sans text-xs text-whisper-grey"
                            style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
                          >
                            /
                          </span>
                          <span 
                            className="font-sans text-xs uppercase tracking-widest text-whisper-grey"
                            style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                          >
                            {article.date}
                          </span>
                        </div>
                        
                        <h2 
                          className="font-serif text-3xl lg:text-4xl font-normal text-signature-ink group-hover:text-whisper-grey transition-colors duration-300"
                          style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
                        >
                          {article.title}
                        </h2>
                        
                        <p 
                          className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                          style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                        >
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-2 text-whisper-grey group-hover:text-signature-ink transition-colors duration-300">
                          <span 
                            className="font-sans text-sm font-medium uppercase tracking-widest"
                            style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                          >
                            READ ARTICLE
                          </span>
                          <span 
                            className="font-sans text-sm"
                            style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="order-1 lg:order-2">
                      <div 
                        className="relative w-full h-64 lg:h-80 overflow-hidden"
                        style={{
                          backgroundImage: `url('${article.image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        <div 
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            mixBlendMode: 'overlay'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            data-reveal="cta"
            className={`transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '600ms',
              opacity: visibleElements.has('cta') ? 1 : 0, 
              transform: visibleElements.has('cta') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <h2 
              className="font-serif text-2xl lg:text-3xl font-normal text-signature-ink mb-8"
              style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
            >
              More Thoughts Coming Soon
            </h2>
            
            <p 
              className="font-sans text-base leading-relaxed text-[#1C1C1C] mb-12"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
            >
              We're constantly exploring new ideas and perspectives on fine art photography. 
              Check back regularly for new editorial content.
            </p>
            
            <Link
              href="/archive"
              className="font-sans text-sm font-medium uppercase tracking-widest text-whisper-grey hover:text-signature-ink transition-colors duration-300"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              EXPLORE OUR WORK
            </Link>
          </div>
        </div>
      </section>

      <Footer onScroll={handleScroll} />
    </div>
  );
}
