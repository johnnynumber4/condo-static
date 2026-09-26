import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'p252_admin';

/**
 * Set ADMIN_PASSWORD in the Vercel project settings. It is deliberately not
 * prefixed NEXT_PUBLIC_, so it stays on the server and never reaches the
 * browser bundle. With no password set the admin page refuses everyone rather
 * than falling open.
 */
function password() {
  return process.env.ADMIN_PASSWORD ?? '';
}

/** Constant-time compare, so a wrong guess cannot be timed character by character. */
function matches(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Still compare something of equal length: bailing early on a length
    // mismatch would leak the password's length.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

/**
 * The session cookie holds an HMAC derived from the password, never the
 * password itself. Changing ADMIN_PASSWORD therefore invalidates every
 * existing session.
 */
function sessionToken() {
  return createHmac('sha256', password())
    .update('p252-admin-session')
    .digest('hex');
}

export function checkPassword(candidate: string) {
  const expected = password();
  if (!expected) return false;
  return matches(candidate, expected);
}

export function issueToken() {
  return sessionToken();
}

export async function isAuthenticated() {
  if (!password()) return false;
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return matches(token, sessionToken());
}

export function isConfigured() {
  return password().length > 0;
}
