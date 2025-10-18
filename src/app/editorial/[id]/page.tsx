'use client';

import { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  content: {
    introduction: string;
    sections: Array<{
      heading?: string;
      content: string;
      image?: string;
      caption?: string;
    }>;
    conclusion: string;
  };
}

const getArticleData = (id: string): Article => {
  const articles: Record<string, Article> = {
    '1': {
      id: '1',
      title: 'The Architecture of Silence',
      date: 'December 2024',
      category: 'Architectural Study',
      author: 'GapLens Studio',
      readTime: '8 min read',
      content: {
        introduction: 'In the spaces between light and shadow, we find the true essence of architectural poetry. This exploration of brutalist architecture reveals the hidden narratives embedded within concrete forms.',
        sections: [
          {
            heading: 'The Weight of Concrete',
            content: 'Brutalist architecture speaks through its materiality. The raw, unadorned concrete becomes a canvas for light and shadow, creating moments of profound beauty in the most unexpected places.',
            image: '/assets/images/projects/project-1/1-1.png',
            caption: 'The interplay of light and shadow on concrete surfaces'
          },
          {
            heading: 'Geometric Poetry',
            content: 'The geometric forms of brutalist structures create a visual rhythm that echoes through the urban landscape. Each angle, each line, tells a story of function meeting form in perfect harmony.',
            image: '/assets/images/projects/project-1/1-2.png',
            caption: 'Geometric patterns emerging from architectural forms'
          },
          {
            heading: 'The Silence Between',
            content: 'In the quiet moments between the noise of the city, these structures stand as monuments to the power of restraint. They remind us that beauty often lies not in what we add, but in what we choose to leave out.',
            image: '/assets/images/projects/project-1/1-3.png',
            caption: 'The contemplative spaces within architectural forms'
          }
        ],
        conclusion: 'Architecture, at its finest, is not about the building itself, but about the spaces it creates. In the silence between light and shadow, we find the true essence of architectural poetry.'
      }
    },
    'architecture-of-silence': {
      id: '1',
      title: 'The Architecture of Silence',
      date: 'December 2024',
      category: 'Architectural Study',
      author: 'GapLens Studio',
      readTime: '8 min read',
      content: {
        introduction: 'In the spaces between light and shadow, we find the true essence of architectural poetry. This exploration of brutalist architecture reveals the hidden narratives embedded within concrete forms.',
        sections: [
          {
            heading: 'The Weight of Concrete',
            content: 'Brutalist architecture speaks through its materiality. The raw, unadorned concrete becomes a canvas for light and shadow, creating moments of profound beauty in the most unexpected places.',
            image: '/assets/images/projects/project-1/1-1.png',
            caption: 'The interplay of light and shadow on concrete surfaces'
          },
          {
            heading: 'Geometric Poetry',
            content: 'The geometric forms of brutalist structures create a visual rhythm that echoes through the urban landscape. Each angle, each line, tells a story of function meeting form in perfect harmony.',
            image: '/assets/images/projects/project-1/1-2.png',
            caption: 'Geometric patterns emerging from architectural forms'
          },
          {
            heading: 'The Silence Between',
            content: 'In the quiet moments between the noise of the city, these structures stand as monuments to the power of restraint. They remind us that beauty often lies not in what we add, but in what we choose to leave out.',
            image: '/assets/images/projects/project-1/1-3.png',
            caption: 'The contemplative spaces within architectural forms'
          }
        ],
        conclusion: 'Architecture, at its finest, is not about the building itself, but about the spaces it creates. In the silence between light and shadow, we find the true essence of architectural poetry.'
      }
    }
  };

  return articles[id] || articles['1'];
};

