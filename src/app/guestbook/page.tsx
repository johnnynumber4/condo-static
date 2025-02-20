'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Book as BookIcon } from '@mui/icons-material';

export default function GuestBook() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <BookIcon sx={{ mr: 2 }} />
          Guest Book
        </Typography>
        
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Share Your Experience
          </Typography>
          <Typography variant="body1" paragraph>
            Coming soon: Leave your comments and read about other guests' experiences at Paradise 252.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
} 