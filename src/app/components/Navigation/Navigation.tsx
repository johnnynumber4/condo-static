'use client';
import * as React from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ColorModeToggle from '../ui/ColorModeToggle';
import { BOOKING_URL_TRACKED, navItems, site } from '../../lib/site';

export default function Navigation() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  // Six nav items plus the wordmark and booking button no longer fit at md,
  // so the drawer now covers tablets too.
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  // On the home page the bar floats over the hero image until the guest
  // scrolls past it; everywhere else it is solid from the start.
  const overHero = pathname === '/' && !scrolled;

  React.useEffect(() => {
    if (pathname !== '/') return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const drawer = (
    <Box sx={{ width: 288, height: '100%' }} role="presentation">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2.5, py: 2 }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: 'var(--font-display), serif' }}
        >
          {site.name}
        </Typography>
        <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <List sx={{ py: 1 }}>
        <ListItemButton
          component={Link}
          href="/"
          selected={pathname === '/'}
          onClick={() => setOpen(false)}
        >
          <ListItemText primary="Home" />
        </ListItemButton>
        {navItems.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={pathname === item.href}
            onClick={() => setOpen(false)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ px: 2.5, pt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          href={BOOKING_URL_TRACKED}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Stay
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          color: overHero ? '#fff' : 'text.primary',
          bgcolor: overHero ? 'transparent' : 'background.default',
          backdropFilter: overHero ? 'none' : 'saturate(180%) blur(12px)',
          borderBottom: '1px solid',
          borderColor: overHero ? 'transparent' : 'divider',
          transition: 'background-color .3s, color .3s, border-color .3s',
        }}
      >
        <Toolbar sx={{ gap: 1, minHeight: { xs: 62, md: 74 } }}>
          <Box
            component={Link}
            href="/"
            sx={{ textDecoration: 'none', color: 'inherit', mr: 'auto' }}
          >
            <Typography
              component="span"
              sx={{
                display: 'block',
                fontFamily: 'var(--font-display), serif',
                fontWeight: 600,
                fontSize: { xs: '1.15rem', md: '1.3rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {site.name}
            </Typography>
            <Typography
              component="span"
              variant="overline"
              sx={{
                display: 'block',
                fontSize: '0.6rem',
                opacity: 0.72,
                lineHeight: 1.4,
              }}
            >
              Atlantica II · Myrtle Beach
            </Typography>
          </Box>

          {!isMobile && (
            <Stack direction="row" spacing={0.5} sx={{ mr: 1.5 }}>
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    color="inherit"
                    sx={{
                      px: 1.75,
                      fontWeight: active ? 700 : 500,
                      opacity: active ? 1 : 0.82,
                      '&:hover': {
                        opacity: 1,
                        bgcolor: overHero
                          ? 'rgba(255,255,255,0.14)'
                          : 'action.hover',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </Stack>
          )}

          <ColorModeToggle />

          {!isMobile && (
            <Button
              variant="contained"
              color="secondary"
              href={BOOKING_URL_TRACKED}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ml: 1 }}
            >
              Book a Stay
            </Button>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
