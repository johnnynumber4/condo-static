import type { Metadata, Viewport } from 'next';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ClientLayout from './ClientLayout';
import { fraunces, inter } from './lib/fonts';
import { site } from './lib/site';
import { tokens } from './lib/theme';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  manifest: '/manifest.json',
  icons: { icon: '/sun.svg', apple: '/icons/icon-192x192.png' },
  openGraph: {
    type: 'website',
    siteName: site.fullName,
    title: `${site.fullName} · ${site.tagline}`,
    description: site.description,
    images: [{ url: '/sunset-toast.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.fullName} · ${site.tagline}`,
    description: site.description,
    images: ['/sunset-toast.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: tokens.light.sand },
    { media: '(prefers-color-scheme: dark)', color: tokens.dark.sand },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body>
        <InitColorSchemeScript attribute="data" defaultMode="system" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
