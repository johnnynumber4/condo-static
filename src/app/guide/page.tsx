'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Home as HomeIcon } from '@mui/icons-material';

export default function Guide() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 2 }} />
          Condo Guide
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Welcome to Your Stay
          </Typography>
          <Typography variant="body1" paragraph>
            This guide contains everything you need to know about the condo and
            its amenities. Please take a moment to familiarize yourself with the
            information provided.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Accessing the Condo:
          </Typography>
          <Typography variant="body1" paragraph>
            Use the side door to the left (as you are facing the building). The
            first door is the stairs, but the elevator is right there.
          </Typography>
          <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
            <iframe
              src="https://www.youtube.com/embed/ECX7Ro45dYs"
              title="Accessing the Condo"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
          <Typography variant="body1" paragraph>
            Note: All codes will be provided at check in. There is a code for
            entering the building, pool area, and unit 252.
          </Typography>
          <Typography variant="body1" paragraph>
            If you enter through the front door, please note that the people at
            the front desk do not work for the condo and will not be able to
            assist you. Please use the contact information provided at check in
            with any questions!
          </Typography>

          <Typography variant="h6" gutterBottom>
            Master Bedroom Bonus Bed:
          </Typography>
          <Typography variant="body1" paragraph>
            In the Master Bedroom, there is a bonus bed! If you are in need of
            an extra spot for someone to sleep, the chair folds out.
          </Typography>
          <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
            <iframe
              src="https://www.youtube.com/embed/7ktrvxy2I7E"
              title="Master Bedroom Bonus Bed"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
