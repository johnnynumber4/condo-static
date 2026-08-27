/**
 * Guest book entries.
 *
 * Deliberately a plain array for now. When this moves to MongoDB the page
 * should keep this exact shape and only swap where the array comes from, so
 * the swap stays a one-file change:
 *
 *   const guestbookEntries = await getEntries();
 *
 * Notes sent to us by other means can be added here by hand in the meantime.
 */
export type GuestbookEntry = {
  id: string;
  name: string;
  /** Free text, e.g. "August 2026". Not a date, because guests write things
   *  like "our third summer". */
  stayed?: string;
  note: string;
};

export const guestbookEntries: GuestbookEntry[] = [];
