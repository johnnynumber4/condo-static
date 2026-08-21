'use client';
import * as React from 'react';
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/DirectionsOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import Surface from './Surface';

export type Place = {
  name: string;
  /** Short orientation line — how far away it is, or what kind of place it is. */
  note: string;
  description: string;
  /** Street address, shown on the card and used for the directions link. */
  address?: string;
  links?: { text: string; url: string }[];
};

/** Builds a Google Maps search link, falling back to the name when we have
 *  no street address on file. */
function mapsUrl(place: Place) {
  const query = place.address ?? `${place.name}, Myrtle Beach, SC`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <Surface sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="overline"
        sx={{ color: 'secondary.main', display: 'block', mb: 0.5 }}
      >
        {place.note}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {place.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ flex: 1 }}>
        {place.description}
      </Typography>

      {place.links && (
        <Stack spacing={0.75} sx={{ mt: 2 }}>
          {place.links.map((link) => (
            <MuiLink
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                color: 'primary.main',
              }}
            >
              {link.text}
              <LaunchIcon sx={{ fontSize: 15 }} />
            </MuiLink>
          ))}
        </Stack>
      )}

      <Box
        sx={{
          mt: 2.5,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <MuiLink
          href={mapsUrl(place)}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'text.secondary',
            fontSize: '0.9rem',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <DirectionsIcon sx={{ fontSize: 18 }} />
          {place.address ?? 'Find on the map'}
        </MuiLink>
      </Box>
    </Surface>
  );
}
