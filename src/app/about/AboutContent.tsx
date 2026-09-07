'use client';
import * as React from 'react';
import Image from 'next/image';
import { Box, Button, Container, Typography } from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import { shortLandscape } from '../lib/theme';
import Surface from '../components/ui/Surface';
import VideoEmbed from '../components/ui/VideoEmbed';
import { BOOKING_URL_TRACKED } from '../lib/site';
import { heroPhoto } from '../lib/gallery';

/** The 2 + 5 + 2 of the page title, spelled out. This used to open the home
 *  page, but it is really the hosts introducing the place, so it lives here
 *  with the rest of that introduction. */
const paradiseMath = [
  {
    figure: '2',
    label: 'Great rooms',
    body: 'Both with direct ocean views and a balcony of their own.',
  },
  {
    figure: '5',
    label: 'Ways to swim',
    body: 'Indoor pool, jacuzzi, kiddie pool, lazy river, and the Atlantic.',
  },
  {
    figure: '2',
    label: 'Minute walk',
    body: 'Shops, restaurants and the boardwalk are right outside.',
  },
];

export default function AboutContent() {
  return (
    <>
      <PageHeader
        eyebrow="Your hosts"
        title="We are unit 252, but we think 2 + 5 + 2 = paradise."
        lead="We hope you enjoy your stay as much as we enjoy coming down here. This site doubles as the house manual, so keep it handy while you are here."
      />

      <Container
        maxWidth="lg"
        sx={{ py: { xs: 6, md: 9 }, [shortLandscape]: { py: 4 } }}
      >
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

        <Box component="section">
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}
          >
            The Paradise math
          </Typography>
          <Typography variant="h4" component="h2">
            Here is how that adds up.
          </Typography>

          <Box
            sx={{
              mt: { xs: 4, md: 5 },
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            }}
          >
            {paradiseMath.map((item) => (
              <Surface key={item.label} interactive={false}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: '3.5rem',
                    lineHeight: 1,
                    color: 'secondary.main',
                  }}
                >
                  {item.figure}
                </Typography>
                <Typography variant="h6" component="h3" sx={{ mt: 1.5 }}>
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {item.body}
                </Typography>
              </Surface>
            ))}
          </Box>
        </Box>

        {/* Held to a readable width: stretched across the whole lg
            container this card reads as a banner, not a note. */}
        <Box sx={{ mt: { xs: 5, md: 8 }, maxWidth: 720 }}>
          <Surface interactive={false}>
            <Typography variant="h5" component="h2" gutterBottom>
              Staying with us
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Codes for the building, the pool area and unit 252 are all sent to
              you at check-in. Use the contact details from that message with
              any questions.
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
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center' }}
          >
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
