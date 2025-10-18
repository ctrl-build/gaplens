import type { Metadata } from 'next';
import TermsClient from '@/components/TermsClient';

export const metadata: Metadata = {
  title: 'Terms & Privacy Policy | GapLens Studio Legal',
  description: 'GapLens Studio terms of use, privacy policy, and legal documentation. Learn about our data collection practices, intellectual property rights, and service terms.',
  keywords: [
    'terms of use',
    'privacy policy',
    'legal documentation',
    'data protection',
    'intellectual property',
    'photography rights',
    'studio terms',
    'legal information'
  ],
  openGraph: {
    title: 'Terms & Privacy Policy | GapLens Studio Legal',
    description: 'GapLens Studio terms of use, privacy policy, and legal documentation.',
    url: 'https://gaplens.com/terms',
    images: [
      {
        url: '/assets/images/og-terms.jpg',
        width: 1200,
        height: 630,
        alt: 'GapLens Studio Legal Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Privacy Policy | GapLens Studio Legal',
    description: 'GapLens Studio terms of use, privacy policy, and legal documentation.',
    images: ['/assets/images/og-terms.jpg'],
  },
  alternates: {
    canonical: 'https://gaplens.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Terms() {
  return <TermsClient />;
}