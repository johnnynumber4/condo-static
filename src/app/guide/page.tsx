import type { Metadata } from 'next';
import GuideContent from './GuideContent';

export const metadata: Metadata = {
  title: 'Condo Guide',
  description:
    'How to get into the building, where the elevator is, the bonus bed, and the codes you will need at Paradise 252.',
};

export default function GuidePage() {
  return <GuideContent />;
}
