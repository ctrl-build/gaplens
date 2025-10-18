'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';

interface ProjectData {
  id: string;
  title: string;
  year: string;
  location: string;
  type: string;
  client: string;
  narrative: string;
  conclusion: string;
  leadImage: string;
  images: Array<{
    id: string;
    src: string;
    type: 'full-bleed' | 'asymmetric' | 'detail';
  }>;
  nextProject?: {
    id: string;
    title: string;
  };
}

const getProjectData = (id: string): ProjectData => {
  const projects: Record<string, ProjectData> = {
    '1': {
      id: '1',
      title: 'Concrete Shadows',
      year: '2024',
      location: 'Berlin, Germany',
      type: 'Architectural Study',
      client: 'Independent',
      narrative: 'An exploration of brutalist architecture through the lens of light and shadow. This series captures the raw, unadorned beauty of concrete structures, revealing the poetry hidden within their geometric forms.',
      conclusion: 'In the silence between light and shadow, we find the true essence of architectural poetry.',
      leadImage: '/assets/images/projects/project-1/1-1.png',
      images: [
        { id: '1-1', src: '/assets/images/projects/project-1/1-1.png', type: 'full-bleed' },
        { id: '1-2', src: '/assets/images/projects/project-1/1-2.png', type: 'asymmetric' },
        { id: '1-3', src: '/assets/images/projects/project-1/1-3.png', type: 'detail' },
        { id: '1-4', src: '/assets/images/projects/project-1/1-4.png', type: 'full-bleed' },
        { id: '1-5', src: '/assets/images/projects/project-1/1-5.png', type: 'asymmetric' }
      ],
      nextProject: { id: '2', title: 'The Weight of Memory' }
    },
    '2': {
      id: '2',
      title: 'The Weight of Memory',
      year: '2024',
      location: 'Paris, France',
      type: 'Still Life',
      client: 'Independent',
      narrative: 'A contemplative study of objects that carry the weight of memory. Each photograph reveals the silent stories embedded within everyday items, transforming the mundane into the profound.',
      conclusion: 'Memory is not in the object, but in the space between what was and what remains.',
      leadImage: '/assets/images/projects/project-2/2-1.png',
      images: [
        { id: '2-1', src: '/assets/images/projects/project-2/2-1.png', type: 'full-bleed' },
        { id: '2-2', src: '/assets/images/projects/project-2/2-2.png', type: 'asymmetric' },
        { id: '2-3', src: '/assets/images/projects/project-2/2-3.png', type: 'detail' },
        { id: '2-4', src: '/assets/images/projects/project-2/2-4.png', type: 'full-bleed' }
      ],
      nextProject: { id: '3', title: 'Silence and Structure' }
    },
    '3': {
      id: '3',
      title: 'Silence and Structure',
      year: '2024',
      location: 'Tokyo, Japan',
      type: 'Architectural Study',
      client: 'Independent',
      narrative: 'A minimalist exploration of architectural forms in urban environments. This series examines the relationship between structure and silence, finding beauty in the spaces between buildings.',
      conclusion: 'True architecture speaks in whispers, not shouts.',
      leadImage: '/assets/images/projects/project-3/3-1.png',
      images: [
        { id: '3-1', src: '/assets/images/projects/project-3/3-1.png', type: 'full-bleed' },
        { id: '3-2', src: '/assets/images/projects/project-3/3-2.png', type: 'asymmetric' },
        { id: '3-3', src: '/assets/images/projects/project-3/3-3.png', type: 'detail' },
        { id: '3-4', src: '/assets/images/projects/project-3/3-4.png', type: 'full-bleed' },
        { id: '3-5', src: '/assets/images/projects/project-3/3-5.png', type: 'asymmetric' }
      ],
      nextProject: { id: '4', title: 'Ephemeral Forms' }
    },
    '4': {
      id: '4',
      title: 'Ephemeral Forms',
      year: '2024',
      location: 'New York, USA',
      type: 'Conceptual',
      client: 'Independent',
      narrative: 'An experimental series exploring the transient nature of visual forms. Through abstract compositions, this work investigates the fleeting moments of perception and the fragility of visual experience.',
      conclusion: 'In the ephemeral, we find the eternal.',
      leadImage: '/assets/images/projects/project-4/4-1.png',
      images: [
        { id: '4-1', src: '/assets/images/projects/project-4/4-1.png', type: 'full-bleed' },
        { id: '4-2', src: '/assets/images/projects/project-4/4-2.png', type: 'asymmetric' },
        { id: '4-3', src: '/assets/images/projects/project-4/4-3.png', type: 'detail' }
      ],
      nextProject: { id: '5', title: 'Urban Echoes' }
    },
    '5': {
      id: '5',
      title: 'Urban Echoes',
      year: '2023',
      location: 'London, UK',
      type: 'Street Photography',
      client: 'Commission',
      narrative: 'A street photography series capturing the rhythm and pulse of urban life. Through candid moments and architectural details, this work reveals the hidden narratives of city streets.',
      conclusion: 'The city speaks in echoes, if we know how to listen.',
      leadImage: '/assets/images/projects/project-5/5-1.png',
      images: [
        { id: '5-1', src: '/assets/images/projects/project-5/5-1.png', type: 'full-bleed' },
        { id: '5-2', src: '/assets/images/projects/project-5/5-2.png', type: 'asymmetric' },
        { id: '5-3', src: '/assets/images/projects/project-5/5-3.png', type: 'detail' },
        { id: '5-4', src: '/assets/images/projects/project-5/5-4.png', type: 'full-bleed' }
      ],
      nextProject: { id: '6', title: 'Abstracted Reality' }
    },
    '6': {
      id: '6',
      title: 'Abstracted Reality',
      year: '2024',
      location: 'Milan, Italy',
      type: 'Experimental',
      client: 'Independent',
      narrative: 'An experimental deconstruction of visual reality through abstract photography. This series challenges conventional perception by fragmenting and reconstructing visual elements.',
      conclusion: 'Reality is not what we see, but what we choose to see.',
      leadImage: '/assets/images/projects/project-6/6-1.png',
      images: [
        { id: '6-1', src: '/assets/images/projects/project-6/6-1.png', type: 'full-bleed' },
        { id: '6-2', src: '/assets/images/projects/project-6/6-2.png', type: 'asymmetric' },
        { id: '6-3', src: '/assets/images/projects/project-6/6-3.png', type: 'detail' }
      ]
    }
  };

  return projects[id] || projects['1'];
};

