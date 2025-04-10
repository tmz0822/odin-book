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

const fetchPostComments = async (postId, page = 1, limit = 5) => {
  try {
    console.log('page:', page);
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/comments?page=${page}&limit=${limit}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching comments: ${response.statusText}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return { comments: [], meta: { total: 0, page, totalPages: 0 } };
  }
};

export const commentService = {
  addComment,
  fetchPostComments,
};
