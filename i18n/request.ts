import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

const SUPPORTED_LOCALES = ['en', 'fr'] as const;
const DEFAULT_LOCALE = 'en';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get('locale')?.value;

  const locale: string = SUPPORTED_LOCALES.includes(
    localeFromCookie as (typeof SUPPORTED_LOCALES)[number]
  )
    ? localeFromCookie!
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
