const prisma = require('../config/prisma');

const createComment = async (userId, postId, content) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        content: content,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });

    return comment;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = { createComment };
