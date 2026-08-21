/**
 * Photos used around the site.
 *
 * `heroPhoto` is the big image behind the home-page headline and at the top
 * of the hosts page.
 *
 * `galleryPhotos` drives the "A look around" strip on the home page. It is
 * empty until there is more than the hero shot to show — the strip hides
 * itself rather than repeating the photo the guest just scrolled past. To
 * turn it on, drop files into `public/photos/` and add an entry for each; the
 * first one gets the wide featured tile and the rest fill in beside it.
 */
export type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

export const heroPhoto: Photo = {
  src: '/sunset-toast.jpg',
  alt: 'A toast at sunset on the balcony overlooking the ocean',
  caption: 'Sunset from the balcony',
};

export const galleryPhotos: Photo[] = [
  // Example — delete this comment and add real entries:
  // { src: '/photos/living-room.jpg', alt: 'The living room looking out to the ocean' },
];
