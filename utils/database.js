import mongoose from 'mongoose'

global.mongoose = global.mongoose || { conn: null, promise: null };

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

export const connectToDB = async () =>  {
  if (cached.conn) {
    console.log('MongoDB is already connected')
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      dbName: "csis-thoughts",
      bufferCommands: false,
    };
    console.log('MongoDB connected')
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
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
