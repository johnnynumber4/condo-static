import { Fraunces, Inter } from 'next/font/google';

/** Display serif — headings and the wordmark. */
export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
});

/** Body sans. */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});
