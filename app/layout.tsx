// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '#/components/layout/theme-provider'; 

export const metadata: Metadata = {
  title: 'CONQRETE — New Age Wearable Tech',
  description: 'Earphones. Power banks. Cables. Adapters. Built for the relentless.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
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
        <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Barlow+Condensed:wght@300;400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-black">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}