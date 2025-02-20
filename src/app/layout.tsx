'use client';
import { useEffect } from 'react';
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry';
import Navigation from './components/Navigation/Navigation';
import { registerServiceWorker } from './pwa';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navigation />
          <main style={{ 
            marginBottom: '2rem',  // Add margin to the bottom
            minHeight: 'calc(100vh - 64px)', // Account for navbar height
            paddingTop: '1rem' // Add padding to top of main content
          }}>
            {children}
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
