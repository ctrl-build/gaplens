import type { Metadata } from 'next';
import StudioClient from '@/components/StudioClient';

export const metadata: Metadata = {
  title: 'Studio | GapLens Studio About & Process',
  description: 'Learn about GapLens Studio\'s approach to fine art photography, our minimalist philosophy, and the process behind our architectural and editorial work. Discover our studio ethos.',
  keywords: [
    'photography studio',
    'fine art photography process',
    'minimalist photography philosophy',
    'architectural photography approach',
    'editorial photography studio',
    'photography methodology',
    'art photography studio',
    'photography philosophy',
    'visual storytelling approach'
  ],
  openGraph: {
    title: 'Studio | GapLens Studio About & Process',
    description: 'Learn about GapLens Studio\'s approach to fine art photography, our minimalist philosophy, and the process behind our architectural and editorial work.',
    url: 'https://gaplens.com/studio',
    images: [
      {
        url: '/assets/images/og-studio.jpg',
        width: 1200,
        height: 630,
        alt: 'GapLens Studio About & Process',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio | GapLens Studio About & Process',
    description: 'Learn about GapLens Studio\'s approach to fine art photography, our minimalist philosophy, and the process behind our architectural and editorial work.',
    images: ['/assets/images/og-studio.jpg'],
  },
  alternates: {
    canonical: 'https://gaplens.com/studio',
  },
};

export default function Studio() {
  return <StudioClient />;
}