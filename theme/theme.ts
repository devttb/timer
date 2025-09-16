'use client';

import { Roboto } from 'next/font/google';
import { createTheme, DEFAULT_THEME, MantineThemeOverride, mergeMantineTheme } from '@mantine/core';
import classes from '@/theme/theme.module.css';

const roboto = Roboto({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const themeOveride: MantineThemeOverride = createTheme({
  /* Put your mantine theme override here */
  activeClassName: classes.active,
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  fontFamily: roboto.style.fontFamily,
  fontSizes: {
    '2xs': '10px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
    '8xl': '96px',
    '9xl': '128px',
  },
  lineHeights: {
    shorter: '1.25',
    short: '1.375',
    moderate: '1.5',
    tall: '1.625',
    taller: '2',
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
    xl: '0 16px 24px 0 rgba(0, 0, 0, 0.1)',
    '2xl': '0 24px 40px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    inset: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
  },
  spacing: {
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    4.5: '18px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    21: '84px',
    24: '96px',
    28: '112px',
    32: '128px',
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOveride);
