import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact | GapLens Studio Photography Inquiry',
  description: 'Contact GapLens Studio for fine art photography commissions, editorial work, and collaborations. Professional photography services specializing in architectural and minimalist aesthetics.',
  keywords: [
    'contact photographer',
    'fine art photography commission',
    'architectural photography services',
    'editorial photography',
    'photography collaboration',
    'professional photographer',
    'photography inquiry',
    'commission photographer',
    'art photography services'
  ],
  openGraph: {
    title: 'Contact | GapLens Studio Photography Inquiry',
    description: 'Contact GapLens Studio for fine art photography commissions, editorial work, and collaborations.',
    url: 'https://gaplens.com/contact',
    images: [
      {
        url: '/assets/images/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact GapLens Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | GapLens Studio Photography Inquiry',
    description: 'Contact GapLens Studio for fine art photography commissions, editorial work, and collaborations.',
    images: ['/assets/images/og-contact.jpg'],
  },
  alternates: {
    canonical: 'https://gaplens.com/contact',
  },
};

export default function Contact() {
  return <ContactClient />;
}