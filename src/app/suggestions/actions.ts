'use server';
import { headers } from 'next/headers';
import { addEntry } from '../lib/guestbook-db';

export type FormState = {
  status: 'idle' | 'sent' | 'error';
  message?: string;
};

async function clientIp() {
  const h = await headers();
  // Vercel sets both; x-forwarded-for may be a chain, and the first entry is
  // the client. Only ever used hashed, for rate limiting.
  const forwarded = h.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return h.get('x-real-ip') ?? undefined;
}

export async function submitEntry(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot. A real guest never sees this field, so anything in it came
  // from something filling every input on the page.
  if (String(formData.get('website') ?? '')) {
    // Answer as though it worked. Telling a bot it was caught only teaches
    // whoever wrote it to stop filling the field.
    return { status: 'sent' };
  }

  const result = await addEntry({
    name: String(formData.get('name') ?? ''),
    stayed: String(formData.get('stayed') ?? ''),
    note: String(formData.get('note') ?? ''),
    ip: await clientIp(),
  });

  if (!result.ok) {
    return { status: 'error', message: result.error };
  }
  return { status: 'sent' };
}
