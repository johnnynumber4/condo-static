'use client';
import React, { useState, useContext, useEffect, useRef } from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Book as BookIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
  CalendarMonth as CalendarIcon,
  Cottage as CottageIcon,
  ShoppingCart as ShoppingCartIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ColorModeContext } from '@/app/components/ThemeRegistry/ThemeRegistry';

const navItems = [
  { text: 'Home', href: '/', icon: <HomeIcon /> },
  { text: 'About', href: '/about', icon: <CottageIcon /> },
  { text: 'Condo Guide', href: '/guide', icon: <HomeIcon /> },
  { text: 'Guest Book', href: '/guestbook', icon: <BookIcon /> },
  { text: 'Activities', href: '/activities', icon: <LocationIcon /> },
  { text: 'Groceries', href: '/groceries', icon: <ShoppingCartIcon /> },
  { text: 'Important Info', href: '/info', icon: <InfoIcon /> },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Auto-hide navbar on scroll
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem
          key={item.text}
          component={Link}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          sx={{
            backgroundColor: pathname === item.href ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      <ListItem
        component="a"
        href="https://www.booking.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon><CalendarIcon /></ListItemIcon>
        <ListItemText primary="Book Now" />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar 
        position="fixed"
        sx={{
          transform: visible ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div">
            Paradise 252 @ Atlantica II
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  sx={{
                    backgroundColor: pathname === item.href ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                color="inherit"
                href="https://www.booking.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ml: 2 }}
              >
                Book Now
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
} 