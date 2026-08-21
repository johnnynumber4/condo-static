'use client';
import * as React from 'react';
import Image from 'next/image';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import PageHeader from '../components/ui/PageHeader';
import Surface from '../components/ui/Surface';
import VideoEmbed from '../components/ui/VideoEmbed';
import { BOOKING_URL_TRACKED } from '../lib/site';
import { heroPhoto } from '../lib/gallery';

const highlights = [
  '2 great rooms, each with a direct ocean view and its own balcony',
  '5 ways to swim: indoor pool, jacuzzi, kiddie pool, lazy river and the ocean',
  '2 minute walk to shops, restaurants and the boardwalk',
];

export default function AboutContent() {
  return (
    <>
      <PageHeader
        eyebrow="Your hosts"
        title="We are unit 252 — but we think 2 + 5 + 2 = paradise."
        lead="We hope you enjoy your stay as much as we enjoy coming down here. This site doubles as the house manual, so keep it handy through the week."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Box
          sx={{
            position: 'relative',
            aspectRatio: { xs: '4 / 3', md: '21 / 9' },
            borderRadius: 4,
            overflow: 'hidden',
            mb: { xs: 5, md: 8 },
          }}
        >
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 6 },
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              How the math works
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {highlights.map((line) => (
                <Stack key={line} direction="row" spacing={1.75}>
                  <CheckIcon sx={{ color: 'primary.main', mt: '3px' }} />
                  <Typography variant="body1">{line}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Surface interactive={false}>
            <Typography variant="h5" gutterBottom>
              Staying with us
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Codes for the building, the pool area and unit 252 are all sent to
              you at check-in. The front desk in the lobby belongs to the
              building, not to us, so bring any questions straight to the
              contact details in your check-in message.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              href={BOOKING_URL_TRACKED}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1 }}
            >
              Check Availability
            </Button>
          </Surface>
        </Box>

        <Box sx={{ mt: { xs: 7, md: 10 }, maxWidth: 900, mx: 'auto' }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Take the tour
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 4 }}
          >
            A quick walk through the condo before you arrive.
          </Typography>
          <VideoEmbed id="Q31Ft3RZtDI" title="Condo tour video" />
        </Box>
      </Container>
    </>
  );
}