export default function ProjectDetailClient() {
  const params = useParams();
  const projectId = params.id as string;
  const project = getProjectData(projectId);
  
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set(['title', 'metadata', 'lead-image', 'narrative']));
  const [isScrolled, setIsScrolled] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);

  const transitionStyle = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 100);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

  const AsymmetricPair = ({ image, reverse = false }: { image: ProjectData['images'][0], reverse?: boolean }) => {
    const imageContent = (
      <div className="lg:col-span-3">
        <div 
          className="relative w-full h-80 lg:h-96 overflow-hidden"
          style={{ 
            backgroundImage: `url('${image.src}')`, 
            backgroundSize: 'cover', 
            backgroundPosition: (image.src.includes('5-3.png') || image.src.includes('5-4.png')) ? 'center bottom' : 'center' 
          }}
        >
          <div className="absolute inset-0 bg-black opacity-5" />
        </div>
      </div>
    );

    const textContent = (
      <div className="lg:col-span-2 flex items-center">
        <div className="p-6 lg:p-12">
          <div className="w-16 h-px bg-whisper-grey mb-6" />
          <p 
            className="font-serif text-lg leading-relaxed text-[#1C1C1C]"
            style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.6' }}
          >
            A moment of architectural contemplation, where form meets function in perfect harmony.
          </p>
        </div>
      </div>
    );

    return (
      <div 
        data-reveal={`image-${image.id}`}
        className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-24 lg:mb-32 transition-all`}
        style={{ 
          transition: transitionStyle, 
          opacity: visibleElements.has(`image-${image.id}`) ? 1 : 0, transform: visibleElements.has(`image-${image.id}`) ? 'translateY(0)' : 'translateY(30px)'
        }}
      >
        {reverse ? (
          <>
            {textContent}
            {imageContent}
          </>
        ) : (
          <>
            {imageContent}
            {textContent}
          </>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={projectRef}
      className="min-h-screen"
      style={{ backgroundColor: '#F9F9F9' }}
    >
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            data-reveal="title"
            className={`font-serif text-5xl lg:text-7xl font-normal text-[#1C1C1C] mb-8`}
            style={{ 
              fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em', transition: transitionStyle,
              opacity: visibleElements.has('title') ? 1 : 0, transform: visibleElements.has('title') ? 'translateY(0)' : 'translateY(15px)'
            }}
          >
            {project.title}
          </h1>
          <div 
            data-reveal="metadata"
            className={`flex flex-col sm:flex-row sm:items-center justify-center gap-2 sm:gap-4 mb-16`}
            style={{ 
              transition: transitionStyle, transitionDelay: '100ms',
              opacity: visibleElements.has('metadata') ? 1 : 0, transform: visibleElements.has('metadata') ? 'translateY(0)' : 'translateY(15px)'
            }}
          >
            <p 
              className="font-sans text-xs text-[#C7C7C7] uppercase"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              {project.year} / {project.location} / {project.type}
            </p>
            <span 
              className="font-sans text-xs text-[#C7C7C7] hidden sm:block"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
            >
              /
            </span>
            <p 
              className="font-sans text-xs text-[#C7C7C7] uppercase"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              {project.client}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 px-6 lg:px-12">
        <div 
          data-reveal="lead-image"
          className={`max-w-6xl mx-auto transition-all`}
          style={{ 
            transition: transitionStyle, transitionDelay: '200ms',
            opacity: visibleElements.has('lead-image') ? 1 : 0, transform: visibleElements.has('lead-image') ? 'scale(1)' : 'scale(0.99)'
          }}
        >
          <div
            className="relative w-full h-96 lg:h-[700px] overflow-hidden"
            style={{
              backgroundImage: `url('${project.leadImage}')`, backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'none'
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay' }} />
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div 
            data-reveal="narrative"
            className={`transition-all`}
            style={{ 
              transition: transitionStyle, transitionDelay: '300ms',
              opacity: visibleElements.has('narrative') ? 1 : 0, transform: visibleElements.has('narrative') ? 'translateY(0)' : 'translateY(15px)'
            }}
          >
            <p 
              className="font-serif text-xl leading-relaxed text-[#1C1C1C]"
              style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.6' }}
            >
              {project.narrative}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="space-y-24 lg:space-y-32">
          {project.images.map((image, index) => (
            <div key={image.id}>
              {image.type === 'full-bleed' && (
                <div 
                  data-reveal={`image-${image.id}`}
                  className={`relative w-full h-[50vh] lg:h-[80vh] overflow-hidden transition-all`}
                  style={{ 
                    transition: transitionStyle, 
                    opacity: visibleElements.has(`image-${image.id}`) ? 1 : 0, transform: visibleElements.has(`image-${image.id}`) ? 'scale(1)' : 'scale(0.99)'
                  }}
                >
                  <div 
                    className="relative w-full h-full"
                    style={{
                      backgroundImage: `url('${image.src}')`, backgroundSize: 'cover', 
                      backgroundPosition: (image.src.includes('5-3.png') || image.src.includes('5-4.png')) ? 'center bottom' : 'center',
                      transition: 'none'
                    }}
                  >
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay' }} />
                  </div>
                </div>
              )}
              {image.type === 'asymmetric' && (
                <AsymmetricPair image={image} reverse={index % 2 !== 0} />
              )}
              {image.type === 'detail' && (
                <div 
                  data-reveal={`image-${image.id}`}
                  className={`max-w-xl mx-auto px-6 lg:px-12 transition-all`}
                  style={{ 
                    transition: transitionStyle, 
                    opacity: visibleElements.has(`image-${image.id}`) ? 1 : 0, transform: visibleElements.has(`image-${image.id}`) ? 'scale(1)' : 'scale(0.99)'
                  }}
                >
                  <div 
                    className="relative w-full h-96 lg:h-[500px] overflow-hidden"
                    style={{
                      backgroundImage: `url('${image.src}')`, backgroundSize: 'cover', 
                      backgroundPosition: (image.src.includes('5-3.png') || image.src.includes('5-4.png')) ? 'center bottom' : 'center',
                      transition: 'none'
                    }}
                  >
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div 
            data-reveal="conclusion"
            className={`text-center mb-16`}
            style={{ 
              transition: transitionStyle, 
              opacity: visibleElements.has('conclusion') ? 1 : 0, transform: visibleElements.has('conclusion') ? 'translateY(0)' : 'translateY(15px)'
            }}
          >
            <blockquote 
              className="font-serif text-2xl lg:text-3xl italic text-[#1C1C1C]"
              style={{ fontFamily: 'GaramondPremierPro, serif', lineHeight: '1.4' }}
            >
              "{project.conclusion}"
            </blockquote>
          </div>
          <div 
            data-reveal="navigation"
            className={`flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0`}
            style={{ 
              transition: transitionStyle, 
              opacity: visibleElements.has('navigation') ? 1 : 0, transform: visibleElements.has('navigation') ? 'translateY(0)' : 'translateY(15px)'
            }}
          >
            <Link
              href="/archive"
              className="font-sans text-sm font-medium uppercase tracking-widest text-[#C7C7C7] hover:text-[#1C1C1C] transition-colors duration-300"
              style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
            >
              ← RETURN TO ARCHIVE
            </Link>
            {project.nextProject && (
              <Link
                href={`/project/${project.nextProject.id}`}
                className="font-sans text-lg font-medium uppercase tracking-widest text-[#1C1C1C] hover:text-[#C7C7C7] transition-colors duration-300"
                style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
              >
                NEXT PROJECT: {project.nextProject.title} →
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer onScroll={handleScroll} />
    </div>
  );
}
