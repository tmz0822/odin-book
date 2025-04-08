const fetchPosts = async (cursor = null) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts?cursor=${cursor || ""}`,
      {
        credentials: "include",
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const likePost = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/likes`,
      {
        credentials: "include",
        method: "post",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to like post");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postService = {
  fetchPosts,
  likePost,
};
