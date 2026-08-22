'use client';
import * as React from 'react';
import Image from 'next/image';
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import Surface from './Surface';
import DirectionsButton from './DirectionsButton';

/**
 * Attribution for a photo. Most free-to-use licences (anything CC BY or
 * CC BY-SA) require the credit to be shown next to the image, so this is a
 * field rather than something buried in a comment.
 */
export type PhotoCredit = {
  /** e.g. "Jane Doe / Wikimedia Commons (CC BY-SA 4.0)" */
  text: string;
  /** Link back to the source page, where the licence requires it. */
  url?: string;
};

export type Place = {
  name: string;
  /** Short orientation line: how far away it is, or what kind of place it is. */
  note: string;
  description: string;
  /** Street address, shown on the card and used for the directions button. */
  address?: string;
  /**
   * Optional photo. Cards without one simply have no banner, so the grid
   * stays tidy while photos are added a few at a time.
   */
  image?: { src: string; alt: string; credit?: PhotoCredit };
  links?: { text: string; url: string }[];
};

export default function PlaceCard({ place }: { place: Place }) {
  // Every place gets directions. Without a street address on file we send
  // the maps app the name and the town, which resolves for all of these.
  const destination = place.address ?? `${place.name}, Myrtle Beach, SC`;
  const { image } = place;

  return (
    <Surface
      sx={{
        p: 0,
        height: 'auto',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {image && (
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '16 / 9',
            bgcolor: 'action.hover',
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      )}

      <Box
        sx={{
          p: { xs: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {image?.credit && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mb: 1.5 }}
          >
            Photo:{' '}
            {image.credit.url ? (
              <MuiLink
                href={image.credit.url}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                {image.credit.text}
              </MuiLink>
            ) : (
              image.credit.text
            )}
          </Typography>
        )}

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
      </Box>
    </Surface>
  );
}
