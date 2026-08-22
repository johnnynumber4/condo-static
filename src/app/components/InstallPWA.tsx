'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Offers the "add to home screen" prompt so guests can keep the manual on
 * their phone for the week.
 */
export default function InstallPWA() {
  const [prompt, setPrompt] = React.useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setPrompt(null);

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!prompt) return;
    await prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
  };

  if (!prompt || dismissed) return null;

  return (
    <Snackbar
      open
      message="Keep the guest manual on your home screen"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={
        <>
          <Button
            color="secondary"
            size="small"
            onClick={install}
            startIcon={<GetAppIcon />}
          >
            Install
          </Button>
          <IconButton
            size="small"
            color="inherit"
            aria-label="Dismiss"
            onClick={() => setDismissed(true)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
      sx={{ '& .MuiSnackbarContent-root': { borderRadius: 3 } }}
    />
  );
}
