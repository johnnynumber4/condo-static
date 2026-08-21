'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import ExploreIcon from '@mui/icons-material/ExploreOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import RestaurantIcon from '@mui/icons-material/RestaurantOutlined';
import GavelIcon from '@mui/icons-material/GavelOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Surface from './components/ui/Surface';
import Gallery from './components/Gallery';
import { BOOKING_URL_TRACKED, site } from './lib/site';
import { heroPhoto } from './lib/gallery';

const paradiseMath = [
  {
    figure: '2',
    label: 'Great rooms',
    body: 'Both with direct ocean views and a balcony of their own.',
  },
  {
    figure: '5',
    label: 'Ways to swim',
    body: 'Indoor pool, jacuzzi, kiddie pool, lazy river — and the Atlantic.',
  },
  {
    figure: '2',
    label: 'Minute walk',
    body: 'Shops, restaurants and the boardwalk are right outside.',
  },
];

const sections = [
  {
    href: '/guide',
    icon: <MenuBookIcon />,
    title: 'Condo Guide',
    body: 'Getting in the building, the bonus bed, and how everything works.',
  },
  {
    href: '/activities',
    icon: <ExploreIcon />,
    title: 'Activities',
    body: 'Our favourite things to do, from the boardwalk to the golf courses.',
  },
  {
    href: '/food',
    icon: <RestaurantIcon />,
    title: 'Eat & Drink',
    body: 'Seafood buffets, the walkable Austrian place, and the breweries.',
  },
  {
    href: '/groceries',
    icon: <ShoppingBasketIcon />,
    title: 'Groceries',
    body: 'Where to stock the kitchen, with a map for each store.',
  },
  {
    href: '/info',
    icon: <GavelIcon />,
    title: 'House Rules',
    body: 'The short list of things to know before you settle in.',
  },
];

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: '92svh', md: '88svh' },
          display: 'flex',
          alignItems: 'flex-end',
          color: '#fff',
        }}
      >
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(9,24,29,0.62) 0%, rgba(9,24,29,0.28) 38%, rgba(9,24,29,0.86) 100%)',
          }}
        />
        <Container
          maxWidth="lg"
          sx={{ position: 'relative', pb: { xs: 8, md: 12 }, pt: 18 }}
        >
          <Typography
            variant="overline"
            sx={{ display: 'block', mb: 2, opacity: 0.9 }}
          >
            Myrtle Beach · Oceanfront · Unit 252
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
              maxWidth: 900,
              textWrap: 'balance',
            }}
          >
            Your home away from home, right on the sand.
          </Typography>
          <Typography
            sx={{
              mt: 3,
              maxWidth: 560,
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              opacity: 0.92,
            }}
          >
            Two bedrooms, two balconies, five ways to swim and a two-minute walk
            to the boardwalk. We are unit 252 — but we think 2 + 5 + 2 =
            paradise.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mt: 5 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href={BOOKING_URL_TRACKED}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Stay
            </Button>
            <Button
              component={Link}
              href="/about"
              variant="outlined"
              size="large"
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.6)',
                '&:hover': {
                  borderColor: '#fff',
                  bgcolor: 'rgba(255,255,255,0.12)',
                },
              }}
            >
              Meet your hosts
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* ------------------------------------------------------- 2 + 5 + 2 math */}
      <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}
          >
            The Paradise math
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, maxWidth: 620 }}
          >
            We are unit 252. Here is how that adds up.
          </Typography>

          <Box
            sx={{
              mt: { xs: 4, md: 6 },
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
                <Typography variant="h6" sx={{ mt: 1.5 }}>
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
        </Container>
      </Box>

      {/* -------------------------------------------------------------- gallery */}
      <Gallery />

      {/* ------------------------------------------------------ manual sections */}
      {/* Banded so the page keeps its alternating rhythm whether or not the
          gallery above it has any photos to show yet. */}
      <Box
        component="section"
        sx={{
          py: { xs: 7, md: 10 },
          bgcolor: 'background.paper',
          borderBlock: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}
          >
            Guest manual
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, maxWidth: 620 }}
          >
            Everything you need for the week.
          </Typography>

          <Box
            sx={{
              mt: { xs: 4, md: 6 },
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
            }}
          >
            {sections.map((section) => (
              <Surface
                key={section.href}
                component={Link}
                href={section.href}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{section.icon}</Box>
                <Typography variant="h6">{section.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, mb: 3, flex: 1 }}
                >
                  {section.body}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.75}
                  sx={{ color: 'primary.main', fontWeight: 600 }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Open
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: 17 }} />
                </Stack>
              </Surface>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ------------------------------------------------------------ closing cta */}
      <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              borderRadius: 4,
              px: { xs: 4, md: 8 },
              py: { xs: 6, md: 9 },
              textAlign: 'center',
              color: '#fff',
              background:
                'linear-gradient(125deg, #08464A 0%, #0E6B70 52%, #17868A 100%)',
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' } }}
            >
              Ready when you are.
            </Typography>
            <Typography
              sx={{ mt: 2, opacity: 0.92, maxWidth: 520, mx: 'auto' }}
            >
              {site.description}
            </Typography>
            <Button
              variant="contained"
              size="large"
              href={BOOKING_URL_TRACKED}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mt: 4,
                bgcolor: '#fff',
                color: '#0A5054',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.88)' },
              }}
            >
              Check Availability
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
