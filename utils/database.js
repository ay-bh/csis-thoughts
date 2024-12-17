import mongoose from 'mongoose'
import User from '@models/user'
import Post from '@models/post'

global.mongoose = global.mongoose || { 
    conn: null, 
    promise: null,
    models: {
        User: null,
        Post: null
    }
};

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

export const connectToDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: "csis-thoughts",
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            // Ensure models are registered
            if (!cached.models.User) {
                cached.models.User = User;
            }
            if (!cached.models.Post) {
                cached.models.Post = Post;
            }
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