'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, checkPassword, issueToken } from './auth';

export async function signIn(_prev: string | undefined, formData: FormData) {
  const candidate = String(formData.get('password') ?? '');

  // There is no store to rate-limit against, so a fixed delay on every attempt
  // keeps brute force slow and does not reveal whether the guess was close.
  await new Promise((r) => setTimeout(r, 600));

  if (!checkPassword(candidate)) {
    return 'That password is not right.';
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, issueToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 60 * 60 * 12,
  });
  redirect('/admin');
}

export async function signOut() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect('/admin');
}
