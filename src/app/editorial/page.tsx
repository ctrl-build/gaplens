import type { Metadata } from 'next';
import EditorialClient from '@/components/EditorialClient';

export const metadata: Metadata = {
  title: 'Editorial | GapLens Studio Photography Articles',
  description: 'Read GapLens Studio\'s editorial content on fine art photography, architectural abstraction, and visual storytelling. Discover the process behind our minimalist photography approach.',
  keywords: [
    'photography articles',
    'fine art photography',
    'editorial photography',
    'photography process',
    'architectural photography',
    'minimalist photography',
    'visual storytelling',
    'photography techniques',
    'brutalist architecture',
    'concrete shadows'
  ],
  openGraph: {
    title: 'Editorial | GapLens Studio Photography Articles',
    description: 'Read GapLens Studio\'s editorial content on fine art photography, architectural abstraction, and visual storytelling.',
    url: 'https://gaplens.com/editorial',
    images: [
      {
        url: '/assets/images/og-editorial.jpg',
        width: 1200,
        height: 630,
        alt: 'GapLens Studio Editorial Content',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorial | GapLens Studio Photography Articles',
    description: 'Read GapLens Studio\'s editorial content on fine art photography, architectural abstraction, and visual storytelling.',
    images: ['/assets/images/og-editorial.jpg'],
  },
  alternates: {
    canonical: 'https://gaplens.com/editorial',
  },
};

export default function Editorial() {
  return <EditorialClient />;
}