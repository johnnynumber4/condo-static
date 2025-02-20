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
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
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
          mode, // dynamically update the mode here
          primary: {
            main: '#1e88e5', // Ocean blue
            light: '#4791db',
            dark: '#1565c0',
            contrastText: '#fff',
          },
          secondary: {
            main: '#ffb74d', // Sandy orange
            light: '#ffd95b',
            dark: '#f57c00',
            contrastText: '#000',
          },
          background: {
            // Use your preferred colors or let MUI decide defaults for dark mode
            default: mode === 'dark' ? '#303030' : '#fafafa', 
            paper: mode === 'dark' ? '#424242' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#fff' : '#2c3e50', // Adjust as needed
            secondary: '#546e7a',
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
              body: {
                backgroundColor: mode === 'dark' ? '#303030' : '#fafafa',
                transition: 'background-color 0.3s',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage:
                  'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))',
                borderRadius: 8,
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
                backgroundImage: 'linear-gradient(to right, #1e88e5, #1565c0)',
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