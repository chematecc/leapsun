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

export const metadata: Metadata = {
  title: 'Leapsun Partners | Connecting Ideas, Capital and Opportunities',
  description: 'Leapsun Partners is a strategic investment and partnership platform connecting capital, industries, and emerging opportunities across healthcare, biotechnology, and global markets.',
  keywords: ['investment', 'partnership', 'healthcare', 'biotechnology', 'cross-border', 'halal', 'emerging markets'],
  openGraph: {
    title: 'Leapsun Partners',
    description: 'Connecting Ideas, Capital and Opportunities.',
    type: 'website',
  },
};

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
    <html lang={locale} className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0D1B2A] text-[#F5F5F5]`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
