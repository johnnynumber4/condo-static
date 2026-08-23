import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'Your Hosts',
  description:
    'Meet the hosts of Paradise 252 and take a video tour of the condo before you arrive.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutContent />;
}
