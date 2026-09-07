'use client';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import KeyIcon from '@mui/icons-material/VpnKeyOutlined';
import BedIcon from '@mui/icons-material/KingBedOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import PageHeader from '../components/ui/PageHeader';
import { shortLandscape } from '../lib/theme';
import Surface from '../components/ui/Surface';
import DirectionsButton from '../components/ui/DirectionsButton';
import VideoEmbed from '../components/ui/VideoEmbed';
import { site } from '../lib/site';

type Section = {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  video?: { id: string; title: string; caption?: string };
};

const sections: Section[] = [
  {
    id: 'getting-in',
    icon: <KeyIcon />,
    title: 'Getting into the building',
    body: (
      <>
        <Typography variant="body1" paragraph>
          The front entrance is now open to all residents and guests, so you can
          walk straight in the front of the building.
        </Typography>
        <Typography variant="body1" paragraph>
          The side door on the left as you face the building works too, and it
          is the shortest walk to the elevator: the first door is the stairwell,
          and the elevator is right beside it. The video below shows that way
          in.
        </Typography>
        <Typography variant="body1">
          Use the contact details from your check-in message with any questions.
        </Typography>
      </>
    ),
    video: {
      id: 'ECX7Ro45dYs',
      title: 'Accessing the condo',
      caption: 'The side entrance and elevator',
    },
  },
  {
    id: 'bonus-bed',
    icon: <BedIcon />,
    title: 'The bonus bed',
    body: (
      <Typography variant="body1">
        The chair in the master bedroom folds out into an extra bed. If you need
        one more spot for someone to sleep, that is the one.
      </Typography>
    ),
    video: {
      id: '7ktrvxy2I7E',
      title: 'Master bedroom bonus bed',
      caption: 'Folding out the chair in the master bedroom',
    },
  },
];

export default function GuideContent() {
  return (
    <>
      <PageHeader
        eyebrow="Condo guide"
        title="Everything you need to know once you arrive."
        lead="Short answers to the questions guests ask most, with a video where it helps."
      />

      <Container
        maxWidth="lg"
        sx={{ py: { xs: 6, md: 9 }, [shortLandscape]: { py: 4 } }}
      >
        <Surface
          interactive={false}
          sx={{
            mb: { xs: 5, md: 7 },
            borderLeft: '4px solid',
            borderLeftColor: 'secondary.main',
          }}
        >
          <Stack direction="row" spacing={2}>
            <InfoIcon sx={{ color: 'secondary.main', mt: '2px' }} />
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                Address and codes
              </Typography>
              <Typography variant="body1" color="text.secondary">
                All codes are provided at check-in. There is a separate one for
                the building entrance, the pool area and unit 252 itself.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, fontWeight: 600 }}
              >
                {site.address}
              </Typography>
              <DirectionsButton
                destination={site.address}
                name={site.fullName}
                label="Directions to the condo"
                size="medium"
                sx={{ mt: 1.5 }}
              />
            </Box>
          </Stack>
        </Surface>

        <Stack spacing={{ xs: 6, md: 9 }}>
          {sections.map((section, index) => (
            <Box
              key={section.id}
              id={section.id}
              sx={{
                display: 'grid',
                gap: { xs: 3, md: 6 },
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  order: { xs: 1, md: index % 2 === 1 ? 2 : 1 },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ color: 'primary.main', mb: 1.5 }}
                >
                  {section.icon}
                  <Typography variant="overline">Step {index + 1}</Typography>
                </Stack>
                <Typography variant="h4" component="h2" gutterBottom>
                  {section.title}
                </Typography>
                <Box sx={{ color: 'text.secondary', mt: 2 }}>
                  {section.body}
                </Box>
              </Box>

              {section.video && (
                <Box sx={{ order: { xs: 2, md: index % 2 === 1 ? 1 : 2 } }}>
                  <VideoEmbed {...section.video} />
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Container>
    </>
  );
}
