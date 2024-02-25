import Post from "@models/post";
import { connectToDB } from "@utils/database";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (request) => {
	try {
		await connectToDB();
		// noStore();
		const posts = await Post.find({}).populate("creator");

		const modifiedPosts =
			posts && posts.length > 0
				? posts.map((post) => {
						if (post.anon) {
							post.creator = null;
						}
						return post;
				  })
				: [];

		return new Response(JSON.stringify(modifiedPosts), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Failed to fetch all posts", { status: 500 });
	}
};
