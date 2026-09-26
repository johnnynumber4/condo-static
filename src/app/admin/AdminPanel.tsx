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
import IconButton from '@mui/material/IconButton';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
function configFile(
  hidden: string[],
  hiddenFeatures: string[],
  order: Record<string, string[]>
) {
  const entries = Object.entries(order);
  const orderLiteral = entries.length
    ? '{\n' +
      entries
        .map(
          ([cat, ids]) =>
            `  '${cat}': [\n` +
            ids.map((id) => `    '${id}',`).join('\n') +
            '\n  ],'
        )
        .join('\n') +
      '\n}'
    : '{}';
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

/**
 * Card order within a category, keyed by category id.
 *
 * Only categories that have been reordered appear here; anything absent keeps
 * the order it has in \`lib/activities.ts\` / \`lib/food.ts\`. A place missing
 * from a listed category sorts to the end, so adding a new place never
 * silently disappears into the middle of a list.
 */
export const placeOrder: Record<string, string[]> = ${orderLiteral};

/** Applies the configured order to one category's places. */
export function orderPlaces<T extends { id: string }>(
  categoryId: string,
  places: T[]
): T[] {
  const order = placeOrder[categoryId];
  if (!order || order.length === 0) return places;
  const rank = new Map(order.map((id, i) => [id, i]));
  // Sort is stable, so unranked places keep their file order among themselves.
  return [...places].sort(
    (a, b) =>
      (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
      (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER)
  );
}

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
  order: initialOrder,
}: {
  sections: Section[];
  features: FeatureGroup[];
  hidden: string[];
  hiddenFeatures: string[];
  order: Record<string, string[]>;
}) {
  const [hidden, setHidden] = React.useState<string[]>(initialHidden);
  const [hiddenFeatures, setHiddenFeatures] = React.useState<string[]>(
    initialHiddenFeatures
  );
  // Seeded from the file order so the arrows always have a list to move
  // within, then narrowed back down to only the categories that differ.
  const fileOrder = React.useMemo(() => {
    const map: Record<string, string[]> = {};
    sections.forEach((s2) =>
      s2.categories.forEach((c) => {
        map[c.id] = c.places.map((p) => p.id);
      })
    );
    return map;
  }, [sections]);

  const [order, setOrder] = React.useState<Record<string, string[]>>(() => ({
    ...fileOrder,
    ...initialOrder,
  }));
  const [copied, setCopied] = React.useState(false);

  const move = (categoryId: string, id: string, delta: number) =>
    setOrder((prev) => {
      const list = [...(prev[categoryId] ?? [])];
      const from = list.indexOf(id);
      const to = from + delta;
      if (from < 0 || to < 0 || to >= list.length) return prev;
      list.splice(to, 0, list.splice(from, 1)[0]);
      return { ...prev, [categoryId]: list };
    });

  // Only categories that actually differ from the file get written out.
  const changedOrder = React.useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const [cat, ids] of Object.entries(order)) {
      if (JSON.stringify(ids) !== JSON.stringify(fileOrder[cat]))
        out[cat] = ids;
    }
    return out;
  }, [order, fileOrder]);

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
    !same(hiddenFeatures, initialHiddenFeatures) ||
    JSON.stringify(changedOrder) !== JSON.stringify(initialOrder);

  const file = configFile(hidden, hiddenFeatures, changedOrder);

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
        Switch a place off to take its tile off the public site, or use the
        arrows to reorder the cards.{' '}
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
                {[...category.places]
                  .sort(
                    (a, b) =>
                      (order[category.id] ?? []).indexOf(a.id) -
                      (order[category.id] ?? []).indexOf(b.id)
                  )
                  .map((place, index, list) => {
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
                        <Stack direction="row" spacing={0}>
                          <IconButton
                            size="small"
                            disabled={index === 0}
                            onClick={() => move(category.id, place.id, -1)}
                            aria-label={`Move ${place.name} up`}
                          >
                            <ArrowUpIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            disabled={index === list.length - 1}
                            onClick={() => move(category.id, place.id, 1)}
                            aria-label={`Move ${place.name} down`}
                          >
                            <ArrowDownIcon fontSize="small" />
                          </IconButton>
                        </Stack>
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
