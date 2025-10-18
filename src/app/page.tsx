import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'GapLens Studio | Fine Art Photography & Editorial Excellence',
  description: 'Discover GapLens Studio\'s curated archive of fine art photography. Specializing in architectural abstraction, intimate still life, and editorial excellence. Explore our minimalist visual narratives.',
  keywords: [
    'fine art photography',
    'architectural photography',
    'editorial photography', 
    'minimalist photography',
    'brutalist architecture',
    'concrete shadows',
    'fine art studio',
    'photography portfolio',
    'visual storytelling'
  ],
  openGraph: {
    title: 'GapLens Studio | Fine Art Photography & Editorial Excellence',
    description: 'Discover GapLens Studio\'s curated archive of fine art photography. Specializing in architectural abstraction, intimate still life, and editorial excellence.',
    url: 'https://gaplens.com',
    images: [
      {
        url: '/assets/images/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'GapLens Studio - Fine Art Photography Archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GapLens Studio | Fine Art Photography & Editorial Excellence',
    description: 'Discover GapLens Studio\'s curated archive of fine art photography. Specializing in architectural abstraction, intimate still life, and editorial excellence.',
    images: ['/assets/images/og-homepage.jpg'],
  },
  alternates: {
    canonical: 'https://gaplens.com',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GapLens Studio",
            "description": "Premier fine art photography studio specializing in architectural abstraction, intimate still life, and editorial excellence",
            "url": "https://gaplens.com",
            "logo": "https://gaplens.com/assets/images/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "studio@gaplens.com",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://instagram.com/gaplens",
              "https://linkedin.com/company/gaplens"
            ],
            "foundingDate": "2024",
            "areaServed": "Worldwide",
            "serviceType": "Fine Art Photography",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Photography Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Architectural Photography",
                    "description": "Fine art architectural photography specializing in brutalist and minimalist structures"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Editorial Photography",
                    "description": "Editorial and commercial photography services"
                  }
                }
              ]
            }
          })
        }}
      />
      <HomePageClient />
    </>
  );
}
