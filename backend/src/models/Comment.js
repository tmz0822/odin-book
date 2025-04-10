const prisma = require('../config/prisma');

const createComment = async (userId, postId, commentData) => {
  const { content } = commentData;
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

async function findPostComments(postId, page = 1, limit = 5) {
  const skip = (page - 1) * limit;

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            profile: {
              select: {
                picture: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    }),
    prisma.comment.count({ where: { postId } }),
  ]);

  return { comments, total };
}

module.exports = { createComment, findPostComments };
