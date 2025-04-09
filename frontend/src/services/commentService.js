const addComment = async (postId, commentData) => {
  const response = await fetch(
    `http://localhost:3000/posts/${postId}/comments`,
    {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    }
  );

  return await response.json();
};

export const commentService = {
  addComment,
};
