"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [post, setPost] = useState({ post: "",anon:false});
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
        post: data.post,
        anon:data.anon
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) return alert("Missing PostId!");

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          post: post.post,
          updateType:'content',
          anon:post.anon
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePost;