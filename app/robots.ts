import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://leapsunpartners.com/sitemap.xml',
    host: 'https://leapsunpartners.com',
  };
}
