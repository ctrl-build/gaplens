'use client';

import { useState, useEffect, useRef } from 'react';
import Footer from '@/components/Footer';

export default function ContactClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set(['title', 'intro', 'form']));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const contactRef = useRef<HTMLDivElement>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={contactRef}
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
            THE PRIVATE DESK
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
              Begin a conversation about your vision. We're interested in projects that 
              explore the spaces between light and shadow, the poetry of restraint, 
              and the architecture of silence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div 
            data-reveal="form"
            className={`transition-all`}
            style={{ 
              transition: transitionStyle, 
              transitionDelay: '300ms',
              opacity: visibleElements.has('form') ? 1 : 0, 
              transform: visibleElements.has('form') ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            {submitStatus === 'success' ? (
              <div className="text-center py-16">
                <div className="mb-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-archive-sepia rounded-full flex items-center justify-center">
                    <span 
                      className="font-sans text-2xl text-white"
                      style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
                    >
                      ✓
                    </span>
                  </div>
                  <h2 
                    className="font-serif text-3xl font-normal text-signature-ink mb-4"
                    style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
                  >
                    Message Received
                  </h2>
                  <p 
                    className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                  >
                    Thank you for reaching out. We'll respond within 24 hours to discuss your vision.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="font-sans text-sm font-medium uppercase tracking-widest text-whisper-grey hover:text-signature-ink transition-colors duration-300"
                  style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name"
                      className="block font-sans text-sm font-medium uppercase tracking-widest text-signature-ink mb-3"
                      style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-whisper-grey bg-transparent font-sans text-base text-signature-ink placeholder-whisper-grey focus:outline-none focus:border-signature-ink transition-colors duration-300"
                      style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email"
                      className="block font-sans text-sm font-medium uppercase tracking-widest text-signature-ink mb-3"
                      style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-whisper-grey bg-transparent font-sans text-base text-signature-ink placeholder-whisper-grey focus:outline-none focus:border-signature-ink transition-colors duration-300"
                      style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="subject"
                    className="block font-sans text-sm font-medium uppercase tracking-widest text-signature-ink mb-3"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-whisper-grey bg-transparent font-sans text-base text-signature-ink placeholder-whisper-grey focus:outline-none focus:border-signature-ink transition-colors duration-300"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
                    placeholder="Project inquiry"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="message"
                    className="block font-sans text-sm font-medium uppercase tracking-widest text-signature-ink mb-3"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-whisper-grey bg-transparent font-sans text-base text-signature-ink placeholder-whisper-grey focus:outline-none focus:border-signature-ink transition-colors duration-300 resize-none"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif' }}
                    placeholder="Tell us about your vision..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-sans text-sm font-medium uppercase tracking-widest text-signature-ink hover:text-whisper-grey transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                  >
                    {isSubmitting ? 'SENDING...' : 'INITIATE INQUIRY'}
                  </button>
                  
                  <div className="space-y-2">
                    <p 
                      className="font-sans text-sm text-[#C7C7C7]"
                      style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.05em' }}
                    >
                      studio@gaplens.com
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer onScroll={handleScroll} />
    </div>
  );
}
