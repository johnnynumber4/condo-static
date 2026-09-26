'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';
import DirectionsIcon from '@mui/icons-material/DirectionsOutlined';
import { directionsUrl } from '../../lib/maps';

type Props = {
  /** Street address or "lat,lng" to navigate to. */
  destination: string;
  /** Place name, used for the accessible label. */
  name: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'contained' | 'text';
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

/**
 * The site's one directions control. A page can carry a dozen of these, and
 * "Get directions" on its own tells a screen-reader user nothing about which
 * one they are on, so the place name goes in the accessible label.
 *
 * Props are listed explicitly rather than extending ButtonProps: spreading
 * the full type pulls in MUI's polymorphic `component`, which breaks overload
 * resolution for the anchor props this always renders with.
 */
export default function DirectionsButton({
  destination,
  name,
  label = 'Get directions',
  size = 'small',
  variant = 'outlined',
  fullWidth,
  sx,
}: Props) {
  return (
    <Button
      href={directionsUrl(destination)}
      target="_blank"
      rel="noopener noreferrer"
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      startIcon={<DirectionsIcon />}
      aria-label={`Get directions to ${name}`}
      sx={{ flexShrink: 0, ...sx }}
    >
      {label}
    </Button>
  );
}