export default function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const article = getArticleData(resolvedParams.id);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set(['article-title', 'article-meta', 'article-intro']));
  const [isScrolled, setIsScrolled] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

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
      ref={articleRef}
      className="min-h-screen bg-gallery-white"
      style={{ backgroundColor: '#F9F9F9' }}
    >
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            data-reveal="article-title"
            className={`font-serif text-5xl lg:text-7xl font-normal text-signature-ink mb-8 transition-all`}
            style={{ 
              fontFamily: 'GaramondPremierPro, serif', 
              letterSpacing: '0.05em',
              transition: transitionStyle,
              opacity: visibleElements.has('article-title') ? 1 : 0, 
              transform: visibleElements.has('article-title') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            {article.title}
          </h1>
          
          <div 
            data-reveal="article-meta"
            className={`flex flex-col sm:flex-row sm:items-center justify-center gap-2 sm:gap-4 mb-16 transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '200ms',
              opacity: visibleElements.has('article-meta') ? 1 : 0, 
              transform: visibleElements.has('article-meta') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <p 
              className="font-sans text-xs text-whisper-grey uppercase"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              {article.category}
            </p>
            <span 
              className="font-sans text-xs text-whisper-grey hidden sm:block"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
            >
              /
            </span>
            <p 
              className="font-sans text-xs text-whisper-grey uppercase"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              {article.date}
            </p>
            <span 
              className="font-sans text-xs text-whisper-grey hidden sm:block"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
            >
              /
            </span>
            <p 
              className="font-sans text-xs text-whisper-grey uppercase"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              {article.readTime}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div 
            data-reveal="article-intro"
            className={`mb-16 transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '300ms',
              opacity: visibleElements.has('article-intro') ? 1 : 0, 
              transform: visibleElements.has('article-intro') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <p 
              className="font-serif text-xl lg:text-2xl leading-relaxed text-[#1C1C1C]"
              style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.6' }}
            >
              {article.content.introduction}
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {article.content.sections.map((section, index) => (
              <div 
                key={index}
                data-reveal={`section-${index}`}
                className={`transition-all`}
                style={{ 
                  transition: transitionStyle, 
                  transitionDelay: `${400 + (index * 100)}ms`,
                  opacity: visibleElements.has(`section-${index}`) ? 1 : 0, 
                  transform: visibleElements.has(`section-${index}`) ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                {section.heading && (
                  <h2 
                    className="font-serif text-3xl lg:text-4xl font-normal text-signature-ink mb-8"
                    style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
                  >
                    {section.heading}
                  </h2>
                )}
                
                <p 
                  className="font-sans text-base lg:text-lg leading-relaxed text-[#1C1C1C] mb-8"
                  style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                >
                  {section.content}
                </p>
                
                {section.image && (
                  <div className="mb-8">
                    <div 
                      className="relative w-full h-64 lg:h-96 overflow-hidden"
                      style={{
                        backgroundImage: `url('${section.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black opacity-5" />
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          mixBlendMode: 'overlay'
                        }}
                      />
                    </div>
                    {section.caption && (
                      <p 
                        className="font-sans text-sm text-whisper-grey mt-4 text-center"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.05em' }}
                      >
                        {section.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div 
            data-reveal="conclusion"
            className={`mt-16 lg:mt-24 transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '800ms',
              opacity: visibleElements.has('conclusion') ? 1 : 0, 
              transform: visibleElements.has('conclusion') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <blockquote 
              className="font-serif text-xl lg:text-2xl italic text-[#1C1C1C] border-l-2 border-whisper-grey pl-8"
              style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.6' }}
            >
              {article.content.conclusion}
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div 
            data-reveal="navigation"
            className={`flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '900ms',
              opacity: visibleElements.has('navigation') ? 1 : 0, 
              transform: visibleElements.has('navigation') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <Link
              href="/editorial"
              className="font-sans text-sm font-medium uppercase tracking-widest text-whisper-grey hover:text-signature-ink transition-colors duration-300"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              ← RETURN TO EDITORIAL
            </Link>
            
            <Link
              href="/archive"
              className="font-sans text-sm font-medium uppercase tracking-widest text-whisper-grey hover:text-signature-ink transition-colors duration-300"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              EXPLORE OUR WORK →
            </Link>
          </div>
        </div>
      </section>

      <Footer onScroll={handleScroll} />
    </div>
  );
}