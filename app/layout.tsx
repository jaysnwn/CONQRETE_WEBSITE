import type { Metadata, Viewport } from 'next';
import './globals.css';

import ThemeProvider from '@/components/layout/theme-provider';
import CustomCursor from '@/components/layout/custom-cursor';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'CONQRETE — New Age Wearable Tech',
  description: 'Earphones. Power banks. Cables. Adapters. Built for the relentless.',
};

// This is the ONLY way Next.js allows viewport scaling in production
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#111111',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* DO NOT put meta viewport tags here. Next.js deletes them. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Barlow+Condensed:wght@300;400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}