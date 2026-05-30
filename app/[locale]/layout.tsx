import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const locales = ['en', 'zh'];

const metaByLocale: Record<string, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: 'Leapsun Partners | Strategic Investment & Innovation Bridge',
    description:
      'Leapsun Partners is a Singapore-based strategic investment and partnership platform connecting capital, talent and transformative ideas across healthcare, deep tech, and global markets.',
    keywords: [
      'Leapsun Partners', 'strategic investment', 'Singapore venture', 'healthcare investment',
      'biotech investment', 'cross-border investment', 'deep tech', 'Asia Pacific capital',
      'innovation partnership', 'BCI', 'gene therapy', 'industrial intelligence',
    ],
  },
  zh: {
    title: '利生合创投资 | 连接创新、资本与全球机遇',
    description:
      '利生合创投资是总部位于新加坡的战略投资与合创平台，专注于连接亚太与全球市场的资本、人才与创新机遇，覆盖医疗健康、深科技、新消费等核心领域。',
    keywords: [
      '利生合创投资', '战略投资', '新加坡投资', '医疗健康投资',
      '生物科技', '跨境投资', '深科技', '亚太资本',
      '脑机接口', '基因治疗', '工业智能化',
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaByLocale[locale] ?? metaByLocale.en;

  return {
    metadataBase: new URL('https://leapsunpartners.com'),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'Leapsun Partners' }],
    creator: 'Leapsun Partners',
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://leapsunpartners.com/${locale}`,
      languages: {
        'en': 'https://leapsunpartners.com/en',
        'zh': 'https://leapsunpartners.com/zh',
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://leapsunpartners.com/${locale}`,
      siteName: 'Leapsun Partners',
      locale: locale === 'zh' ? 'zh_CN' : 'en_SG',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Leapsun Partners',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
