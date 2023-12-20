import Post from "@models/post";
import { connectToDB } from "@utils/database";
import { unstable_noStore as noStore } from 'next/cache';

export const GET = async (request) => {
    try {
        await connectToDB()
        noStore();
        const posts = await Post.find({}).populate('creator')
        

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 })
    }
} 