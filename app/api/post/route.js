import Post from "@models/post";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const revalidate = 0;

export const GET = async (request) => {
	try {
		await connectToDB();
		const posts = await Post.find({}).populate("creator");

		const modifiedPosts = posts?.map((post) => {
			if (post.anon) {
				post.creator = null;
			}
			return post;
		}) || [];

		return new Response(JSON.stringify(modifiedPosts), {
			status: 200,
			headers: {
				'Cache-Control': 'no-store',
			}
		});
	} catch (error) {
		console.log(error);
		return new Response("Failed to fetch all posts", { status: 500 });
	}
};
