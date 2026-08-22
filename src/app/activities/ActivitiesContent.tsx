'use client';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalkOutlined';
import TheaterIcon from '@mui/icons-material/TheaterComedyOutlined';
import GolfCourseIcon from '@mui/icons-material/GolfCourseOutlined';
import SportsBowlingIcon from '@mui/icons-material/SportsEsportsOutlined';
import MapIcon from '@mui/icons-material/MapOutlined';
import PageHeader from '../components/ui/PageHeader';
import PlaceCard, { type Place } from '../components/ui/PlaceCard';

type Category = {
  id: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
  places: Place[];
};

const categories: Category[] = [
  {
    id: 'nearby',
    title: 'Walk to it',
    blurb: 'Close enough that you can leave the car where it is.',
    icon: <DirectionsWalkIcon />,
    places: [
      {
        name: 'The Boardwalk',
        note: 'Two blocks south',
        description:
          'Starts at 14th Avenue N and runs under three miles round trip, perfect for a sunrise walk or run. Pull up the live cams and see if you can spot your family on the beach.',
        address: 'Myrtle Beach Boardwalk, Myrtle Beach, SC',
        links: [
          {
            text: 'Live cam: north end',
            url: 'https://www.earthcam.com/usa/southcarolina/myrtlebeach/',
          },
          {
            text: 'Live cam: volleyball courts',
            url: 'https://www.earthcam.com/usa/southcarolina/myrtlebeach/volleyball/',
          },
        ],
      },
      {
        name: 'Second Avenue Pier',
        note: 'Walking distance',
        description:
          'Fishing rentals are available and no license is required. Worth the walk for the views alone, and there is a restaurant at the end of it.',
        address: '110 N Ocean Blvd, Myrtle Beach, SC 29577',
      },
      {
        name: "Captain Hook's Adventure Golf",
        note: 'A few blocks north',
        description:
          'Two eighteen-hole pirate courses, Hooks and Lost Boys, with a smoking skull entrance, a climbable pirate ship and waterfalls. Gentle enough for small children.',
        address: '2205 N Kings Hwy, Myrtle Beach, SC 29577',
        image: {
          src: '/photos/activities/captain-hooks.jpg',
          alt: "A crocodile in the water below the rock formations and waterfalls at Captain Hook's Adventure Golf",
        },
      },
      {
        name: 'Mt. Atlanticus Minotaur Golf',
        note: 'A mile south',
        description:
          'The famous one: 36 holes climbing an indoor-outdoor Atlantis mountain of caves, waterfalls and bridges, with ocean views from the upper level. Sink the 19th hole and you putt free for life.',
        address: '707 N Kings Hwy, Myrtle Beach, SC 29577',
      },
      {
        name: 'Broadway at the Beach',
        note: 'About a mile inland',
        description:
          'Over seventy shops with clothing, gifts, snacks and art, wrapped around a lake, plus attractions, restaurants and theaters if the weather turns. Around twenty-five minutes on foot heading inland, or five minutes in the car if you would rather not walk back in the heat.',
        address: '1325 Celebrity Cir, Myrtle Beach, SC 29577',
      },
      {
        name: 'PopStroke',
        note: 'At Broadway at the Beach',
        description:
          'Two eighteen-hole putting courses designed with Tiger Woods and built by TaylorMade, plus a rooftop bar, a family restaurant and an ice cream parlor. Smoother and more grown-up than the pirate courses, and you can eat and drink while you play.',
        address: '1187 Celebrity Cir, Myrtle Beach, SC 29577',
        links: [
          {
            text: 'popstroke.com',
            url: 'https://popstroke.com/venues/myrtle-beach/',
          },
        ],
      },
      {
        name: 'The Hangout',
        note: 'At Broadway at the Beach',
        description:
          'Live music on indoor and outdoor stages, firepits, courtyard games and a sand pile for the children, with seafood, burgers and tacos alongside. Somewhere to settle in for an afternoon rather than just a meal.',
        address: '1181 Celebrity Cir, Myrtle Beach, SC 29577',
        links: [
          {
            text: 'thehangout.com',
            url: 'https://thehangout.com/myrtle-about/',
          },
        ],
      },
    ],
  },
  {
    id: 'shows',
    title: 'Shows worth booking ahead',
    blurb: 'These sell out in season, so reserve before you drive over.',
    icon: <TheaterIcon />,
    places: [
      {
        name: 'Pirates Voyage Dinner & Show',
        note: '10 minutes north',
        description:
          'Dolly Parton’s pirate show: two full-sized ships battling in an indoor lagoon, with acrobatics, sword fights and pyrotechnics, plus a four-course feast you eat with your hands. Roughly an hour and a half.',
        address: '8907 N Kings Hwy, Myrtle Beach, SC 29572',
        image: {
          src: '/photos/activities/pirates-voyage.jpg',
          alt: 'The Pirates Voyage theater building lit up at dusk',
        },
        links: [
          {
            text: 'Showtimes and tickets',
            url: 'https://piratesvoyage.com/myrtle-beach',
          },
        ],
      },
      {
        name: 'Medieval Times',
        note: 'Short drive',
        description:
          'A family-friendly feast and tournament in the style of an 11th-century banquet: four courses while you cheer on one of six jousting knights. Book early, because it fills up.',
        address: '2904 Fantasy Way, Myrtle Beach, SC 29579',
        image: {
          src: '/photos/activities/medieval-times.jpg',
          alt: 'Two knights on horseback clashing with lances at Medieval Times, splinters flying',
        },
        links: [
          {
            text: 'medievaltimes.com',
            url: 'https://www.medievaltimes.com/myrtle-beach',
          },
        ],
      },
    ],
  },
  {
    id: 'golf',
    title: 'Golf',
    blurb: 'More than ten courses sit within a twenty-minute drive.',
    icon: <GolfCourseIcon />,
    places: [
      {
        name: 'Topgolf',
        note: 'Good for non-golfers too',
        description:
          'Climate-controlled bays, food and drink at the tee, and a scoring system that makes it fun whether or not anyone in your group can actually play.',
        address: '2850 Robert Grissom Pkwy, Myrtle Beach, SC 29577',
        links: [
          {
            text: 'Topgolf Myrtle Beach',
            url: 'https://topgolf.com/us/myrtle-beach/',
          },
        ],
      },
      {
        name: 'River Oaks Golf Club',
        note: 'Club rentals $20 a set',
        description:
          'Twenty-seven holes and an easy tee time to get, which makes it a good pick if you decided to play that morning.',
        links: [
          {
            text: 'River Oaks Golf Club',
            url: 'https://www.riveroaksgolf.com/',
          },
        ],
      },
      {
        name: 'Arrowhead Country Club',
        note: 'Club rentals $30 a set',
        description:
          'Twenty-seven holes along the Intracoastal Waterway, and one of the closest good courses to the condo.',
        links: [
          { text: 'Arrowhead Country Club', url: 'https://arrowheadcc.com/' },
        ],
      },
    ],
  },
  {
    id: 'indoors',
    title: 'Bowling, arcades and rainy days',
    blurb: 'Somewhere to put the afternoon when the weather turns.',
    icon: <SportsBowlingIcon />,
    places: [
      {
        name: '810 Billiards & Bowling',
        note: 'At The Market Common',
        description:
          'Bowling lanes and pool tables together, with food and drink brought to you while you play. It sits in The Market Common, the walkable shops-and-restaurants district built on the old air force base, so it is easy to make an evening of it either side of a game.',
        address: '1190 Farrow Pkwy, Myrtle Beach, SC 29577',
        links: [
          {
            text: '810bowling.com',
            url: 'https://810bowling.com/810-bowling-myrtle-beach-sc',
          },
        ],
      },
      {
        name: 'Stars and Strikes',
        note: 'At Coastal Grand Mall',
        description:
          'Twenty-four lanes plus an arcade of more than a hundred games, a multi-storey laser tag arena, axe throwing and a full bar with the game on. The most to do under one roof.',
        address: '600 Coastal Grand Cir, Myrtle Beach, SC 29577',
      },
      {
        name: "Guy Fieri's Downtown Flavortown",
        note: 'At Myrtle Beach Mall',
        description:
          'Opened in summer 2026 in the old anchor store: fourteen duckpin lanes, over a hundred arcade games, a tiki bar and a very large restaurant. Duckpin uses smaller balls and no finger holes, so children can actually bowl.',
        address: 'Myrtle Beach Mall, 10177 N Kings Hwy, Myrtle Beach, SC 29572',
      },
    ],
  },
  {
    id: 'day-trips',
    title: 'Worth the drive',
    blurb: 'Half a day south, and a different side of the coast.',
    icon: <MapIcon />,
    places: [
      {
        name: 'Murrells Inlet MarshWalk',
        note: '25 minutes south',
        description:
          'A half-mile boardwalk over the salt marsh with eight waterfront restaurants along it: Wahoo’s, Drunken Jack’s, Bovine’s, Creek Ratz and more, most with live music and a deck facing the sunset. Go for an early dinner and stay for the light.',
        address: 'MarshWalk, Murrells Inlet, SC 29576',
      },
      {
        name: 'Brookgreen Gardens',
        note: '30 minutes south',
        description:
          'The country’s first public sculpture garden, with the largest collection of American figurative sculpture anywhere outdoors, set in themed gardens with a lowcountry zoo and trails. Quieter than anything else on this list.',
        address: '1931 Brookgreen Dr, Murrells Inlet, SC 29576',
      },
      {
        name: 'Huntington Beach State Park',
        note: 'Next to Brookgreen',
        description:
          'Undeveloped beach, a saltmarsh boardwalk and some of the best birding on the coast, plus Atalaya, the old Moorish-style winter home on the dunes. Easy to pair with Brookgreen in one day.',
        address: '16148 Ocean Hwy, Murrells Inlet, SC 29576',
      },
    ],
  },
];

export default function ActivitiesContent() {
  return (
    <>
      <PageHeader
        eyebrow="Around the condo"
        title="Our favorite things to do in Myrtle Beach."
        lead="Grouped by how far you have to go, starting with what you can reach on foot."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Stack spacing={{ xs: 7, md: 10 }}>
          {categories.map((category) => (
            <Box key={category.id} id={category.id}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ color: 'primary.main', mb: 1 }}
              >
                {category.icon}
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
