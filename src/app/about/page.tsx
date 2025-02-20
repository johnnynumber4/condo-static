'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Cottage as CottageIcon } from '@mui/icons-material';
import Image from 'next/image';

export default function About() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CottageIcon sx={{ mr: 2 }} />
          About our Paradise
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Box
            sx={{
              position: 'relative',
              height: '400px',
              mb: 4,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src="/sunset-toast.jpg"
              alt="Sunset toast on the balcony"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
          </Box>

          <Typography variant="body1" paragraph>
            We are unit 252, but we think that 2+5+2 = PARADISE! This is how:
          </Typography>

          <List sx={{ pl: 2, mb: 3 }}>
            <ListItem sx={{ display: 'list-item' }}>
              2 great rooms, with direct ocean views & their own balcony
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              5 options for swimming (indoor pool, jacuzzi, kiddie pool, lazy
              river & ocean)
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              2 minute walk to shops, restaurants & the boardwalk
            </ListItem>
          </List>

          <Typography variant="body1" paragraph>
            We hope that you enjoy your stay as much as we like coming down
            here. This website acts as a house manual, please refer to it as
            needed to make your stay more comfortable.
          </Typography>
        </Paper>

        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%', // 16:9 Aspect Ratio
            width: '100%',
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            src="https://www.youtube.com/embed/Q31Ft3RZtDI"
            title="Condo Tour Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Box>
    </Container>
  );
}
