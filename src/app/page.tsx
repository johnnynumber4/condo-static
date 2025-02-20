import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
  Home as HomeIcon,
  Book as BookIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
  BeachAccess as BeachIcon,
} from '@mui/icons-material';

export default function Home() {
  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          backgroundImage: 'linear-gradient(to right bottom, #1e88e5, #1565c0)',
          color: 'primary.contrastText',
          py: 10,
          mb: 6,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50px',
            background:
              'linear-gradient(to right bottom, transparent 49%, #fafafa 50%)',
          },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <BeachIcon sx={{ fontSize: 45, mr: 2 }} />
            Welcome to Paradise 252
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Enjoy your home away from home
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              href="/about"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
                transition: 'transform 0.2s',
              }}
            >
              About our Condo
            </Button>
            <Button
              variant="contained"
              size="large"
              href="https://www.booking.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                px: 4,
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  transform: 'translateY(-2px)',
                },
                transition: 'transform 0.2s',
              }}
            >
              Book Your Stay
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
                Condo Guide
              </Typography>
              <Typography variant="body1" paragraph>
                Everything you need to know about your stay - from WiFi
                passwords to pool access.
              </Typography>
              <Button variant="contained" href="/guide">
                View Guide
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <BookIcon sx={{ mr: 1, color: 'primary.main' }} />
                Guest Book
              </Typography>
              <Typography variant="body1" paragraph>
                Share your experience and read about others&apos; stays.
              </Typography>
              <Button variant="contained" href="/guestbook">
                Open Guest Book
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                Local Activities
              </Typography>
              <Typography variant="body1" paragraph>
                Discover restaurants, attractions, and activities nearby.
              </Typography>
              <Button variant="contained" href="/activities">
                Explore Area
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
                Important Info
              </Typography>
              <Typography variant="body1" paragraph>
                Emergency contacts, rules, and other essential information.
              </Typography>
              <Button variant="contained" href="/info">
                View Info
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
                Groceries
              </Typography>
              <Typography variant="body1" paragraph>
                Grocery stores in the area.
              </Typography>
              <Button variant="contained" href="/groceries">
                View Info
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
