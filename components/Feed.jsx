"use client";

import { useState, useEffect } from "react";
import { unstable_noStore as noStore } from 'next/cache';

import PostCard from "./PostCard";

const PostCardList = ({ data, handleLike }) => {
  const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div className='mt-16 post_layout'>
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

  const fetchPosts = async () => {
    noStore();
    const response = await fetch("/api/post");
    const data = await response.json();
  
    // Set all other fields to "" for posts where anon is true
    const sanitizedData = data.map((post) => ({
      ...post,
      creator: post.anon ? null : post.creator, // Set creator to null if anon is true (assuming null is an appropriate value)
      // Add more fields here if needed
    }));
  
    setAllPosts(sanitizedData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator?.username) ||
        regex.test(item?.post)
    );
  };
  const handleLike = async (postId) => {
    // Find the index of the post being liked
    const postIndex = allPosts.findIndex(post => post._id === postId);
    if (postIndex === -1) return; // Post not found

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          updateType: 'like',
        }),
      });

      if (response.ok) {
        // Increment like count in the local state
        setAllPosts(currentPosts => currentPosts.map((post, index) => 
          index === postIndex ? { ...post, likes: post.likes + 1 } : post
        ));
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
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Posts */}
      {searchText ? (
        <PostCardList
          data={searchedResults}  handleLike={handleLike}
        />
      ) : (
        <PostCardList data={allPosts}  handleLike={handleLike} />
      )}
    </section>
  );
};

export default Feed;