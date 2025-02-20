'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { 
  LocationOn as LocationIcon,
  DirectionsWalk as WalkIcon,
  GolfCourse as GolfIcon,
  Restaurant as RestaurantIcon,
  Store as StoreIcon
} from '@mui/icons-material';

const activities = [
  {
    title: "The Boardwalk",
    icon: <WalkIcon />,
    description: "Just 2 blocks south at 14th Avenue N. Perfect for sunrise walks or runs, less than 3 miles total. Watch the live webcams to spot your family!",
    links: [
      { text: "Myrtle Beach Cam North", url: "https://www.earthcam.com/usa/southcarolina/myrtlebeach/" },
      { text: "Myrtle Beach Cam Volleyball", url: "https://www.earthcam.com/usa/southcarolina/myrtlebeach/volleyball/" }
    ]
  },
  {
    title: "Medieval Times",
    icon: <LocationIcon />,
    description: "An exciting, family-friendly experience inspired by an 11th century feast and tournament. Guests enjoy a four-course banquet while cheering for one of six knights competing in the joust and other tests of skill. Book early as spots fill up quickly!"
  },
  {
    title: "Golf Options",
    icon: <GolfIcon />,
    description: "More than 10 courses within a 20-minute drive!",
    links: [
      { text: "Topgolf - Great for golfers and non-golfers!", url: "https://topgolf.com/us/myrtle-beach/" },
      { text: "River Oaks Golf Club (club rentals $20/set)", url: "https://www.riveroaksgolf.com/" },
      { text: "Arrowhead Country Club (club rentals $30/set)", url: "https://arrowheadcc.com/" }
    ]
  },
  {
    title: "Second Avenue Pier",
    icon: <RestaurantIcon />,
    description: "Walking distance from the condo. Fishing rentals available (no license required). Enjoy pier walks for great views or dine at the restaurant."
  },
  {
    title: "Broadway at the Beach",
    icon: <StoreIcon />,
    description: "Over 70 shops featuring clothing, gifts, snacks, art and much more! Includes attractions, entertainment, restaurants, and theaters."
  }
];

export default function Activities() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationIcon sx={{ mr: 2 }} />
          Local Activities
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
          Check out some of our favorite things to do in Myrtle Beach
        </Typography>

        <Grid container spacing={3}>
          {activities.map((activity, index) => (
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
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, color: 'primary.main' }}>{activity.icon}</Box>
                  {activity.title}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  {activity.description}
                </Typography>

                {activity.links && (
                  <Box sx={{ mt: 2 }}>
                    {activity.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'block',
                          mb: 1,
                          color: 'primary.main',
                          '&:hover': {
                            color: 'primary.dark'
                          }
                        }}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
} 