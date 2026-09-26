import type { Metadata } from 'next';
import SuggestionsContent from './SuggestionsContent';
import { getPublishedEntries } from '../lib/guestbook-db';

// Reads the guest book on every request, so an approved note is live the
// moment it is approved rather than at the next deploy.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Guest Book',
  description:
    'Leave a note about your stay at Paradise 252, and read what other guests have said.',
  alternates: { canonical: '/suggestions' },
};

export default async function SuggestionsPage() {
  const { entries, writable } = await getPublishedEntries();
  return <SuggestionsContent entries={entries} writable={writable} />;
}
