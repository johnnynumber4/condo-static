'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Info as InfoIcon } from '@mui/icons-material';

export default function ImportantInfo() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <InfoIcon sx={{ mr: 2 }} />
          Important Information
        </Typography>

        {/* <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Emergency Contacts
          </Typography>
          <Typography variant="body1" paragraph>
            Coming soon: Emergency numbers, local services, and important
            contacts.
          </Typography>
        </Paper> */}

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            House Rules
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem sx={{ display: 'list-item' }}>
              For same day late check-ins, you need to get the host&apos;s
              approval before booking.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Grilling is prohibited. Penalty: Any violation of this policy will
              incur a $200.00 fine.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Bicycles, motorcycles, mopeds, and trailers are not allowed.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              State Identification Card or Driver License copy will be requested
              upon booking.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              NO SMOKING in unit/house as well as the balcony. Any violation of
              the smoking policy will incur a $250 fine plus the cleaning costs
              necessary to remove smoke odors from the unit/house and/or linens.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              NO PETS ALLOWED. Any violation of this policy will incur a $200.00
              fine.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Please note: We are not responsible for any accidents, injuries,
              as well as stolen or damaged items that occur while on the
              premises, its facilities or parking lots.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Gatherings of more than 6 people including both overnight guests
              and visitors are not allowed and may be subject to eviction.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              House parties and illegal substances are strictly prohibited and
              grounds for immediate eviction.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              You must be at least 21 years old to book this property.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Leaving the unit later than the check-out time will incur a late
              check-out penalty starting from $500.
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
}
