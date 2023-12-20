import Post from "@models/post";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";
import { handler as nextAuthHandler } from "./../../auth/[...nextauth]/route"

export const GET = async (request, { params }) => {
    try {
        const session = await getServerSession(nextAuthHandler);
        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        await connectToDB()

        const post = await Post.findById(params.id).populate("creator")
        if (!post) return new Response("Post Not Found", { status: 404 });

        return new Response(JSON.stringify(post), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const session = await getServerSession(nextAuthHandler);

    const { post,updateType,anon } = await request.json();

    try {
        await connectToDB();

        const existingPost = await Post.findById(params.id);
        if (!existingPost) {
            return new Response("Post not found", { status: 404 });
        }
        if (updateType === 'like') {
            existingPost.likes += 1;
        } else if (updateType === 'content') {
            if (!session) {
                return new Response("Unauthorized", { status: 401 });
            }
            existingPost.post = post;
            existingPost.anon = anon;
        } else {
            return new Response("Invalid update type", { status: 400 });
        }
        await existingPost.save();

        return new Response("Successfully updated the Posts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Post", { status: 500 });
    }
};

export const DELETE = async (request, {params}) => {
    try {
        const session = await getServerSession(nextAuthHandler);
        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        await connectToDB();

        await Post.findOneAndDelete({ _id: params.id })
        
        return new Response("Post deleted successfully", { status: 200 });
    } catch (error) {
        console.log("Del error" + error);
        return new Response("Error deleting post", { status: 500 });
    }
};
