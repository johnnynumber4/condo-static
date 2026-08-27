'use client';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import { shortLandscape } from '../lib/theme';
import Surface from '../components/ui/Surface';
import DirectionsButton from '../components/ui/DirectionsButton';

type Store = {
  name: string;
  tag: string;
  description: string;
  coordinates: string;
};

const stores: Store[] = [
  {
    name: 'Walmart Neighborhood Market',
    tag: 'One-stop shop',
    description:
      'Everything in one trip, conveniently close to the condo, with a petrol station attached for a cheaper fill-up on the way out.',
    coordinates: '33.70274,-78.9122',
  },
  {
    name: 'Piggly Wiggly',
    tag: 'Closest',
    description:
      'On Kings Highway, a hop and a skip from the condo. Small and very convenient for grab-and-go runs.',
    coordinates: '33.69947,-78.8747',
  },
  {
    name: 'Food Lion',
    tag: 'Full grocery',
    description:
      'A popular East Coast grocery chain that covers the whole weekly shop.',
    coordinates: '33.7249,-78.8683',
  },
  {
    name: 'Costco Wholesale',
    tag: 'Membership required',
    description:
      'Nearby if you already have a membership. Local deals alongside the usual comforts from your Costco at home.',
    coordinates: '33.70532,-78.9159',
  },
];

export default function GroceriesContent() {
  return (
    <>
      <PageHeader
        eyebrow="Stocking up"
        title="Where to fill the kitchen."
        lead="Four options within a short drive, from a quick grab-and-go to the full weekly shop."
      />

      <Container
        maxWidth="lg"
        sx={{ py: { xs: 6, md: 9 }, [shortLandscape]: { py: 4 } }}
      >
        <Stack spacing={4}>
          {stores.map((store) => (
            <Surface
              key={store.name}
              interactive={false}
              sx={{ p: 0, overflow: 'hidden' }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                }}
              >
                <Box sx={{ p: { xs: 3, md: 4.5 } }}>
                  <Typography
                    variant="overline"
                    sx={{ color: 'secondary.main', display: 'block', mb: 0.5 }}
                  >
                    {store.tag}
                  </Typography>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {store.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {store.description}
                  </Typography>
                  <DirectionsButton
                    destination={store.coordinates}
                    name={store.name}
                    size="medium"
                    sx={{ mt: 3 }}
                  />
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    minHeight: { xs: 240, md: 300 },
                    order: { xs: -1, md: 0 },
                    bgcolor: 'action.hover',
                  }}
                >
                  <Box
                    component="iframe"
                    src={`https://maps.google.com/maps?q=${store.coordinates}&hl=en&output=embed`}
                    title={`Map showing ${store.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </Box>
              </Box>
            </Surface>
          ))}
        </Stack>
      </Container>
    </>
  );
}
