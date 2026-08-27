import type { Metadata } from 'next';
import SuggestionsContent from './SuggestionsContent';

export const metadata: Metadata = {
  title: 'Guest Book',
  description:
    'Leave a note about your stay at Paradise 252, and read what other guests have said.',
  alternates: { canonical: '/suggestions' },
};

export default function SuggestionsPage() {
  return <SuggestionsContent />;
}
