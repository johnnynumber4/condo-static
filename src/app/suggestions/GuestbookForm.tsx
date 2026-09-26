'use client';
import * as React from 'react';
import { useActionState } from 'react';
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Surface from '../components/ui/Surface';
import { LIMITS } from '../lib/guestbook';
import { submitEntry, type FormState } from './actions';

export default function GuestbookForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitEntry,
    { status: 'idle' }
  );

  if (state.status === 'sent') {
    return (
      <Surface interactive={false}>
        <Typography variant="h6" component="h2" gutterBottom>
          Thank you.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We read every note before it goes up, so yours will not appear here
          straight away. If you told us something we should fix, we would rather
          hear it than see it on a review site, and we will act on it.
        </Typography>
      </Surface>
    );
  }

  return (
    <Surface interactive={false} component="section">
      <Typography variant="h6" component="h2" gutterBottom>
        Leave a note
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Notes are read before they go up, so there is a day or so between
        writing one and seeing it here.
      </Typography>

      <Box component="form" action={formAction}>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
            <TextField
              name="name"
              label="Your name"
              required
              fullWidth
              size="small"
              autoComplete="name"
              slotProps={{ htmlInput: { maxLength: LIMITS.name } }}
            />
            <TextField
              name="stayed"
              label="When you stayed"
              placeholder="August 2026"
              fullWidth
              size="small"
              helperText="Optional"
              slotProps={{ htmlInput: { maxLength: LIMITS.stayed } }}
            />
          </Stack>

          <TextField
            name="note"
            label="Your note"
            required
            fullWidth
            multiline
            minRows={4}
            slotProps={{ htmlInput: { maxLength: LIMITS.note } }}
          />

          {/* Honeypot. Hidden from sight and from screen readers, and skipped
              by tabbing, so no guest can fill it in by accident. Bots that
              fill every field on the page give themselves away. */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              left: '-9999px',
              width: 1,
              height: 1,
              overflow: 'hidden',
            }}
          >
            <label>
              Website
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </Box>

          {state.status === 'error' && (
            <Alert severity="error">{state.message}</Alert>
          )}

          <Box>
            <Button type="submit" variant="contained" disabled={pending}>
              {pending ? 'Sending…' : 'Send it'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Surface>
  );
}
