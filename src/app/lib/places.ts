/**
 * Shared shape for a place on the Activities and Eat & Drink pages. Lives here
 * rather than beside the card so the data modules and the admin page can use
 * it without pulling in a client component.
 */

/**
 * Attribution for a photo. Most free-to-use licences (anything CC BY or
 * CC BY-SA) require the credit to be shown next to the image, so this is a
 * field rather than something buried in a comment.
 */
export type PhotoCredit = {
  /** e.g. "Jane Doe / Wikimedia Commons (CC BY-SA 4.0)" */
  text: string;
  /** Link back to the source page, where the licence requires it. */
  url?: string;
};

export type Place = {
  /**
   * Stable key, used by the visibility config. Derived from the name, but it
   * does not have to match it: rename a place freely and leave the id alone,
   * so a hidden place stays hidden.
   */
  id: string;
  name: string;
  /** Short orientation line: how far away it is, or what kind of place it is. */
  note: string;
  description: string;
  /** Street address, shown on the card and used for the directions button. */
  address?: string;
  /**
   * Optional photo. Cards without one simply have no banner, so photos can be
   * added a few at a time.
   */
  image?: { src: string; alt: string; credit?: PhotoCredit };
  /**
   * A short silent clip for the banner slot. Takes precedence over `image`
   * when both are set; `poster` is what shows before it loads.
   */
  video?: { src: string; poster: string; alt: string };
  links?: { text: string; url: string }[];
};
