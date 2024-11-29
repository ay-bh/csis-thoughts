export const handleLike = async (postId, posts, setPosts) => {
  const postIndex = posts.findIndex((post) => post._id === postId);
  if (postIndex === -1) return;

  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({
        updateType: "like",
      }),
    });

    if (response.ok) {
      setPosts((currentPosts) =>
        currentPosts.map((post, index) =>
          index === postIndex ? { ...post, likes: post.likes + 1 } : post
        )
      );
    }
  } catch (error) {
    console.error("Error liking post:", error);
  }
}; 