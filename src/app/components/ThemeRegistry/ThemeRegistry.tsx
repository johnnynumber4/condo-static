'use client';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';

// Create a context to hold the toggle function
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

// Use state for the current mode ("light" or "dark")
export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1e88e5',
            light: '#4791db',
            dark: '#1565c0',
            contrastText: '#fff',
          },
          secondary: {
            main: '#ffb74d',
            light: '#ffd95b',
            dark: '#f57c00',
            contrastText: '#000',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#fafafa',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#ffffff' : '#2c3e50',
            secondary: mode === 'dark' ? '#b0bec5' : '#546e7a',
          },
        },
        typography: {
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 500,
          },
          h6: {
            fontWeight: 500,
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              'html, body': {
                backgroundColor: mode === 'dark' ? '#121212' : '#fafafa',
                color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                transition: 'background-color 0.3s, color 0.3s',
              },
              main: {
                backgroundColor: mode === 'dark' ? '#121212' : '#fafafa',
                color: mode === 'dark' ? '#ffffff' : '#2c3e50',
              },
              '.MuiBox-root': {
                '&[style*="background"]': {
                  backgroundColor: mode === 'dark' ? '#1e1e1e' : undefined,
                  backgroundImage: mode === 'dark' 
                    ? 'linear-gradient(to right bottom, #1e1e1e, #121212)'
                    : 'linear-gradient(to right bottom, #1e88e5, #1565c0)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
                transition: 'background-color 0.3s',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                padding: '8px 16px',
              },
              contained: {
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage:
                  mode === 'dark'
                    ? 'linear-gradient(to right, #0d47a1, #1565c0)'
                    : 'linear-gradient(to right, #1e88e5, #1565c0)',
                backgroundColor: 'transparent',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
                transition: 'background-color 0.3s',
              },
            },
          },
          MuiListItem: {
            styleOverrides: {
              root: {
                '&.Mui-selected, &.Mui-selected:hover': {
                  backgroundColor:
                    mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                },
                '&:hover': {
                  backgroundColor:
                    mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.04)',
                },
              },
            },
          },
          MuiListItemText: {
            styleOverrides: {
              primary: {
                color: mode === 'dark' ? '#ffffff' : '#2c3e50',
              },
            },
          },
          MuiListItemIcon: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? '#b0bec5' : '#546e7a',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </ColorModeContext.Provider>
  );
}
