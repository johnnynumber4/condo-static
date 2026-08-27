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
- **Activities**: `src/app/lib/activities.ts`. Each category holds a list of
  places; add a place by adding an object to the right category's `places`,
  including a unique `id`.
- **Restaurants and breweries**: `src/app/lib/food.ts`, same shape as
  activities.
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

Colors and typography are defined once in `src/app/lib/theme.ts`. The palette
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

### Adding photos to places

Each place takes an optional `image`, and cards without one simply have no
banner, so photos can be added a few at a time:

```ts
image: {
  src: '/photos/activities/boardwalk.jpg',
  alt: 'The Myrtle Beach boardwalk on a clear morning',
  credit: {
    text: 'Jane Doe / Wikimedia Commons (CC BY-SA 4.0)',
    url: 'https://commons.wikimedia.org/wiki/File:Example.jpg',
  },
},
```

Cards size to their own content, so a row that mixes photographed and
un-photographed places still looks tidy. It looks best if you finish a whole
category at a time.

**`credit` is not optional in practice.** Most free-to-use photos are CC BY or
CC BY-SA, and both require the credit to be shown next to the image. Public
domain and CC0 photos do not, and for those you can leave `credit` off. Where
you do set it, `text` should name the photographer and the licence.

Good sources, in rough order of how safe they are to use:

| Source                                             | Licence                                    | Attribution                                                                                              |
| -------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [Wikimedia Commons](https://commons.wikimedia.org) | Varies per file, stated on the file page   | Usually required; has genuine photos of Brookgreen Gardens, Huntington Beach State Park and Myrtle Beach |
| [Unsplash](https://unsplash.com)                   | Unsplash licence, free commercial use      | Not required, appreciated                                                                                |
| [Pexels](https://pexels.com)                       | Pexels licence, free commercial use        | Not required                                                                                             |
| [Openverse](https://openverse.org)                 | Searches CC-licensed images across sources | Per licence shown                                                                                        |

Two things worth being careful about:

- **Check the licence on the file page itself**, not the search results. On
  Wikimedia Commons in particular it varies file by file.
- **Do not label a stock photo as a specific business.** A generic beach photo
  captioned as a named restaurant is misleading. Either use a photo genuinely
  of that place, or keep the image generic enough that it reads as decoration.

Images are served as-is (`images.unoptimized` is on in `next.config.ts`), so
resize before committing: about 1200px wide is plenty for these cards.

Every "Get directions" button on the site is the same component,
`components/ui/DirectionsButton`, and every maps link is built by
`lib/maps.ts`. Use them rather than hand-rolling a maps URL: the button also
puts the place name in its accessible label, which is what tells a screen
reader which of a dozen identical buttons it is on. The condo's own address
lives in `site.address` and powers the buttons in the footer and on the guide
page.

## Hiding a place from the site

There is an unlisted settings page at `/admin` for switching individual
Activities and Eat & Drink tiles off, for when somewhere closes or stops being
worth recommending.

It is password-protected. Set `ADMIN_PASSWORD` in the Vercel project settings
(**not** `NEXT_PUBLIC_ADMIN_PASSWORD` — the prefix would ship it to the
browser). Until that variable exists the page refuses everyone rather than
letting everyone in, and the password is only ever compared on the server; the
session cookie holds a value derived from it, never the password itself.

The switches do not write to the live site. Flipping one gives you the new
contents of `src/app/lib/visibility.ts`, which you copy over that file and
commit; Vercel redeploys in about a minute. That keeps every change in git
history, dated and revertable, and means there is no database to run.

Hiding every place in a category removes the whole category, heading and all,
rather than leaving an empty grid.

The arrows beside each place reorder the cards within their category. Only
categories you actually reorder get written to `placeOrder`; everything else
keeps the order it has in the data file, and a place missing from a listed
category sorts to the end rather than vanishing into the middle.

The same page also switches the Airbnb and Booking.com buttons on and off,
under "Booking buttons".

Ids in that file come from `lib/activities.ts` and `lib/food.ts` and are
deliberately separate from the display names, so renaming a place does not
silently un-hide it.

## Booking links and campaigns

Every booking button points at an internal `/go/<channel>` link rather than
straight out to the channel. That indirection lets us tag traffic per channel,
change a listing URL in one place, and attach a campaign to a link without
touching a page.

- Channels live in `src/app/lib/booking.ts`.
- `/go/hosteeva` redirects with `utm_source=paradise252&utm_medium=website`.
- `/go/hosteeva?c=spring-2026` adds `utm_campaign=spring-2026`, so a flyer, an
  email or an Instagram bio link can each be measured separately in the
  channel's own analytics.

Airbnb and Booking.com are defined but have no listing URL and are switched
off in `lib/visibility.ts`. Two things have to be true before either appears:
a URL in `booking.ts`, and the switch on in the admin page. A channel that is
off, or has no URL, also 404s at `/go/<channel>` rather than only being
unlinked, so the link cannot be reached by guessing it.

## The QR card in the condo

There is a framed card in the condo with five QR codes on it. They were
printed against an older set of paths, so `next.config.ts` redirects the
printed URLs to where those pages actually live:

| Printed on the card | Goes to       | Status                |
| ------------------- | ------------- | --------------------- |
| `/`                 | `/`           | still correct         |
| `/activities`       | `/activities` | still correct         |
| `/home-guide`       | `/guide`      | redirected            |
| `/grocery`          | `/groceries`  | redirected            |
| `/suggestions`      | `/about`      | redirected, see below |

**Do not rename `/guide`, `/groceries`, `/activities` or `/about` without
adding a redirect.** Guests are scanning that card right now and a reprint is
slower than a deploy.

`/suggestions` is the guest book. It is a placeholder: it explains that notes
cannot be left yet and asks guests to use the contact details from their
check-in message. There is no form, on purpose, because a form that looked
like it worked and dropped the note would be worse than saying so.

Entries live in `src/app/lib/guestbook.ts` and can be added by hand today.
When it moves to MongoDB, keep the `GuestbookEntry` shape and change only
where the array comes from, so the page itself does not need touching.

The page is deliberately not in the main nav, only in the footer and on the
QR card, so it is listed explicitly in the sitemap rather than derived from
`navItems`.

The codes point at `www.paradise252.com`, while `site.url` is the apex
`paradise252.com`. Both have to resolve: add the domain **and** its `www`
variant in Vercel so one redirects to the other, or every code on the card
fails.

## SEO and analytics

- `src/app/sitemap.ts` lists the seven content pages. `/booking`, `/go/*` and
  `/admin` are deliberately absent: two are outbound redirects and one is the
  owners' page.
- `src/app/robots.ts` disallows those same paths and points at the sitemap.
- `src/app/components/StructuredData.tsx` marks the site up as a schema.org
  `VacationRental`. Everything it claims is also stated on the site: the
  six-guest maximum comes from the house rules, the amenities from the
  "2 + 5 + 2" section. Do not add a claim here that a guest could arrive and
  find untrue.
- Every page sets a canonical URL, so the real domain and the `vercel.app`
  address are not counted as two copies of the site.
- `@vercel/analytics` is loaded in the root layout.

All of this resolves against `site.url` in `src/app/lib/site.ts`. **That domain
has to actually serve the site**: canonical tags pointing at a domain that does
not resolve are worse than none. Add the domain in the Vercel project settings
and point DNS at it before relying on any of the above.

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
