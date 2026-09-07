import 'server-only';
import { createHash } from 'node:crypto';
import { ObjectId, type Collection, type Db } from 'mongodb';
import { ensureIndexes, getDb, isDatabaseConfigured } from './mongodb';
import {
  LIMITS,
  curatedEntries,
  type GuestbookEntry,
  type ModeratedEntry,
} from './guestbook';

type GuestbookDoc = {
  _id: ObjectId;
  name: string;
  stayed?: string;
  note: string;
  approved: boolean;
  createdAt: Date;
  /** Hashed, never the address itself: it is only ever compared to another
   *  hash to rate-limit, so there is no reason to keep the original. */
  ipHash?: string;
};

async function collection(): Promise<Collection<GuestbookDoc>> {
  await ensureIndexes(async (db: Db) => {
    const c = db.collection<GuestbookDoc>('guestbook');
    await Promise.all([
      // Serves the public read: approved entries, newest first.
      c.createIndex({ approved: 1, createdAt: -1 }),
      // Serves the rate-limit count.
      c.createIndex({ ipHash: 1, createdAt: -1 }),
    ]);
  });
  const db = await getDb();
  return db.collection<GuestbookDoc>('guestbook');
}

function toEntry(doc: GuestbookDoc): GuestbookEntry {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    ...(doc.stayed ? { stayed: doc.stayed } : {}),
    note: doc.note,
    createdAt: doc.createdAt.toISOString(),
  };
}

export type GuestbookState = {
  entries: GuestbookEntry[];
  /** False when there is no MONGODB_URI, or the database could not be
   *  reached. The page uses it to decide whether to offer the form, so a
   *  guest is never given a box that would throw their note away. */
  writable: boolean;
};

/** The public list: curated notes first, then approved submissions. */
export async function getPublishedEntries(): Promise<GuestbookState> {
  if (!isDatabaseConfigured()) {
    return { entries: curatedEntries, writable: false };
  }
  try {
    const c = await collection();
    const docs = await c
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();
    return {
      entries: [...curatedEntries, ...docs.map(toEntry)],
      writable: true,
    };
  } catch (err) {
    // A database outage should cost the form, not the whole page.
    console.error('Guest book read failed', err);
    return { entries: curatedEntries, writable: false };
  }
}

/** Everything, approved or not, for the admin page. */
export async function getEntriesForReview(): Promise<ModeratedEntry[]> {
  const curated = curatedEntries.map((e) => ({
    ...e,
    approved: true,
    curated: true,
  }));
  if (!isDatabaseConfigured()) return curated;
  const c = await collection();
  const docs = await c.find({}).sort({ createdAt: -1 }).limit(500).toArray();
  return [
    ...docs.map((d) => ({
      ...toEntry(d),
      approved: d.approved,
      curated: false,
    })),
    ...curated,
  ];
}

/** How many notes one address may leave per hour. */
const RATE_LIMIT = { max: 3, windowMs: 60 * 60 * 1000 };

export function hashIp(ip: string) {
  // Salted with the admin password where there is one, so the hashes are not
  // reversible with a rainbow table of every IPv4 address.
  return createHash('sha256')
    .update(`${process.env.ADMIN_PASSWORD ?? 'p252'}:${ip}`)
    .digest('hex');
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function addEntry(input: {
  name: string;
  stayed: string;
  note: string;
  ip?: string;
}): Promise<SubmitResult> {
  const name = input.name.trim();
  const stayed = input.stayed.trim();
  const note = input.note.trim();

  if (!name) return { ok: false, error: 'Please add your name.' };
  if (!note) return { ok: false, error: 'Please write a note.' };
  if (name.length > LIMITS.name)
    return { ok: false, error: 'That name is a little long.' };
  if (stayed.length > LIMITS.stayed)
    return { ok: false, error: 'Please keep the stay to a few words.' };
  if (note.length > LIMITS.note)
    return { ok: false, error: 'Please keep the note under 1500 characters.' };

  if (!isDatabaseConfigured()) {
    return { ok: false, error: 'The guest book is not accepting notes yet.' };
  }

  const c = await collection();
  const ipHash = input.ip ? hashIp(input.ip) : undefined;

  if (ipHash) {
    const since = new Date(Date.now() - RATE_LIMIT.windowMs);
    const recent = await c.countDocuments({
      ipHash,
      createdAt: { $gte: since },
    });
    if (recent >= RATE_LIMIT.max) {
      return {
        ok: false,
        error: 'That is a few notes in a short time. Try again a bit later.',
      };
    }
  }

  await c.insertOne({
    _id: new ObjectId(),
    name,
    ...(stayed ? { stayed } : {}),
    note,
    // Nothing goes live until someone says so. A guest book on a public site
    // with no gate in front of it becomes a link farm within a week.
    approved: false,
    createdAt: new Date(),
    ...(ipHash ? { ipHash } : {}),
  });

  return { ok: true };
}

export async function setApproved(id: string, approved: boolean) {
  if (!ObjectId.isValid(id)) return;
  const c = await collection();
  await c.updateOne({ _id: new ObjectId(id) }, { $set: { approved } });
}

export async function deleteEntry(id: string) {
  if (!ObjectId.isValid(id)) return;
  const c = await collection();
  await c.deleteOne({ _id: new ObjectId(id) });
}
