import type { Metadata } from 'next';
import ArchiveClient from '@/components/ArchiveClient';

export const metadata: Metadata = {
  title: 'The Archive | GapLens Studio Photography Portfolio',
  description: 'Explore GapLens Studio\'s complete photography archive. Discover our fine art projects including Concrete Shadows, The Weight of Memory, and Silence and Structure. Curated visual narratives.',
  keywords: [
    'photography archive',
    'fine art portfolio',
    'photography projects',
    'concrete shadows',
    'weight of memory',
    'silence and structure',
    'architectural photography',
    'editorial photography',
    'minimalist photography',
    'photography gallery'
  ],
  openGraph: {
    title: 'The Archive | GapLens Studio Photography Portfolio',
    description: 'Explore GapLens Studio\'s complete photography archive. Discover our fine art projects including Concrete Shadows, The Weight of Memory, and Silence and Structure.',
    url: 'https://gaplens.com/archive',
    images: [
      {
        url: '/assets/images/og-archive.jpg',
        width: 1200,
        height: 630,
        alt: 'GapLens Studio Photography Archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Archive | GapLens Studio Photography Portfolio',
    description: 'Explore GapLens Studio\'s complete photography archive. Discover our fine art projects including Concrete Shadows, The Weight of Memory, and Silence and Structure.',
    images: ['/assets/images/og-archive.jpg'],
  },
  alternates: {
    canonical: 'https://gaplens.com/archive',
  },
};

export default function Archive() {
  return <ArchiveClient />;
}
