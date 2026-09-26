import type { MetadataRoute } from 'next';
import { navItems, site } from './lib/site';

/**
 * Only real content. /booking and /go/* are outbound redirects and /admin is
 * the owners' page, so none of them belong in a sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // /suggestions is real content but deliberately not in the nav, so it is
  // listed explicitly rather than derived from navItems.
  const paths = ['/', ...navItems.map((item) => item.href), '/suggestions'];
  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
