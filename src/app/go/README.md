Outbound booking links.

`/go/<channel-id>` tags the click and redirects to that channel's listing, so
every booking button on the site funnels through one place. Add `?c=<campaign>`
for a campaign-specific link, e.g. `/go/hosteeva?c=spring-2026`, which shows up
as `utm_campaign=spring-2026` in the channel's analytics.

Channels are defined in `src/app/lib/booking.ts`.
