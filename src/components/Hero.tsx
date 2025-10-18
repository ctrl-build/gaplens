'use client';

import { useState, useEffect, useRef } from 'react';

interface HeroProps {
  onScroll?: () => void;
}

export default function Hero({ onScroll }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                            ('ontouchstart' in window) || 
                            (navigator.maxTouchPoints > 0);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle video autoplay on mobile
  useEffect(() => {
    if (videoRef.current && isMobile) {
      const video = videoRef.current;
      
      const handlePlay = () => {
        setVideoPlaying(true);
        setShowPlayButton(false);
      };
      
      const handlePause = () => {
        setVideoPlaying(false);
        setShowPlayButton(true);
      };
      
      const handleError = () => {
        console.log('Video autoplay failed, showing play button');
        setShowPlayButton(true);
      };
      
      // Try to play the video
      const playVideo = async () => {
        try {
          await video.play();
          setVideoPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented:', error);
          setShowPlayButton(true);
        }
      };
      
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('error', handleError);
      
      // Attempt to play after a short delay
      const playTimer = setTimeout(playVideo, 1000);
      
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('error', handleError);
        clearTimeout(playTimer);
      };
    }
  }, [isMobile, videoLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (onScroll) onScroll();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  useEffect(() => {
    const scrollCue = document.querySelector('.scroll-cue');
    if (scrollCue) {
      const interval = setInterval(() => {
        scrollCue.classList.toggle('animate-pulse');
      }, 1500);

      return () => clearInterval(interval);
    }
  }, []);

  // Manual play function for mobile
  const handlePlayVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setVideoPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Failed to play video:', error);
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <div 
        className={`absolute inset-0 transition-all duration-2000 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        style={{
          transform: `translateY(${scrollY * 0.2}px) scale(${isLoaded ? 1 : 1.05})`,
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => {
            console.log('✅ Video loaded successfully');
            setVideoLoaded(true);
          }}
          onError={(e) => {
            console.error('❌ Hero video failed to load:', e);
            setVideoLoaded(true);
          }}
          onCanPlay={() => {
            console.log('▶️ Video can play');
            setVideoLoaded(true);
          }}
          onLoadStart={() => {
            console.log('🔄 Video loading started');
          }}
          style={{
            filter: 'contrast(1.1) saturate(0.8) brightness(0.95)',
            transform: 'scale(1.05)',
            opacity: 1,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          <source src="/assets/videos/hero-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center z-10 transition-opacity duration-1000">
            <div className="text-whisper-grey text-sm animate-pulse">Loading cinematic experience...</div>
          </div>
        )}

        {/* Mobile Play Button Overlay */}
        {isMobile && showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
            <button
              onClick={handlePlayVideo}
              className="group relative flex items-center justify-center w-20 h-20 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="Play video"
            >
              <div className="w-0 h-0 border-l-[16px] border-l-signature-ink border-y-[12px] border-y-transparent ml-1"></div>
              <div className="absolute inset-0 rounded-full border-2 border-signature-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium">
              Tap to play
            </div>
          </div>
        )}
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
        
        <div className="absolute inset-0 bg-white opacity-10 mix-blend-multiply" />
      </div>

      <div 
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div 
            className="scroll-cue font-sans text-sm font-medium uppercase tracking-widest text-signature-ink transition-opacity duration-1500"
            style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
          >
            BEGIN ARCHIVE
          </div>
          
          <div className="relative">
            <div 
              className="w-px h-8 bg-signature-ink animate-bounce"
              style={{
                animation: 'bounce 2s infinite',
                animationTimingFunction: 'ease-in-out'
              }}
            />
          </div>
        </div>
      </div>

      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isHovering ? 'bg-archive-sepia opacity-5' : 'opacity-0'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          backgroundColor: isHovering ? '#8B7355' : 'transparent',
        }}
      />

      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-white transition-opacity duration-2000"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)'
          }}
        />
      )}
    </section>
  );
}
