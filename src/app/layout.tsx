import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chronicles of Light | A Premium Storytelling Experience',
  description: 'Embark on an immersive journey through humanity\'s relationship with light — from ancient fire to digital luminescence. A cinematic, award-worthy digital experience.',
  keywords: ['storytelling', 'light', 'cinematic', 'immersive', 'premium', 'digital experience', 'animation', 'webGL', 'Three.js'],
  authors: [{ name: 'Chronicles of Light' }],
  openGraph: {
    title: 'Chronicles of Light | A Premium Storytelling Experience',
    description: 'Embark on an immersive journey through humanity\'s relationship with light.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Chronicles of Light',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronicles of Light | A Premium Storytelling Experience',
    description: 'Embark on an immersive journey through humanity\'s relationship with light.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><circle cx='40' cy='40' r='30' stroke='%23d4af37' stroke-width='3' fill='none'/><circle cx='40' cy='40' r='20' stroke='%23ff6b35' stroke-width='2' fill='none' opacity='0.5'/></svg>"
        />
      </head>
      <body className="bg-deep-space text-soft-white antialiased">
        {children}
      </body>
    </html>
  );
}
