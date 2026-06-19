import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Space_Grotesk, Crimson_Pro, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
});

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Chronicles of Light',
  description: "A premium storytelling experience exploring humanity's relationship with light.",
  url: 'https://chroniclesoflight.example.com',
  author: {
    '@type': 'Organization',
    name: 'Chronicles of Light',
  },
  genre: 'Interactive Storytelling',
  keywords: ['storytelling', 'light', 'cinematic', 'immersive', 'premium'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chroniclesoflight.example.com'),
  title: 'Chronicles of Light | A Premium Storytelling Experience',
  description: "Embark on an immersive journey through humanity's relationship with light — from ancient fire to digital luminescence. A cinematic, award-worthy digital experience.",
  keywords: ['storytelling', 'light', 'cinematic', 'immersive', 'premium', 'digital experience', 'animation', 'webGL', 'Three.js'],
  authors: [{ name: 'Chronicles of Light' }],
  openGraph: {
    title: 'Chronicles of Light | A Premium Storytelling Experience',
    description: "Embark on an immersive journey through humanity's relationship with light.",
    type: 'website',
    locale: 'en_US',
    siteName: 'Chronicles of Light',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chronicles of Light - A Journey Through Human Illumination',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronicles of Light | A Premium Storytelling Experience',
    description: "Embark on an immersive journey through humanity's relationship with light.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://chroniclesoflight.example.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${spaceGrotesk.variable} ${crimsonPro.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><circle cx='40' cy='40' r='30' stroke='%23d4af37' stroke-width='3' fill='none'/><circle cx='40' cy='40' r='20' stroke='%23ff6b35' stroke-width='2' fill='none' opacity='0.5'/></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="bg-deep-space text-soft-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-champagne-gold focus:text-deep-space focus:font-headline focus:rounded"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
