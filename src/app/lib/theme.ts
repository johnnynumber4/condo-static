import { createTheme } from '@mui/material/styles';

/**
 * Warm coastal palette: sand and ink for the ground, ocean teal for actions,
 * sunset orange reserved for the things we most want guests to click.
 *
 * The theme is built on MUI's CSS-variable mode so the colour scheme is
 * resolved by `InitColorSchemeScript` before first paint, so the guest's choice
 * persists across visits and there is no light-mode flash on load.
 */
export const tokens = {
  light: {
    sand: '#F7F3EC',
    sandDeep: '#EFE8DC',
    paper: '#FFFDF9',
    ink: '#17282E',
    muted: '#5E7076',
    ocean: '#0E6B70',
    oceanDark: '#0A5054',
    oceanLight: '#3E9196',
    sunset: '#D96430',
    sunsetDark: '#B84E1F',
    sunsetLight: '#EA8B5B',
    line: 'rgba(23, 40, 46, 0.12)',
    onOcean: '#FFFFFF',
    onSunset: '#FFFFFF',
  },
  dark: {
    sand: '#0E1B20',
    sandDeep: '#0A1418',
    paper: '#16272D',
    ink: '#F3EEE6',
    muted: '#A6B7BC',
    ocean: '#6BC3C6',
    oceanDark: '#3E9196',
    oceanLight: '#9BDBDC',
    sunset: '#F0925E',
    sunsetDark: '#D96430',
    sunsetLight: '#F7B48A',
    line: 'rgba(243, 238, 230, 0.14)',
    onOcean: '#062023',
    onSunset: '#2A1206',
  },
} as const;

const paletteFor = (mode: 'light' | 'dark') => {
  const t = tokens[mode];
  return {
    primary: {
      main: t.ocean,
      dark: t.oceanDark,
      light: t.oceanLight,
      contrastText: t.onOcean,
    },
    secondary: {
      main: t.sunset,
      dark: t.sunsetDark,
      light: t.sunsetLight,
      contrastText: t.onSunset,
    },
    background: { default: t.sand, paper: t.paper },
    text: { primary: t.ink, secondary: t.muted },
    divider: t.line,
  };
};

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data', cssVarPrefix: 'p252' },
  colorSchemes: {
    light: { palette: paletteFor('light') },
    dark: { palette: paletteFor('dark') },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'var(--font-body), system-ui, -apple-system, sans-serif',
    h1: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.08,
    },
    h2: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h6: { fontWeight: 600, lineHeight: 1.4 },
    subtitle1: { lineHeight: 1.6 },
    body1: { lineHeight: 1.7, fontSize: '1.0625rem' },
    body2: { lineHeight: 1.65 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
    overline: { letterSpacing: '0.16em', fontWeight: 600, fontSize: '0.72rem' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: tokens.light.sunset,
          color: '#fff',
        },
        '*:focus-visible': {
          outline: `2px solid ${tokens.light.ocean}`,
          outlineOffset: 2,
        },
        body: { overflowX: 'hidden' },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, padding: '10px 22px' },
        sizeLarge: { padding: '13px 30px', fontSize: '1rem' },
        outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500, borderRadius: 999 } },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: { root: { fontWeight: 500 } },
    },
    MuiAppBar: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});
