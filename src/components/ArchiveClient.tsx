'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  image: string;
  size: 'large' | 'medium' | 'small';
  description: string;
}

export default function ArchiveClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const archiveRef = useRef<HTMLDivElement>(null);

  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'Concrete Shadows',
      year: '2024',
      category: 'Space',
      image: '/assets/images/project-1.png',
      size: 'large',
      description: 'Brutalist architecture and geometric shadows'
    },
    {
      id: '2',
      title: 'The Weight of Memory',
      year: '2024',
      category: 'Figure',
      image: '/assets/images/project-2.png',
      size: 'medium',
      description: 'Intimate still life with contemplative objects'
    },
    {
      id: '3',
      title: 'Silence and Structure',
      year: '2024',
      category: 'Space',
      image: '/assets/images/project-3.png',
      size: 'large',
      description: 'Architectural study with dramatic perspective'
    },
    {
      id: '4',
      title: 'Ephemeral Forms',
      year: '2024',
      category: 'Abstract',
      image: '/assets/images/projects/project-4/4-1.png',
      size: 'small',
      description: 'Conceptual exploration of fleeting moments'
    },
    {
      id: '5',
      title: 'Urban Echoes',
      year: '2023',
      category: 'Commission',
      image: '/assets/images/projects/project-5/5-1.png',
      size: 'medium',
      description: 'Street photography capturing urban rhythms'
    },
    {
      id: '6',
      title: 'Abstracted Reality',
      year: '2024',
      category: 'Abstract',
      image: '/assets/images/projects/project-6/6-1.png',
      size: 'small',
      description: 'Experimental deconstruction of visual elements'
    }
  ];

  const filters = ['All', 'Abstract', 'Figure', 'Space', 'Commission'];

  useEffect(() => {
    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '80px' : '20px',
          height: isHovering ? '80px' : '20px',
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
        {isHovering ? 'VIEW' : ''}
      </div>

      <div 
        ref={archiveRef}
        className="min-h-screen bg-gallery-white"
        style={{ backgroundColor: '#F9F9F9' }}
      >
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h1 
              className="font-serif text-5xl lg:text-6xl font-normal text-signature-ink mb-8"
              style={{ 
                fontFamily: 'GaramondPremierPro, serif',
                letterSpacing: '0.1em'
              }}
            >
              THE ARCHIVE
            </h1>

            <div className="flex flex-wrap items-center space-x-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  className={`font-sans text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${
                    activeFilter === filter 
                      ? 'text-signature-ink' 
                      : 'text-whisper-grey hover:text-signature-ink'
                  }`}
                  style={{ 
                    fontFamily: 'SuisseBPIntl, sans-serif',
                    letterSpacing: '0.15em'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative transition-all duration-1000 ${
                    activeFilter === 'All' || project.category === activeFilter
                      ? 'opacity-100' 
                      : 'opacity-10'
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    gridColumn: project.size === 'large' ? 'span 2' : 'span 1',
                    gridRow: project.size === 'large' ? 'span 2' : 'span 1'
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Link
                    href={`/project/${project.id}`}
                    className="block relative overflow-hidden"
                  >
                    <div 
                      className={`relative w-full transition-all duration-500 ${
                        project.size === 'large' 
                          ? 'h-96 lg:h-[500px]' 
                          : project.size === 'medium' 
                            ? 'h-80 lg:h-96' 
                            : 'h-64 lg:h-80'
                      }`}
                      style={{
                        backgroundImage: `url('${project.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                      
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          mixBlendMode: 'overlay'
                        }}
                      />
                    </div>

                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-90 px-3 py-2">
                        <h3 
                          className="font-serif text-lg font-medium text-signature-ink"
                          style={{ 
                            fontFamily: 'GaramondPremierPro, serif',
                            fontWeight: 500
                          }}
                        >
                          {project.title}
                        </h3>
                        <p 
                          className="font-sans text-sm text-whisper-grey"
                          style={{ 
                            fontFamily: 'SuisseBPIntl, sans-serif',
                            fontSize: '12px'
                          }}
                        >
                          {project.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-whisper-grey rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-whisper-grey rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-whisper-grey rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
