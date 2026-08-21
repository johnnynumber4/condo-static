'use client';
import * as React from 'react';
import { Link as MuiLink, Stack, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import Surface from './Surface';
import DirectionsButton from './DirectionsButton';

export type Place = {
  name: string;
  /** Short orientation line: how far away it is, or what kind of place it is. */
  note: string;
  description: string;
  /** Street address, shown on the card and used for the directions button. */
  address?: string;
  links?: { text: string; url: string }[];
};

export default function PlaceCard({ place }: { place: Place }) {
  // Every place gets directions. Without a street address on file we send
  // the maps app the name and the town, which resolves for all of these.
  const destination = place.address ?? `${place.name}, Myrtle Beach, SC`;

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
                width: 'fit-content',
              }}
            >
              {link.text}
              <LaunchIcon sx={{ fontSize: 15 }} />
            </MuiLink>
          ))}
        </Stack>
      )}

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        useFlexGap
        flexWrap="wrap"
        sx={{
          mt: 2.5,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {place.address && (
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ color: 'text.secondary' }}
          >
            <PlaceIcon sx={{ fontSize: 18, mt: '1px' }} />
            <Typography variant="body2" color="text.secondary">
              {place.address}
            </Typography>
          </Stack>
        )}
        <DirectionsButton destination={destination} name={place.name} />
      </Stack>
    </Surface>
  );
}
