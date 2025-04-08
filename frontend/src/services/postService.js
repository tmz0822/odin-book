const fetchPosts = async (cursor = null) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts?cursor=${cursor || ''}`,
      {
        credentials: 'include',
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postService = {
  fetchPosts,
};
