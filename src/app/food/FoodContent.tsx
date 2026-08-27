'use client';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfastOutlined';
import SetMealIcon from '@mui/icons-material/SetMealOutlined';
import RestaurantIcon from '@mui/icons-material/RestaurantOutlined';
import SportsBarIcon from '@mui/icons-material/SportsBarOutlined';
import PageHeader from '../components/ui/PageHeader';
import { shortLandscape } from '../lib/theme';

const ICONS: Record<string, React.ReactNode> = {
  breakfast: <FreeBreakfastIcon />,
  buffets: <SetMealIcon />,
  local: <RestaurantIcon />,
  breweries: <SportsBarIcon />,
};
import PlaceCard from '../components/ui/PlaceCard';
import { foodCategories } from '../lib/food';
import { isVisible, orderPlaces } from '../lib/visibility';
import Surface from '../components/ui/Surface';

export default function FoodContent() {
  const categories = foodCategories
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
        eyebrow="Eat and drink"
        title="Where we eat when we are down here."
        lead="Myrtle Beach runs on all-you-can-eat seafood, but there is more to it than that. Here is the short list."
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

        <Surface
          interactive={false}
          sx={{
            mt: { xs: 7, md: 10 },
            borderLeft: '4px solid',
            borderLeftColor: 'secondary.main',
          }}
        >
          <Typography variant="h6" gutterBottom>
            A note on the buffets
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The big Calabash buffets are busiest between six and eight in the
            evening in summer, and most of them do not take reservations. Going
            early, or after eight, is the difference between walking in and
            waiting an hour.
          </Typography>
        </Surface>
      </Container>
    </>
  );
}
