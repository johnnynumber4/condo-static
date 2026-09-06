'use client';
import * as React from 'react';
import { useFormStatus } from 'react-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Surface from '../components/ui/Surface';
import type { ModeratedEntry } from '../lib/guestbook';
import { hideEntry, publishEntry, removeEntry } from './guestbook-actions';

function ActionButton({
  children,
  color,
  variant = 'text',
}: {
  children: React.ReactNode;
  color?: 'primary' | 'error';
  variant?: 'text' | 'contained';
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="small"
      color={color}
      variant={variant}
      disabled={pending}
    >
      {children}
    </Button>
  );
}

function EntryActions({ entry }: { entry: ModeratedEntry }) {
  if (entry.curated) {
    return (
      <Typography variant="caption" color="text.secondary">
        In <code>guestbook.ts</code>, edit it there
      </Typography>
    );
  }
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        component="form"
        action={entry.approved ? hideEntry : publishEntry}
        sx={{ display: 'inline' }}
      >
        <input type="hidden" name="id" value={entry.id} />
        <ActionButton variant={entry.approved ? 'text' : 'contained'}>
          {entry.approved ? 'Hide' : 'Publish'}
        </ActionButton>
      </Box>
      <Box component="form" action={removeEntry} sx={{ display: 'inline' }}>
        <input type="hidden" name="id" value={entry.id} />
        <ActionButton color="error">Delete</ActionButton>
      </Box>
    </Stack>
  );
}

function EntryRow({ entry }: { entry: ModeratedEntry }) {
  return (
    <Box sx={{ py: 2.5 }}>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ mb: 1, flexWrap: 'wrap', rowGap: 1 }}
      >
        <Typography variant="subtitle2" component="span">
          {entry.name}
        </Typography>
        {entry.stayed && (
          <Typography variant="caption" color="text.secondary">
            {entry.stayed}
          </Typography>
        )}
        {entry.createdAt && (
          <Typography variant="caption" color="text.secondary">
            {new Date(entry.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        )}
        <Chip
          size="small"
          label={entry.curated ? 'In git' : entry.approved ? 'Live' : 'Waiting'}
          color={entry.approved ? 'success' : 'default'}
          variant="outlined"
        />
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ whiteSpace: 'pre-line', mb: 1.5 }}
      >
        {entry.note}
      </Typography>
      <EntryActions entry={entry} />
    </Box>
  );
}

export default function GuestbookModeration({
  entries,
  configured,
  error,
}: {
  entries: ModeratedEntry[];
  configured: boolean;
  error?: string;
}) {
  const waiting = entries.filter((e) => !e.approved);
  const live = entries.filter((e) => e.approved);

  return (
    <Container maxWidth="md" sx={{ pb: { xs: 5, md: 8 } }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Guest book
      </Typography>

      {!configured && (
        <Alert severity="info">
          Set <code>MONGODB_URI</code> in the Vercel project settings to turn
          the guest book on. Until then the page tells guests it is not taking
          notes rather than showing them a form that would lose what they wrote.
        </Alert>
      )}

      {configured && error && (
        <Alert severity="error">
          The guest book database did not answer: {error}
        </Alert>
      )}

      {configured && !error && (
        <Surface interactive={false}>
          {/* Unlike the switches above, these buttons change the live site
              straight away. There is no file to commit. */}
          <Alert severity="warning" sx={{ mb: 2 }}>
            These buttons take effect immediately. Publishing a note puts it on{' '}
            <code>/suggestions</code> for everyone; deleting one cannot be
            undone.
          </Alert>

          <Typography variant="overline" color="text.secondary">
            Waiting for you ({waiting.length})
          </Typography>
          {waiting.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
              Nothing waiting. New notes land here before anyone can see them.
            </Typography>
          ) : (
            <Stack divider={<Divider />}>
              {waiting.map((e) => (
                <EntryRow key={e.id} entry={e} />
              ))}
            </Stack>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="overline" color="text.secondary">
            Live on the site ({live.length})
          </Typography>
          {live.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
              Nothing published yet.
            </Typography>
          ) : (
            <Stack divider={<Divider />}>
              {live.map((e) => (
                <EntryRow key={e.id} entry={e} />
              ))}
            </Stack>
          )}
        </Surface>
      )}
    </Container>
  );
}
