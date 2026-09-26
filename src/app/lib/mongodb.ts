import { MongoClient, type Db } from 'mongodb';

/**
 * One MongoDB client for the whole server.
 *
 * Every serverless invocation that opened its own client would open its own
 * connection pool, and Atlas counts those against the cluster's connection
 * limit. Caching the promise on globalThis means a warm instance reuses the
 * pool it already has, and a dev server reuses it across hot reloads instead
 * of leaking one client per edit.
 */
const globalForMongo = globalThis as unknown as {
  p252MongoClient?: Promise<MongoClient>;
  p252MongoIndexes?: Promise<void>;
  p252MongoDownUntil?: number;
};

/**
 * How long to stop trying after a failed connection. Without this every
 * request while the database is down pays the full connection timeout, so a
 * five second stall on one page render becomes five seconds on every one.
 * Short enough that the site recovers on its own once Atlas comes back.
 */
const RETRY_AFTER_FAILURE_MS = 30_000;

/** Set in the Vercel project settings. Absent locally, and that is fine: the
 *  guest book falls back to read-only rather than failing to render. */
function uri() {
  return process.env.MONGODB_URI ?? '';
}

export function isDatabaseConfigured() {
  return uri().length > 0;
}

function connect() {
  return new MongoClient(uri(), {
    // A page render must not sit for the driver's 30s default while a bad
    // host name resolves. Fail fast, show the read-only notice, move on.
    serverSelectionTimeoutMS: 5_000,
    connectTimeoutMS: 5_000,
    // Serverless instances are small and short-lived; a large pool per
    // instance is wasted connections against the Atlas limit.
    maxPoolSize: 5,
  }).connect();
}

export const DB_NAME = process.env.MONGODB_DB || 'paradise252';

export async function getDb(): Promise<Db> {
  if (!isDatabaseConfigured()) {
    throw new Error('MONGODB_URI is not set');
  }

  if (Date.now() < (globalForMongo.p252MongoDownUntil ?? 0)) {
    throw new Error(
      'The database did not answer a moment ago, so we are waiting before trying again.'
    );
  }

  if (!globalForMongo.p252MongoClient) {
    globalForMongo.p252MongoClient = connect().catch((err) => {
      // A failed connection must not be cached as a client, or every later
      // request in this instance replays the same failure forever. The
      // timestamp is what stops it retrying on every single request.
      globalForMongo.p252MongoClient = undefined;
      globalForMongo.p252MongoDownUntil = Date.now() + RETRY_AFTER_FAILURE_MS;
      throw err;
    });
  }
  const client = await globalForMongo.p252MongoClient;
  globalForMongo.p252MongoDownUntil = 0;
  return client.db(DB_NAME);
}

/**
 * Index creation is idempotent, so this runs once per warm instance rather
 * than once per deploy. Callers await it before their first query.
 */
export function ensureIndexes(build: (db: Db) => Promise<unknown>) {
  if (!globalForMongo.p252MongoIndexes) {
    globalForMongo.p252MongoIndexes = getDb()
      .then((db) => build(db))
      .then(() => undefined)
      .catch((err) => {
        globalForMongo.p252MongoIndexes = undefined;
        throw err;
      });
  }
  return globalForMongo.p252MongoIndexes;
}
