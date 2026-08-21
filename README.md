# Paradise 252 @ Atlantica II

The website for our oceanfront condo in Myrtle Beach. It does two jobs: it
sells the place to people deciding where to stay, and it works as the house
manual once they have booked.

Built with Next.js (App Router) and MUI.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build (also runs lint + typecheck)
pnpm start        # serve the production build
pnpm lint
pnpm format       # prettier --write .
```

## Pages

| Route         | What it is                                           |
| ------------- | ---------------------------------------------------- |
| `/`           | Hero, the 2 + 5 + 2 story, photo strip, manual links |
| `/about`      | Your hosts, the highlights, the tour video           |
| `/guide`      | Getting into the building, the bonus bed             |
| `/activities` | Things to do nearby, grouped by how far you go       |
| `/food`       | Buffets, restaurants and breweries                   |
| `/groceries`  | Grocery stores, each with a map and directions       |
| `/info`       | House rules                                          |
| `/booking`    | Server-side redirect to the booking host             |

## Editing content

Most of what you will want to change lives in plain arrays near the top of a
file, so you can edit the words without touching any layout:

- **Site name, description, booking link, nav order**: `src/app/lib/site.ts`.
  The booking URL is defined once here and used by the nav, the buttons and
  the `/booking` redirect.
- **Photos**: `src/app/lib/gallery.ts`. `heroPhoto` is the big image on the
  home and hosts pages. `galleryPhotos` drives the "A look around" strip.
- **Activities**: the `categories` array in
  `src/app/activities/ActivitiesContent.tsx`. Each category holds a list of
  places; add a place by adding an object to the right category's `places`.
- **Restaurants and breweries**: the `categories` array in
  `src/app/food/FoodContent.tsx`, same shape as activities.
- **Grocery stores**: the `stores` array in
  `src/app/groceries/GroceriesContent.tsx`. `coordinates` is a
  `"latitude,longitude"` string and feeds both the map and the directions link.
- **House rules**: the `rules` array in `src/app/info/InfoContent.tsx`.
- **Guide sections**: the `sections` array in
  `src/app/guide/GuideContent.tsx`.

### Adding photos

The "A look around" strip on the home page is hidden while `galleryPhotos` is
empty, so it never shows a half-built grid. To turn it on:

1. Put the image files in `public/photos/`.
2. Add an entry per photo in `galleryPhotos` in `src/app/lib/gallery.ts`:

   ```ts
   { src: '/photos/living-room.jpg', alt: 'The living room looking out to the ocean' }
   ```

The first entry gets the wide featured tile and the rest fill in beside it.
`alt` is what screen readers announce, so describe the photo; the optional
`caption` is printed over the bottom of the tile.

## Design

Colours and typography are defined once in `src/app/lib/theme.ts`. The palette
is sand and ink with ocean teal for links and actions, and sunset orange kept
for the booking calls to action so they stand out.

Light and dark are handled by MUI's CSS-variable theming. The guest's choice is
saved and applied by `InitColorSchemeScript` before the first paint, so there
is no flash of the wrong theme on load, and an untouched browser follows the
system setting.

## PWA

`public/manifest.json` and `public/sw.js` let guests add the manual to their
home screen. The service worker serves pages network-first with the cached copy
as an offline fallback, and static assets cache-first.

**Bump `CACHE_NAME` in `public/sw.js` whenever the cached shell changes.**
The activate handler deletes every cache that does not match, and that is what
retires the previous version on devices that already have the app installed.

### Adding a place

Activities and Eat & Drink share one card (`PlaceCard`). A place looks like:

```ts
{
  name: 'Voodoo Brewing Co.',
  note: 'At Broadway at the Beach',   // short orientation line
  description: 'What it is and why we send people there.',
  address: '1318 Celebrity Cir Unit CS8, Myrtle Beach, SC 29577',
  links: [{ text: 'their site', url: 'https://…' }],   // optional
}
```

`address` is optional. When it is there the card prints it and the directions
button navigates to it; when it is missing the button falls back to the place
name plus the town, so every place gets working directions either way.

Every "Get directions" button on the site is the same component,
`components/ui/DirectionsButton`, and every maps link is built by
`lib/maps.ts`. Use them rather than hand-rolling a maps URL: the button also
puts the place name in its accessible label, which is what tells a screen
reader which of a dozen identical buttons it is on. The condo's own address
lives in `site.address` and powers the buttons in the footer and on the guide
page.

## Dependencies and security

`pnpm audit` should report zero advisories. Two things keep it there:

- **Next.js is pinned to an exact version** (not a `^` range) so an upgrade is
  always a deliberate, tested change. Check `pnpm audit` after bumping it.
- **`pnpm.overrides` in `package.json`** pins patched releases of transitive
  build-toolchain packages (postcss, minimatch, sharp and friends) that their
  parents had not yet picked up. Each pin stays inside the dependent's major
  version. Revisit them when upgrading Next: once the parent ships the
  patched version itself, the override can go.

Run `pnpm audit` before deploying after any dependency change.
