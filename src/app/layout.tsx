import { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Paradise 252 @ Atlantica II',
  description: 'Your perfect beachfront getaway in Myrtle Beach',
  manifest: '/manifest.json',
  themeColor: '#1e88e5',
  icons: {
    icon: '/sun.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
