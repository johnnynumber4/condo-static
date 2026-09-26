'use client';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import DrawIcon from '@mui/icons-material/DrawOutlined';
import ConstructionIcon from '@mui/icons-material/ConstructionOutlined';
import PageHeader from '../components/ui/PageHeader';
import Surface from '../components/ui/Surface';
import { shortLandscape } from '../lib/theme';
import type { GuestbookEntry } from '../lib/guestbook';
import GuestbookForm from './GuestbookForm';

export default function SuggestionsContent({
  entries,
  writable,
}: {
  entries: GuestbookEntry[];
  writable: boolean;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Guest book"
        title="Say hey."
        maxWidth="md"
        lead="Tell us what you loved, what we missed, and anything you would want the next guests to know."
      />

      <Container
        maxWidth="md"
        sx={{ py: { xs: 6, md: 9 }, [shortLandscape]: { py: 4 } }}
      >
        {writable ? (
          <GuestbookForm />
        ) : (
          /* Honest about the state of it. A form that looked like it worked
             and quietly threw the note away would be worse than saying this. */
          <Surface
            interactive={false}
            sx={{ borderLeft: '4px solid', borderLeftColor: 'secondary.main' }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <ConstructionIcon sx={{ color: 'secondary.main', mt: '2px' }} />
              <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  Not taking notes right now
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  The part that lets you leave a note is having a moment. Use
                  the contact details from your check-in message and we will add
                  your note ourselves. We would rather tell you that than give
                  you a box that quietly loses what you wrote.
                </Typography>
              </Box>
            </Stack>
          </Surface>
        )}

        {entries.length > 0 && (
          <Box sx={{ mt: { xs: 5, md: 7 } }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ color: 'primary.main', mb: 2 }}
            >
              <DrawIcon />
              <Typography variant="overline">From past guests</Typography>
            </Stack>
            <Stack spacing={2.5}>
              {entries.map((entry) => (
                <Surface key={entry.id} interactive={false} component="figure">
                  <Typography
                    variant="body1"
                    component="blockquote"
                    sx={{ m: 0, fontSize: '1.1rem', whiteSpace: 'pre-line' }}
                  >
                    {entry.note}
                  </Typography>
                  <Typography
                    component="figcaption"
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1.5 }}
                  >
                    {entry.name}
                    {entry.stayed ? ` · ${entry.stayed}` : ''}
                  </Typography>
                </Surface>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </>
  );
}
