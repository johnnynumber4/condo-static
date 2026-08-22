'use client';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import SmokeFreeIcon from '@mui/icons-material/SmokeFreeOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import TwoWheelerIcon from '@mui/icons-material/TwoWheelerOutlined';
import GroupsIcon from '@mui/icons-material/GroupsOutlined';
import CelebrationIcon from '@mui/icons-material/CelebrationOutlined';
import BadgeIcon from '@mui/icons-material/BadgeOutlined';
import ScheduleIcon from '@mui/icons-material/ScheduleOutlined';
import ReportIcon from '@mui/icons-material/ReportProblemOutlined';
import PageHeader from '../components/ui/PageHeader';
import { shortLandscape } from '../lib/theme';
import Surface from '../components/ui/Surface';

type Rule = {
  icon: React.ReactNode;
  title: string;
  detail: string;
  penalty?: string;
};

const rules: Rule[] = [
  {
    icon: <SmokeFreeIcon />,
    title: 'No smoking, indoors or on the balcony',
    detail:
      'This one matters most to us. Smoke lingers in the linens and the next guests notice.',
    penalty:
      '$250 fine plus the cleaning costs needed to remove the odour from the unit and linens.',
  },
  {
    icon: <LocalFireDepartmentIcon />,
    title: 'No grilling in the unit',
    detail: 'Building policy, and a fire risk in a high-rise.',
    penalty: '$200 fine.',
  },
  {
    icon: <TwoWheelerIcon />,
    title: 'No bicycles, motorcycles, mopeds or trailers',
    detail: 'None of these can be brought onto the property.',
  },
  {
    icon: <GroupsIcon />,
    title: 'Six people maximum',
    detail:
      'That is overnight guests and visitors combined. Larger gatherings may be grounds for eviction.',
  },
  {
    icon: <CelebrationIcon />,
    title: 'No house parties or illegal substances',
    detail: 'Both are grounds for immediate eviction.',
  },
  {
    icon: <BadgeIcon />,
    title: 'Guests must be 21 or older to book',
    detail: 'The person making the booking needs to be at least 21.',
  },
  {
    icon: <ScheduleIcon />,
    title: 'Leave on time',
    detail: 'Staying past check-out holds up the cleaners and the next guests.',
    penalty: 'Late check-out penalties start at $500.',
  },
];

export default function InfoContent() {
  return (
    <>
      <PageHeader
        eyebrow="House rules"
        title="A short list, so the week goes smoothly."
        maxWidth="md"
        lead="Nothing here is a surprise, but a few of these carry fines from the building, so they are worth two minutes of your time."
      />

      <Container
        maxWidth="md"
        sx={{ py: { xs: 6, md: 9 }, [shortLandscape]: { py: 4 } }}
      >
        <Stack spacing={2.5}>
          {rules.map((rule) => (
            <Surface key={rule.title} interactive={false}>
              <Stack direction="row" spacing={2.5} alignItems="flex-start">
                <Box
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    flexShrink: 0,
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                  }}
                >
                  {rule.icon}
                </Box>
                <Box>
                  <Typography variant="h6">{rule.title}</Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {rule.detail}
                  </Typography>
                  {rule.penalty && (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="flex-start"
                      sx={{
                        mt: 2,
                        py: 1,
                        px: 1.5,
                        borderRadius: 2,
                        bgcolor: 'action.hover',
                      }}
                    >
                      <ReportIcon
                        sx={{
                          fontSize: 19,
                          color: 'secondary.main',
                          mt: '2px',
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {rule.penalty}
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </Stack>
            </Surface>
          ))}
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 5, textAlign: 'center' }}
        >
          Questions about any of this? Use the contact details from your
          check-in message.
        </Typography>
      </Container>
    </>
  );
}
