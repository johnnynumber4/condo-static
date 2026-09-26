'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';

/** 16:9 YouTube embed with an optional caption underneath. */
export default function VideoEmbed({
  id,
  title,
  caption,
}: {
  id: string;
  title: string;
  caption?: string;
}) {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'action.hover',
        }}
      >
        <Box
          component="iframe"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      </Box>
      {caption && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1.5, textAlign: 'center' }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}
