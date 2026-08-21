import type { Metadata } from 'next';
import InfoContent from './InfoContent';

export const metadata: Metadata = {
  title: 'House Rules',
  description:
    'The house rules for Paradise 252: no smoking, no grilling, a six-person maximum, and the check-out policy.',
};

export default function InfoPage() {
  return <InfoContent />;
}
