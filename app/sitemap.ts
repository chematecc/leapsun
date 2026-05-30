import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://leapsunpartners.com';
  const lastModified = new Date();

  return [
    {
      url: `${base}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${base}/en`,
          zh: `${base}/zh`,
        },
      },
    },
    {
      url: `${base}/zh`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${base}/en`,
          zh: `${base}/zh`,
        },
      },
    },
  ];
}
