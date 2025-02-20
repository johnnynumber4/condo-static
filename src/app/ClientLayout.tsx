'use client';
import { useEffect } from 'react';
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry';
import Navigation from './components/Navigation/Navigation';
import InstallPWA from './components/InstallPWA';
import { registerServiceWorker } from './pwa';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <ThemeRegistry>
      <Navigation />
      <main
        style={{
          marginBottom: '2rem',
          minHeight: 'calc(100vh - 64px)',
          paddingTop: '1rem',
        }}
      >
        {children}
      </main>
      <InstallPWA />
    </ThemeRegistry>
  );
}
