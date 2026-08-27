import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Required for static export
  },
  /**
   * The QR codes on the framed card in the condo were printed against an
   * older set of paths. Guests are scanning them right now, so the site
   * answers to the printed URLs rather than waiting for a reprint.
   *
   * Decoded from a photo of the card:
   *   /            -> still correct
   *   /activities  -> still correct
   *   /home-guide  -> renamed to /guide
   *   /grocery     -> renamed to /groceries
   *   /suggestions -> now a real page, so no redirect for it
   *
   * Deliberately temporary (307) rather than permanent, so a browser does
   * not cache them forever if a path is ever reclaimed.
   */
  redirects: async () => {
    return [
      { source: '/home-guide', destination: '/guide', permanent: false },
      { source: '/grocery', destination: '/groceries', permanent: false },
    ];
  },

  // Enable PWA features
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
