'use client';
import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { shortLandscape } from '../../lib/theme';

/** Editorial masthead shared by every interior page. */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  maxWidth = 'lg',
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Match the container width of the page body so the left edges line up. */
  maxWidth?: 'md' | 'lg';
}) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: { xs: 6, md: 9 },
        position: 'relative',
        overflow: 'hidden',
        [shortLandscape]: { py: 3.5 },
      }}
    >
      {/* soft sun-glow in the corner, purely decorative */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -160,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(217,100,48,0.16), transparent 68%)',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth={maxWidth} sx={{ position: 'relative' }}>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}
        >
          {eyebrow}
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '2.25rem', md: '3.25rem' },
            maxWidth: 760,
            [shortLandscape]: { fontSize: '2rem' },
          }}
        >
          {title}
        </Typography>
        {lead && (
          <Typography
            variant="subtitle1"
            component="p"
            color="text.secondary"
            sx={{
              mt: 2.5,
              maxWidth: 620,
              fontSize: '1.1rem',
              [shortLandscape]: { mt: 1.5, fontSize: '1rem' },
            }}
          >
            {lead}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
