'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState('terms');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'terms', title: 'Terms of Use' },
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'intellectual', title: 'Intellectual Property' },
    { id: 'contact', title: 'Contact Information' }
  ];

  return (
    <div className="min-h-screen bg-gallery-white">
      <div className="bg-gallery-white border-b border-whisper-grey">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex justify-end">
            <nav className="text-right">
              <Link
                href="/"
                className="font-sans text-sm font-medium uppercase tracking-widest text-whisper-grey hover:text-signature-ink transition-colors duration-300"
                style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
              >
                ← RETURN TO HOME
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <nav className="space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`block w-full text-left font-sans text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${
                    activeSection === section.id
                      ? 'text-signature-ink'
                      : 'text-whisper-grey hover:text-signature-ink'
                  }`}
                  style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.15em' }}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              {activeSection === 'terms' && (
                <div>
                  <h1 
                    className="font-serif text-4xl lg:text-5xl font-normal text-signature-ink mb-8"
                    style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
                  >
                    Terms of Use
                  </h1>
                  
                  <div className="space-y-8">
                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Acceptance of Terms
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        By accessing and using GapLens Studio's website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                    </section>

                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Use License
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        Permission is granted to temporarily download one copy of the materials on GapLens Studio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.
                      </p>
                    </section>

                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Disclaimer
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        The materials on GapLens Studio's website are provided on an 'as is' basis. GapLens Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                      </p>
                    </section>
                  </div>
                </div>
              )}

              {activeSection === 'privacy' && (
                <div>
                  <h1 
                    className="font-serif text-4xl lg:text-5xl font-normal text-signature-ink mb-8"
                    style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
                  >
                    Privacy Policy
                  </h1>
                  
                  <div className="space-y-8">
                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Information Collection
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        GapLens Studio collects information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, and any other information you choose to provide.
                      </p>
                    </section>

                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Information Use
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you about our services.
                      </p>
                    </section>

                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Data Protection
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                    </section>
                  </div>
                </div>
              )}

              {activeSection === 'intellectual' && (
                <div>
                  <h1 
                    className="font-serif text-4xl lg:text-5xl font-normal text-signature-ink mb-8"
                    style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
                  >
                    Intellectual Property
                  </h1>
                  
                  <div className="space-y-8">
                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Copyright
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of GapLens Studio and is protected by copyright laws.
                      </p>
                    </section>

                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Photography Rights
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        All photographs displayed on this website are the exclusive property of GapLens Studio. Unauthorized use, reproduction, or distribution of these images is strictly prohibited.
                      </p>
                    </section>

                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Trademark
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        The GapLens Studio name and logo are trademarks of GapLens Studio. All other trademarks, service marks, and trade names are the property of their respective owners.
                      </p>
                    </section>
                  </div>
                </div>
              )}

              {activeSection === 'contact' && (
                <div>
                  <h1 
                    className="font-serif text-4xl lg:text-5xl font-normal text-signature-ink mb-8"
                    style={{ fontFamily: 'GaramondPremierPro, serif', letterSpacing: '0.05em' }}
                  >
                    Contact Information
                  </h1>
                  
                  <div className="space-y-8">
                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Legal Inquiries
                      </h2>
                      <div className="space-y-2 mb-16">
                        <p 
                          className="font-sans text-sm text-[#C7C7C7]"
                          style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.05em' }}
                        >
                          legal@gaplens.com
                        </p>
                      </div>
                    </section>

                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        General Inquiries
                      </h2>
                      <div className="space-y-2 mb-16">
                        <p 
                          className="font-sans text-sm text-[#C7C7C7]"
                          style={{ fontFamily: 'SuisseBPIntl, sans-serif', letterSpacing: '0.05em' }}
                        >
                          studio@gaplens.com
                        </p>
                      </div>
                    </section>

                    <section>
                      <h2 
                        className="font-serif text-2xl font-normal text-signature-ink mb-4"
                        style={{ fontFamily: 'GaramondPremierPro, serif' }}
                      >
                        Last Updated
                      </h2>
                      <p 
                        className="font-sans text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: 'SuisseBPIntl, sans-serif', lineHeight: '1.7' }}
                      >
                        This document was last updated on December 2024. We reserve the right to modify these terms at any time.
                      </p>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer onScroll={() => setIsScrolled} />
    </div>
  );
}
