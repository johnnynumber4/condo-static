'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

const groceryStores = [
  {
    name: "Walmart Neighborhood Market",
    description: "Find all you need at this one stop shop conveniently located close to the condo. Walmart allows you to grab your usual comforts as well as features a gas station for a quick, cheaper fill up.",
    coordinates: "33.70274,-78.9122"
  },
  {
    name: "Food Lion",
    description: "Food Lion is a popular east coast grocery store for all of your grocery needs.",
    coordinates: "33.7249,-78.8683"
  },
  {
    name: "Piggly Wiggly",
    description: "Piggly Wiggly is located on Kings Highway, a hop and a skip from the condo. This is a fairly small and very convenient grocery store for your grab and go purchases.",
    coordinates: "33.69947,-78.8747"
  },
  {
    name: "Costco Wholesale",
    description: "Costco requires a membership to enter and make purchases. Costco Wholesale is conveniently located nearby allowing you to purchase some local deals as well as your usual home Costco comforts.",
    coordinates: "33.70532,-78.9159"
  }
];

export default function Groceries() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingCartIcon sx={{ mr: 2 }} />
          Grocery Stores
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
          Convenient grocery options near the condo
        </Typography>

        <Grid container spacing={3}>
          {groceryStores.map((store, index) => (
            <Grid item xs={12} key={index}>
              <Paper 
                sx={{ 
                  p: 4,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {store.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {store.description}
                </Typography>
                <Box sx={{ 
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 Aspect Ratio
                  width: '100%',
                  borderRadius: 1,
                  overflow: 'hidden'
                }}>
                  <iframe 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0
                    }}
                    src={`https://maps.google.com/maps?q=${store.coordinates}&hl=es;&output=embed`}
                    title={`Map showing ${store.name}`}
                    allowFullScreen
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
} 