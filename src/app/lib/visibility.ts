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

/**
 * Card order within a category, keyed by category id.
 *
 * Only categories that have been reordered appear here; anything absent keeps
 * the order it has in `lib/activities.ts` / `lib/food.ts`. A place missing
 * from a listed category sorts to the end, so adding a new place never
 * silently disappears into the middle of a list.
 */
export const placeOrder: Record<string, string[]> = {};

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
