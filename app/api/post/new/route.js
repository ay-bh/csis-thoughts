import Post from "@models/post";
import { connectToDB } from "@utils/database";
import { handler as nextAuthHandler } from "./../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next";

export const POST = async (request) => {
    const { userId, post, anon } = await request.json();

    try {
        const session = await getServerSession(nextAuthHandler);

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        if (post.length < 200) {
            return new Response("Post must be at least 200 characters long", { status: 400 });
        }

        await connectToDB();
        const newPost = new Post({
            creator: userId,
            post,
            createdAt: new Date(),
            anon: anon
        });

        await newPost.save();
        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new post", { status: 500 });
    }
}