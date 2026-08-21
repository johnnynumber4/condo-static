'use client';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import KeyIcon from '@mui/icons-material/VpnKeyOutlined';
import BedIcon from '@mui/icons-material/KingBedOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import PageHeader from '../components/ui/PageHeader';
import Surface from '../components/ui/Surface';
import VideoEmbed from '../components/ui/VideoEmbed';

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
          Use the side door on the left as you face the building. The first door
          is the stairwell, and the elevator is right there beside it.
        </Typography>
        <Typography variant="body1">
          If you come in through the front door instead, note that the people at
          the front desk work for the building rather than for us — they will
          not be able to help with the unit. Use the contact details from your
          check-in message with any questions.
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

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
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
              <Typography variant="h6" gutterBottom>
                About the codes
              </Typography>
              <Typography variant="body1" color="text.secondary">
                All codes are provided at check-in. There is a separate one for
                the building entrance, the pool area and unit 252 itself.
              </Typography>
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
                <Typography variant="h4" gutterBottom>
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
