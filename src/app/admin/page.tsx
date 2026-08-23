import type { Metadata } from 'next';
import { Alert, Container } from '@mui/material';
import { activityCategories } from '../lib/activities';
import { foodCategories } from '../lib/food';
import { bookingChannels } from '../lib/booking';
import { hiddenFeatureIds, hiddenPlaceIds } from '../lib/visibility';
import { isAuthenticated, isConfigured } from './auth';
import SignInForm from './SignInForm';
import AdminPanel from './AdminPanel';

// Never prerendered, never indexed, and never listed in the nav.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Site settings',
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminPage() {
  if (!isConfigured()) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
        <Alert severity="warning">
          This page is switched off until <code>ADMIN_PASSWORD</code> is set in
          the Vercel project settings. Without it there is nothing to check a
          password against, so it refuses everyone rather than letting everyone
          in.
        </Alert>
      </Container>
    );
  }

  if (!(await isAuthenticated())) {
    return <SignInForm />;
  }

  // Only the parts the panel needs; descriptions and photos stay behind.
  const sections = [
    {
      key: 'activities',
      label: 'Activities',
      href: '/activities',
      categories: activityCategories.map((c) => ({
        id: c.id,
        title: c.title,
        places: c.places.map((p) => ({ id: p.id, name: p.name, note: p.note })),
      })),
    },
    {
      key: 'food',
      label: 'Eat & Drink',
      href: '/food',
      categories: foodCategories.map((c) => ({
        id: c.id,
        title: c.title,
        places: c.places.map((p) => ({ id: p.id, name: p.name, note: p.note })),
      })),
    },
  ];

  const features = [
    {
      id: 'booking-channels',
      title: 'Booking buttons',
      items: bookingChannels
        .filter((c) => c.id !== 'hosteeva')
        .map((c) => ({
          id: `channel-${c.id}`,
          name: c.label,
          // A channel with no listing URL cannot be shown whatever the switch
          // says, so the panel has to say so rather than looking broken.
          note: c.url
            ? 'Shown beside Book a Stay'
            : 'No listing URL set yet, so this stays hidden',
          disabled: !c.url,
        })),
    },
  ];

  return (
    <AdminPanel
      sections={sections}
      features={features}
      hidden={hiddenPlaceIds}
      hiddenFeatures={hiddenFeatureIds}
    />
  );
}
