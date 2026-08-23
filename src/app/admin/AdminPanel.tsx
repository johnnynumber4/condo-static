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
type FeatureItem = {
  id: string;
  name: string;
  note: string;
  disabled?: boolean;
};
type FeatureGroup = { id: string; title: string; items: FeatureItem[] };

/** Renders the exact contents of lib/visibility.ts for a given state. */
function configFile(hidden: string[], hiddenFeatures: string[]) {
  const list = (ids: string[]) => {
    const sorted = [...ids].sort();
    return sorted.length
      ? '\n' + sorted.map((id) => `  '${id}',`).join('\n') + '\n'
      : '';
  };
  return `/**
 * What the public site shows.
 *
 * This is the file the admin page at /admin edits. Flip the switches there,
 * copy what it gives you over this file, and commit: the next deploy hides or
 * restores things for everyone. Keeping it in git means every change is dated,
 * attributable and one revert away from being undone.
 *
 * Entries are ids, never display names, so renaming something does not
 * silently un-hide it.
 */

/** Place ids from \`lib/activities.ts\` and \`lib/food.ts\`. */
export const hiddenPlaceIds: string[] = [${list(hidden)}];

/**
 * Feature ids. Booking channels are \`channel-<id>\` from \`lib/booking.ts\`.
 *
 * Airbnb and Booking.com start hidden: the listings do not exist yet, and a
 * booking button that goes nowhere costs a real reservation.
 */
export const hiddenFeatureIds: string[] = [${list(hiddenFeatures)}];

/** Whether a place should be rendered on the public site. */
export function isVisible(id: string) {
  return !hiddenPlaceIds.includes(id);
}

/** Whether a feature should be rendered on the public site. */
export function isFeatureVisible(id: string) {
  return !hiddenFeatureIds.includes(id);
}
`;
}

export default function AdminPanel({
  sections,
  features,
  hidden: initialHidden,
  hiddenFeatures: initialHiddenFeatures,
}: {
  sections: Section[];
  features: FeatureGroup[];
  hidden: string[];
  hiddenFeatures: string[];
}) {
  const [hidden, setHidden] = React.useState<string[]>(initialHidden);
  const [hiddenFeatures, setHiddenFeatures] = React.useState<string[]>(
    initialHiddenFeatures
  );
  const [copied, setCopied] = React.useState(false);

  const toggle = (id: string) =>
    setHidden((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleFeature = (id: string) =>
    setHiddenFeatures((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const same = (a: string[], b: string[]) =>
    JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
  const dirty =
    !same(hidden, initialHidden) ||
    !same(hiddenFeatures, initialHiddenFeatures);

  const file = configFile(hidden, hiddenFeatures);

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

      {features.map((group) => (
        <Box key={group.id} sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {group.title}
          </Typography>
          <Surface interactive={false} sx={{ p: 0, overflow: 'hidden' }}>
            {group.items.map((item, i) => {
              const off = hiddenFeatures.includes(item.id);
              return (
                <Box key={item.id}>
                  {i > 0 && <Divider />}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ px: 3, py: 1.75 }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color:
                            off || item.disabled
                              ? 'text.disabled'
                              : 'text.primary',
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.note}
                      </Typography>
                    </Box>
                    {item.disabled && <Chip label="No URL" size="small" />}
                    <Switch
                      checked={!off}
                      disabled={item.disabled}
                      onChange={() => toggleFeature(item.id)}
                      inputProps={{
                        'aria-label': `Show the ${item.name} booking button`,
                      }}
                    />
                  </Stack>
                </Box>
              );
            })}
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
