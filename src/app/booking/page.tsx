import { redirect } from 'next/navigation';
import { BOOKING_URL_TRACKED } from '../lib/site';

/**
 * Server-side redirect to the booking host. This replaces the old
 * `window.open` call, which silently did nothing whenever the browser's
 * popup blocker was active.
 */
export default function BookingPage(): never {
  redirect(BOOKING_URL_TRACKED);
}
