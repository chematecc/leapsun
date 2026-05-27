import { getRequestConfig } from 'next-intl/server';
import en from '../messages/en.json';
import zh from '../messages/zh.json';

const messages: Record<string, typeof en> = { en, zh };

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'en';
  return {
    locale,
    messages: messages[locale] ?? en,
  };
});
