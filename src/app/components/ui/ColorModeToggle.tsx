'use client';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';

/**
 * Toggles between light and dark, writing the choice to localStorage via
 * MUI's colour-scheme storage so it survives reloads.
 */
export default function ColorModeToggle({ sx }: { sx?: object }) {
  const { mode, systemMode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Before hydration the resolved scheme is unknown; render a neutral
  // placeholder of the same size so the toolbar does not shift.
  const resolved = mode === 'system' ? systemMode : mode;
  const isDark = resolved === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to light' : 'Switch to dark'}>
      <IconButton
        onClick={() => setMode(isDark ? 'light' : 'dark')}
        color="inherit"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        sx={sx}
      >
        {mounted && isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
