'use client';
import * as React from 'react';
import {
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalkOutlined';
import CastleIcon from '@mui/icons-material/CastleOutlined';
import GolfCourseIcon from '@mui/icons-material/GolfCourseOutlined';
import PhishingIcon from '@mui/icons-material/PhishingOutlined';
import StorefrontIcon from '@mui/icons-material/StorefrontOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import PageHeader from '../components/ui/PageHeader';
import Surface from '../components/ui/Surface';

type Activity = {
  title: string;
  distance: string;
  icon: React.ReactNode;
  description: string;
  links?: { text: string; url: string }[];
};

const activities: Activity[] = [
  {
    title: 'The Boardwalk',
    distance: '2 blocks south',
    icon: <DirectionsWalkIcon />,
    description:
      'At 14th Avenue N, and perfect for a sunrise walk or run — under three miles round trip. Pull up the live cams and see if you can spot your family on the beach.',
    links: [
      {
        text: 'Myrtle Beach cam — north',
        url: 'https://www.earthcam.com/usa/southcarolina/myrtlebeach/',
      },
      {
        text: 'Myrtle Beach cam — volleyball',
        url: 'https://www.earthcam.com/usa/southcarolina/myrtlebeach/volleyball/',
      },
    ],
  },
  {
    title: 'Second Avenue Pier',
    distance: 'Walking distance',
    icon: <PhishingIcon />,
    description:
      'Fishing rentals are available and no licence is required. Worth the walk for the views alone, and there is a restaurant at the end of it.',
  },
  {
    title: 'Golf',
    distance: 'Within 20 minutes',
    icon: <GolfCourseIcon />,
    description:
      'More than ten courses sit within a twenty-minute drive, so you can pick by mood rather than by distance.',
    links: [
      {
        text: 'Topgolf — good for golfers and non-golfers alike',
        url: 'https://topgolf.com/us/myrtle-beach/',
      },
      {
        text: 'River Oaks Golf Club — club rentals $20 a set',
        url: 'https://www.riveroaksgolf.com/',
      },
      {
        text: 'Arrowhead Country Club — club rentals $30 a set',
        url: 'https://arrowheadcc.com/',
      },
    ],
  },
  {
    title: 'Medieval Times',
    distance: 'Short drive',
    icon: <CastleIcon />,
    description:
      'A family-friendly feast and tournament in the style of an 11th-century banquet: four courses while you cheer on one of six jousting knights. Book early — it fills up.',
  },
  {
    title: 'Broadway at the Beach',
    distance: 'Short drive',
    icon: <StorefrontIcon />,
    description:
      'Over seventy shops with clothing, gifts, snacks and art, plus attractions, restaurants and theatres if the weather turns.',
  },
];

export default function ActivitiesContent() {
  return (
    <>
      <PageHeader
        eyebrow="Around the condo"
        title="Our favourite things to do in Myrtle Beach."
        lead="A short list we keep coming back to, roughly in order of how far you have to go."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          }}
        >
          {activities.map((activity) => (
            <Surface key={activity.title}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
                sx={{ mb: 2 }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    flexShrink: 0,
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                  }}
                >
                  {activity.icon}
                </Box>
                <Box>
                  <Typography variant="h5">{activity.title}</Typography>
                  <Typography variant="overline" color="text.secondary">
                    {activity.distance}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="body1" color="text.secondary">
                {activity.description}
              </Typography>

              {activity.links && (
                <Stack spacing={1} sx={{ mt: 2.5 }}>
                  {activity.links.map((link) => (
                    <MuiLink
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        color: 'primary.main',
                      }}
                    >
                      {link.text}
                      <LaunchIcon sx={{ fontSize: 15 }} />
                    </MuiLink>
                  ))}
                </Stack>
              )}
            </Surface>
          ))}
        </Box>
      </Container>
    </>
  );
}
