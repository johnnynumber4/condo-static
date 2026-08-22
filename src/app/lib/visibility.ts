/**
 * Places hidden from the public site.
 *
 * This is the file the admin page at /admin edits. Flip the switches there,
 * copy what it gives you over this file, and commit: the next deploy hides or
 * restores the tiles for everyone. Keeping it in git means every change is
 * dated, attributable and one revert away from being undone.
 *
 * Entries are place ids from `lib/activities.ts` and `lib/food.ts`, not names,
 * so renaming a place does not silently un-hide it.
 */
export const hiddenPlaceIds: string[] = [];

/** Whether a place should be rendered on the public site. */
export function isVisible(id: string) {
  return !hiddenPlaceIds.includes(id);
}
