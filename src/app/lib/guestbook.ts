/**
 * The shape of a guest book note, and the curated ones we keep in git.
 *
 * Deliberately free of any database import: the form is a client component
 * and needs LIMITS, and pulling the driver in behind it would put the whole
 * of MongoDB in the browser bundle. Reads and writes live in guestbook-db.ts.
 */

export type GuestbookEntry = {
  id: string;
  name: string;
  /** Free text, e.g. "August 2026". Not a date, because guests write things
   *  like "our third summer". */
  stayed?: string;
  note: string;
  /** ISO string, absent on the curated entries below. */
  createdAt?: string;
};

/** What the admin page sees: the same entry plus where it came from and
 *  whether it is live on the site yet. */
export type ModeratedEntry = GuestbookEntry & {
  approved: boolean;
  /** Curated entries live in this file and cannot be moderated from the
   *  admin page, only edited here and committed. */
  curated: boolean;
};

/**
 * Notes we were given by other means (a text message, the check-in thread)
 * and are showing with the guest's permission. These are always live, do not
 * need the database, and survive it being down.
 */
export const curatedEntries: GuestbookEntry[] = [];

export const LIMITS = { name: 60, stayed: 40, note: 1500 };
