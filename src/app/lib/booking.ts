import { BOOKING_URL } from './site';

/**
 * Where the condo can be booked.
 *
 * Every button on the site points at an internal `/go/<id>` link rather than
 * straight out to the channel. That indirection is the point: it lets us tag
 * traffic per channel, swap a listing URL without hunting through components,
 * and attach a discount code to a campaign link later without touching any
 * page.
 */
export type BookingChannel = {
  id: string;
  label: string;
  /**
   * The listing URL. Empty means the listing does not exist yet, and a channel
   * with no URL is never rendered even if it is switched on: enabling a button
   * that goes nowhere is worse than not having it.
   */
  url: string;
  /** Short line under the button group, if the channel needs explaining. */
  note?: string;
};

export const bookingChannels: BookingChannel[] = [
  {
    id: 'hosteeva',
    label: 'Hosteeva',
    url: BOOKING_URL,
    note: 'Our property manager. Booking direct here usually costs the guest least.',
  },
  {
    // TODO: paste the Airbnb listing URL here once the listing is live.
    id: 'airbnb',
    label: 'Airbnb',
    url: '',
  },
  {
    // TODO: paste the Booking.com listing URL here once the listing is live.
    id: 'booking-com',
    label: 'Booking.com',
    url: '',
  },
];

export function findChannel(id: string) {
  return bookingChannels.find((c) => c.id === id);
}

/**
 * Adds campaign tags to a channel's URL. `campaign` comes from the `c` query
 * on the /go link, so a flyer can use /go/hosteeva?c=spring-2026 and show up
 * separately in the channel's own analytics.
 */
export function taggedUrl(channel: BookingChannel, campaign?: string) {
  if (!channel.url) return null;
  const url = new URL(channel.url);
  url.searchParams.set('utm_source', 'paradise252');
  url.searchParams.set('utm_medium', 'website');
  if (campaign) url.searchParams.set('utm_campaign', campaign);
  return url.toString();
}
