'use client';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalkOutlined';
import TheaterIcon from '@mui/icons-material/TheaterComedyOutlined';
import GolfCourseIcon from '@mui/icons-material/GolfCourseOutlined';
import SportsBowlingIcon from '@mui/icons-material/SportsEsportsOutlined';
import MapIcon from '@mui/icons-material/MapOutlined';
import PageHeader from '../components/ui/PageHeader';
import { shortLandscape } from '../lib/theme';

// Icons live with the page rather than the data so the data module stays
// plain TypeScript that the admin page can import.
const ICONS: Record<string, React.ReactNode> = {
  nearby: <DirectionsWalkIcon />,
  shows: <TheaterIcon />,
  golf: <GolfCourseIcon />,
  indoors: <SportsBowlingIcon />,
  'day-trips': <MapIcon />,
};
import PlaceCard from '../components/ui/PlaceCard';
import { activityCategories } from '../lib/activities';
import { isVisible, orderPlaces } from '../lib/visibility';

export default function ActivitiesContent() {
  // Hidden places drop out, and a category left with nothing drops out too
  // rather than rendering a heading over an empty grid.
  const categories = activityCategories
    .map((c) => ({
      ...c,
      places: orderPlaces(
        c.id,
        c.places.filter((p) => isVisible(p.id))
      ),
    }))
    .filter((c) => c.places.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Around the condo"
        title="Our favorite things to do in Myrtle Beach."
        lead="Grouped by how far you have to go, starting with what you can reach on foot."
      />

      <Container
        maxWidth="lg"
        sx={{ py: { xs: 6, md: 9 }, [shortLandscape]: { py: 4 } }}
      >
        <Stack spacing={{ xs: 7, md: 10 }}>
          {categories.map((category) => (
            <Box key={category.id} id={category.id}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ color: 'primary.main', mb: 1 }}
              >
                {ICONS[category.id]}
                <Typography variant="overline">{category.title}</Typography>
              </Stack>
              <Typography
                variant="h4"
                sx={{ mb: 1, fontSize: { xs: '1.6rem', md: '2rem' } }}
              >
                {category.blurb}
              </Typography>

              <Box
                sx={{
                  mt: 3.5,
                  display: 'grid',
                  gap: 3,
                  alignItems: 'start',
                  // Two across, not three: these cards carry a paragraph
                  // plus an address, and three columns wrapped every title.
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(2, 1fr)',
                  },
                }}
              >
                {category.places.map((place) => (
                  <PlaceCard key={place.name} place={place} />
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </>
  );
}
