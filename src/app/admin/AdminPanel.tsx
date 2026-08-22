'use client';
import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopyOutlined';
import CheckIcon from '@mui/icons-material/Check';
import LaunchIcon from '@mui/icons-material/Launch';
import Surface from '../components/ui/Surface';
import { signOut } from './actions';

type PanelPlace = { id: string; name: string; note: string };
type PanelCategory = { id: string; title: string; places: PanelPlace[] };
type Section = {
  key: string;
  label: string;
  href: string;
  categories: PanelCategory[];
};

/** Renders the exact contents of lib/visibility.ts for a given hidden set. */
function configFile(hidden: string[]) {
  const list = [...hidden].sort();
  const entries = list.length
    ? '\n' + list.map((id) => `  '${id}',`).join('\n') + '\n'
    : '';
  return `/**
 * Places hidden from the public site.
 *
 * This is the file the admin page at /admin edits. Flip the switches there,
 * copy what it gives you over this file, and commit: the next deploy hides or
 * restores the tiles for everyone. Keeping it in git means every change is
 * dated, attributable and one revert away from being undone.
 *
 * Entries are place ids from \`lib/activities.ts\` and \`lib/food.ts\`, not names,
 * so renaming a place does not silently un-hide it.
 */
export const hiddenPlaceIds: string[] = [${entries}];

/** Whether a place should be rendered on the public site. */
export function isVisible(id: string) {
  return !hiddenPlaceIds.includes(id);
}
`;
}

export default function AdminPanel({
  sections,
  hidden: initialHidden,
}: {
  sections: Section[];
  hidden: string[];
}) {
  const [hidden, setHidden] = React.useState<string[]>(initialHidden);
  const [copied, setCopied] = React.useState(false);

  const toggle = (id: string) =>
    setHidden((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const dirty =
    JSON.stringify([...hidden].sort()) !==
    JSON.stringify([...initialHidden].sort());

  const file = configFile(hidden);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(file);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard is blocked in some contexts; the text is on screen to select.
      setCopied(false);
    }
  };

  const hiddenCount = hidden.length;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 1 }}
      >
        <Typography variant="h4">Site settings</Typography>
        <Box component="form" action={signOut}>
          <Button type="submit" size="small" color="inherit">
            Sign out
          </Button>
        </Box>
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Switch a place off to take its tile off the public site.{' '}
        {hiddenCount === 0
          ? 'Everything is showing at the moment.'
          : `${hiddenCount} ${hiddenCount === 1 ? 'place is' : 'places are'} hidden.`}
      </Typography>

      {sections.map((section) => (
        <Box key={section.key} sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="h6">{section.label}</Typography>
            <Button
              href={section.href}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
            >
              View page
            </Button>
          </Stack>

          <Surface interactive={false} sx={{ p: 0, overflow: 'hidden' }}>
            {section.categories.map((category, ci) => (
              <Box key={category.id}>
                {ci > 0 && <Divider />}
                <Typography
                  variant="overline"
                  sx={{
                    display: 'block',
                    px: 3,
                    pt: 2.5,
                    pb: 1,
                    color: 'text.secondary',
                  }}
                >
                  {category.title}
                </Typography>
                {category.places.map((place) => {
                  const off = hidden.includes(place.id);
                  return (
                    <Stack
                      key={place.id}
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{ px: 3, py: 1.25 }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: off ? 'text.disabled' : 'text.primary',
                            textDecoration: off ? 'line-through' : 'none',
                          }}
                        >
                          {place.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {place.note}
                        </Typography>
                      </Box>
                      {off && <Chip label="Hidden" size="small" />}
                      <Switch
                        checked={!off}
                        onChange={() => toggle(place.id)}
                        inputProps={{
                          'aria-label': `Show ${place.name} on the public site`,
                        }}
                      />
                    </Stack>
                  );
                })}
              </Box>
            ))}
          </Surface>
        </Box>
      ))}

      <Surface
        interactive={false}
        sx={{ borderLeft: '4px solid', borderLeftColor: 'secondary.main' }}
      >
        <Typography variant="h6" gutterBottom>
          Publishing
        </Typography>
        {dirty ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            Nothing has changed on the live site yet. Copy the file below over{' '}
            <code>src/app/lib/visibility.ts</code> and commit it. The deploy
            takes about a minute.
          </Alert>
        ) : (
          <Alert severity="success" sx={{ mb: 2 }}>
            These switches match what is committed. The live site already looks
            like this.
          </Alert>
        )}

        <Button
          variant="contained"
          onClick={copy}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          sx={{ mb: 2 }}
        >
          {copied ? 'Copied' : 'Copy visibility.ts'}
        </Button>

        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            borderRadius: 2,
            bgcolor: 'action.hover',
            fontSize: '0.78rem',
            lineHeight: 1.6,
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}
        >
          {file}
        </Box>
      </Surface>
    </Container>
  );
}
