'use client';
import * as React from 'react';
import Paper, { type PaperProps } from '@mui/material/Paper';

type SurfaceProps = PaperProps & {
  /** Lift the card on hover. Turn off for panels that are not links. */
  interactive?: boolean;
  /** Render as another element, such as `Link` for cards that navigate. */
  component?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
};

/** The card used throughout the site: a bordered panel with an optional lift. */
export default function Surface({
  interactive = true,
  sx,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 3, md: 4 },
        height: '100%',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'transform .25s ease, box-shadow .25s ease',
        ...(interactive && {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 18px 40px -24px rgba(10, 40, 46, 0.45)',
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
}
