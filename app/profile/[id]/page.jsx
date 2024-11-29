"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { handleLike as handleLikeUtil } from '@utils/handleLike';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      
      const filteredPosts = data.filter((post) => !post.anon);
      setUserPosts(filteredPosts);
    };
  
    if (params?.id) fetchPosts();
  }, [params.id]);

  const handleLike = (postId) => handleLikeUtil(postId, userPosts, setUserPosts);

  return (
    <Profile
      name={userName}
      desc={""}
      data={userPosts}
      handleLike={handleLike}
    />
  );
};

export default UserProfile