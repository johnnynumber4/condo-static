'use client';
import * as React from 'react';
import { useActionState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import Surface from '../components/ui/Surface';
import { signIn } from './actions';

export default function SignInForm() {
  const [error, formAction, pending] = useActionState(signIn, undefined);

  return (
    <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
      <Surface interactive={false}>
        <Box sx={{ color: 'primary.main', mb: 2 }}>
          <LockIcon />
        </Box>
        <Typography variant="h5" gutterBottom>
          Site settings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          For the owners. Nothing here changes the site until you commit the
          config it gives you.
        </Typography>

        <Box component="form" action={formAction}>
          <TextField
            name="password"
            type="password"
            label="Password"
            fullWidth
            autoFocus
            autoComplete="current-password"
            size="small"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={pending}
            sx={{ mt: 2.5 }}
          >
            {pending ? 'Checking…' : 'Sign in'}
          </Button>
        </Box>
      </Surface>
    </Container>
  );
}
