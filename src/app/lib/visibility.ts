/**
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

/** Place ids from `lib/activities.ts` and `lib/food.ts`. */
export const hiddenPlaceIds: string[] = [];

/**
 * Feature ids. Booking channels are `channel-<id>` from `lib/booking.ts`.
 *
 * Airbnb and Booking.com start hidden: the listings do not exist yet, and a
 * booking button that goes nowhere costs a real reservation.
 */
export const hiddenFeatureIds: string[] = [
  'channel-airbnb',
  'channel-booking-com',
];

/** Whether a place should be rendered on the public site. */
export function isVisible(id: string) {
  return !hiddenPlaceIds.includes(id);
}

/** Whether a feature should be rendered on the public site. */
export function isFeatureVisible(id: string) {
  return !hiddenFeatureIds.includes(id);
}
