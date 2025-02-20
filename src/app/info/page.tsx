'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Info as InfoIcon } from '@mui/icons-material';

export default function ImportantInfo() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <InfoIcon sx={{ mr: 2 }} />
          Important Information
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Emergency Contacts
          </Typography>
          <Typography variant="body1" paragraph>
            Coming soon: Emergency numbers, local services, and important
            contacts.
          </Typography>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            House Rules
          </Typography>
          <Typography variant="body1" paragraph>
            Coming soon: Guidelines and rules for your stay.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
