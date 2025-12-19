import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

declare global {
  // allow global `var` with mongoose type
  // Prevents multiple connections in dev
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongooseConn;

if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  const getDbNameFromUri = () => {
    try {
      const uri = MONGODB_URI!;
      const path = uri.split("?")[0]?.split("/").pop();
      return path && path.length > 0 ? path : null;
    } catch {
      return null;
    }
  };

  const configuredDbName =
    getDbNameFromUri() || process.env.MONGODB_DB || "test";

  if (cached.conn) {
    const currentName = cached.conn.connection?.name;
    if (currentName && currentName !== configuredDbName) {
      await cached.conn.disconnect();
      cached.conn = null;
    } else {
      return cached.conn;
    }
  }

  if (!cached.promise) {
    const hasDbName = Boolean(getDbNameFromUri());

    const opts = {
      bufferCommands: false,
      ...(hasDbName ? {} : { dbName: configuredDbName }),
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
