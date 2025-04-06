const prisma = require('../config/prisma');

const addPost = async (postData, userId) => {
  const { content } = postData;

  try {
    const post = await prisma.post.create({
      data: {
        content: content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error('Failed to add post: ', error);
    throw new Error(error.message);
  }
};

const deletePost = async (postId, userId) => {
  try {
    // Verify ownership
    await findPostByUserId(postId, userId);

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return deletedPost;
  } catch (error) {
    console.error('Failed to delete post:', error);
    throw new Error(error.message);
  }
};

const findAllPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        likes: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

const findPostsByUserId = async (userId) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    return posts;
  } catch (error) {
    console.error('Failed to find posts:', error);
    throw new Error(error.message);
  }
};

const updatePost = async (postId, userId, updatedFields) => {
  try {
    await findPostByUserId(postId, userId);

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: updatedFields,
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return updatedPost;
  } catch (error) {
    console.error('Failed to update post:', error);
    throw new Error(error.message);
  }
};

// Used to verify the ownership of the post
const findPostByUserId = async (postId, userId) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.authorId !== userId) {
      throw new Error('Unauthorized to access this post');
    }

    return post;
  } catch (error) {
    console.error('Failed to find post:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  addPost,
  deletePost,
  findAllPosts,
  findPostsByUserId,
  updatePost,
};
