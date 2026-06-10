import type { Metadata } from 'next';
import './globals.css';

// Using the @/ alias and the exact lowercase (kebab-case) filenames
import ThemeProvider from '@/components/layout/theme-provider';
import CustomCursor from '@/components/layout/custom-cursor';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'CONQRETE — New Age Wearable Tech',
  description: 'Earphones. Power banks. Cables. Adapters. Built for the relentless.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
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