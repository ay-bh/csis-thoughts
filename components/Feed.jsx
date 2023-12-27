"use client";

import { useState, useEffect } from "react";
import { unstable_noStore as noStore } from "next/cache";

import PostCard from "./PostCard";

const PostCardList = ({ data, handleLike }) => {
	const sortedData = data.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);
	return (
		<div className="mt-16 post_layout">
			{sortedData.map((post) => (
				<PostCard
					key={post._id}
					post={post}
					handleLike={() => handleLike(post._id)}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);

	// Search states
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = async () => {
		noStore();
		const response = await fetch("/api/post");
		const data = await response.json();
		setAllPosts(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPosts = (searchtext) => {
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item) => regex.test(item.creator?.username) || regex.test(item?.post)
		);
	};
	const handleLike = async (postId) => {
		// Find the index of the post being liked
		const postIndex = allPosts.findIndex((post) => post._id === postId);
		if (postIndex === -1) return; // Post not found

		try {
			const response = await fetch(`/api/post/${postId}`, {
				method: "PATCH",
				body: JSON.stringify({
					updateType: "like",
				}),
			});

			if (response.ok) {
				// Increment like count in the local state
				setAllPosts((currentPosts) =>
					currentPosts.map((post, index) =>
						index === postIndex ? { ...post, likes: post.likes + 1 } : post
					)
				);
			}
		} catch (error) {
			console.error("Error liking post:", error);
		}
	};
	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPosts(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			{loading ? (
				<>
					<div
						className="mt-10 mb-10 text-gray-300 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status"
					>
						<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
							Loading...
						</span>
					</div>
				</>
			) : searchText ? (
				<PostCardList data={searchedResults} handleLike={handleLike} />
			) : (
				<PostCardList data={allPosts} handleLike={handleLike} />
			)}
		</section>
	);
};

export default Feed;
