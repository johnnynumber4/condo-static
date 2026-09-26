import type { MetadataRoute } from 'next';
import { site } from './lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The owners' page, and the outbound redirects, which are not content
      // and would only spend crawl budget bouncing a bot off to Hosteeva.
      disallow: ['/admin', '/go/', '/booking'],
    },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
    host: site.url,
  };
}
