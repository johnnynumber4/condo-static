'use client';
import * as React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { BOOKING_URL_TRACKED, navItems, site } from '../lib/site';
import DirectionsButton from './ui/DirectionsButton';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        pt: { xs: 6, md: 8 },
        pb: 5,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 6 }}
          justifyContent="space-between"
        >
          <Box sx={{ maxWidth: 380 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {site.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              {site.description}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              href={BOOKING_URL_TRACKED}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Availability
            </Button>
          </Box>

          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', mb: 1.5 }}
            >
              Guest Manual
            </Typography>
            <Stack spacing={1}>
              {navItems.map((item) => (
                <Typography
                  key={item.href}
                  component={Link}
                  href={item.href}
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {item.text}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', mb: 1.5 }}
            >
              Where to find us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Atlantica Towers II, Unit 252
              <br />
              {site.address}
            </Typography>
            <DirectionsButton destination={site.address} name={site.fullName} />
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {site.fullName}. Codes for the building,
          pool and unit are provided at check-in.
        </Typography>
      </Container>
    </Box>
  );
}
