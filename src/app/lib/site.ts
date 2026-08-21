/**
 * Single source of truth for site-wide content that used to be duplicated
 * across the navigation, the manifest and individual pages.
 */

export const BOOKING_URL =
  'https://www.hosteeva.com/properties/available/details/12926-hosteeva-oceanfront-sunny-condo-w-pool-in-atlantica-towers-condo';

export const BOOKING_URL_TRACKED = `${BOOKING_URL}?utm_source=paradise252`;

export const site = {
  name: 'Paradise 252',
  fullName: 'Paradise 252 @ Atlantica II',
  tagline: 'Oceanfront in Myrtle Beach',
  description:
    'A two-bedroom oceanfront condo at Atlantica II — direct ocean views, five ways to swim, and two minutes on foot to the boardwalk.',
  address: '1700 N Ocean Blvd, Myrtle Beach, SC 29577',
  url: 'https://paradise252.com',
} as const;

export const navItems = [
  { text: 'Your Hosts', href: '/about' },
  { text: 'Condo Guide', href: '/guide' },
  { text: 'Activities', href: '/activities' },
  { text: 'Eat & Drink', href: '/food' },
  { text: 'Groceries', href: '/groceries' },
  { text: 'House Rules', href: '/info' },
] as const;
