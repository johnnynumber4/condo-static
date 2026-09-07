'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import { registerServiceWorker } from './pwa';
import { shortLandscape } from './lib/theme';

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The home hero runs full-bleed beneath the transparent app bar; interior
  // pages start below it.
  const isHome = pathname === '/';

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Navigation />
      <Box
        component="main"
        sx={{
          flex: 1,
          // Must track the Toolbar's own minHeight, including its short
          // landscape case.
          pt: isHome ? 0 : { xs: '62px', md: '74px' },
          ...(!isHome && { [shortLandscape]: { pt: '52px' } }),
        }}
      >
        {children}
      </Box>
      <Footer />
      <InstallPWA />
    </Box>
  );
}

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
      <Shell>{children}</Shell>
    </ThemeRegistry>
  );
}
