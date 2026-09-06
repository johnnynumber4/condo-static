'use server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from './auth';
import { deleteEntry, setApproved } from '../lib/guestbook-db';

/**
 * A server action is a public endpoint: anyone who knows its id can post to
 * it, signed in or not. Every one of these therefore checks the session
 * itself rather than trusting that the admin page rendered the button.
 */
async function guard() {
  if (!(await isAuthenticated())) {
    throw new Error('Not signed in');
  }
}

function id(formData: FormData) {
  return String(formData.get('id') ?? '');
}

function refresh() {
  revalidatePath('/suggestions');
  revalidatePath('/admin');
}

export async function publishEntry(formData: FormData) {
  await guard();
  await setApproved(id(formData), true);
  refresh();
}

export async function hideEntry(formData: FormData) {
  await guard();
  await setApproved(id(formData), false);
  refresh();
}

export async function removeEntry(formData: FormData) {
  await guard();
  await deleteEntry(id(formData));
  refresh();
}
