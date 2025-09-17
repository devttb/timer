import '@mantine/core/styles.css';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Header } from '@/components/organisms/header';
import { theme } from '@/theme';

import '@/theme/global.css';

export const metadata = {
  title: 'Timer',
  description: 'This is Timer app!',
};

export default async function RootLayout({ children }: { children: any }) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MantineProvider theme={theme}>
            <Header />
            {children}
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
