import type { Metadata } from 'next';
import ActivitiesContent from './ActivitiesContent';

export const metadata: Metadata = {
  title: 'Activities',
  description:
    'The boardwalk, Second Avenue Pier, golf, Medieval Times and Broadway at the Beach — our favourite things to do near Paradise 252.',
};

export default function ActivitiesPage() {
  return <ActivitiesContent />;
}
