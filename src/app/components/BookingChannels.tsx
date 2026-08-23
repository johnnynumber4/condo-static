'use client';
import * as React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { BookingChannel } from '../lib/booking';

/**
 * The "also bookable on" row beside a Book a Stay button.
 *
 * Renders nothing at all when no channel qualifies, so the surrounding layout
 * does not carry a gap while the extra listings are still switched off.
 */
export default function BookingChannels({
  channels,
  onDark = false,
  sx,
}: {
  channels: BookingChannel[];
  /** Over the hero photo, where everything has to be white. */
  onDark?: boolean;
  sx?: SxProps<Theme>;
}) {
  if (channels.length === 0) return null;

  return (
    <Box sx={sx}>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          color: onDark ? 'rgba(255,255,255,0.85)' : 'text.secondary',
        }}
      >
        Also bookable on
      </Typography>
      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
        {channels.map((channel) => (
          <Button
            key={channel.id}
            href={`/go/${channel.id}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            sx={{
              ...(onDark && {
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: '#fff',
                  bgcolor: 'rgba(255,255,255,0.12)',
                },
              }),
            }}
          >
            {channel.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
