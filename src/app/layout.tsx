import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "GapLens Studio | Fine Art Photography & Editorial Excellence",
    template: "%s | GapLens Studio"
  },
  description: "GapLens Studio is a premier fine art photography studio specializing in architectural abstraction, intimate still life, and editorial excellence. Discover our curated archive of minimalist, sophisticated visual narratives.",
  keywords: [
    "fine art photography",
    "architectural photography", 
    "editorial photography",
    "minimalist photography",
    "brutalist architecture",
    "fine art studio",
    "photography archive",
    "editorial excellence",
    "visual storytelling",
    "artistic photography"
  ],
  authors: [{ name: "GapLens Studio" }],
  creator: "GapLens Studio",
  publisher: "GapLens Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gaplens.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gaplens.com',
    siteName: 'GapLens Studio',
    title: 'GapLens Studio | Fine Art Photography & Editorial Excellence',
    description: 'GapLens Studio is a premier fine art photography studio specializing in architectural abstraction, intimate still life, and editorial excellence.',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GapLens Studio - Fine Art Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GapLens Studio | Fine Art Photography & Editorial Excellence',
    description: 'GapLens Studio is a premier fine art photography studio specializing in architectural abstraction, intimate still life, and editorial excellence.',
    images: ['/assets/images/og-image.jpg'],
    creator: '@gaplens',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#1C1C1C',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
