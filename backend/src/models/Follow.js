const prisma = require('../config/prisma');

const addFollowRequest = async (senderId, receiverId) => {
  if (senderId === receiverId) {
    throw new Error('You cannot send a follow request to yourself');
  }

  try {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: senderId,
          followingId: receiverId,
        },
      },
    });

    if (existingFollow) {
      throw new Error('You are already following this person');
    }

    // Update follow request if the request exists
    // Change the status to 'PENDING' as user sends follow request again
    const followRequest = await prisma.followRequest.upsert({
      where: {
        senderId_receiverId: { senderId, receiverId },
      },
      update: {
        status: 'PENDING',
      },
      create: {
        sender: {
          connect: {
            id: senderId,
          },
        },
        receiver: {
          connect: {
            id: receiverId,
          },
        },
      },
    });

    return followRequest;
  } catch (error) {
    console.error('Failed to create follow request:', error);
    throw new Error(error.message);
  }
};

const updateFollowRequest = async (userId, followRequestId, status) => {
  try {
    const followRequest = await findFollowRequestById(followRequestId);

    if (!followRequest) {
      throw new Error('Follow request not found');
    }

    // Ensure the logged-in user is the receiver of the follow request.
    if (followRequest.receiverId !== userId) {
      throw new Error('Unauthorized to accept this follow request');
    }

    const updatedFollowRequest = await prisma.followRequest.update({
      where: {
        id: followRequestId,
      },
      data: {
        status: status,
      },
    });

    return updatedFollowRequest;
  } catch (error) {
    console.error('Failed to accept follow request:', error);
    throw new Error(error.message);
  }
};

const addFollow = async (followerId, followingId) => {
  try {
    const follow = await prisma.follow.create({
      data: {
        follower: {
          connect: {
            id: followerId, // The user who is following
          },
        },
        following: {
          connect: {
            id: followingId, // The user being followed
          },
        },
      },
    });

    return follow;
  } catch (error) {
    console.error('Failed to follow:', error);
    throw new Error(error.message);
  }
};

const findUserFollowings = async (userId) => {
  console.log(`userid`, userId);
  try {
    const followings = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            username: true,
            profile: true,
          },
        },
      },
    });

    return followings;
  } catch (error) {
    console.error('Failed to find user followings:', error);
    throw new Error(error.message);
  }
};

const findUserFollowers = async (userId) => {
  try {
    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      select: {
        follower: {
          select: {
            id: true,
            username: true,
            profile: true,
          },
        },
      },
    });

    return followers;
  } catch (error) {
    console.error('Failed to find follows:', error);
    throw new Error(error.message);
  }
};

const findFollowRequest = async (senderId, receiverId) => {
  try {
    const followRequest = await prisma.followRequest.findUnique({
      where: {
        senderId_receiverId: { senderId, receiverId },
      },
    });

    return followRequest;
  } catch (error) {
    console.error('Failed to find follow request:', error);
    throw new Error(error.message);
  }
};

const findFollowRequestById = async (id) => {
  try {
    const followRequest = await prisma.followRequest.findUnique({
      where: {
        id: id,
      },
    });

    return followRequest;
  } catch (error) {
    console.error('Failed to find follow request by id:', error);
    throw new Error(error.message);
  }
};

const deleteFollow = async (followerId, followingId) => {
  try {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });

    if (!existingFollow) {
      throw new Error('Follow relationship not found');
    }

    const deletedFollow = await prisma.follow.delete({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });

    // set FollowRequestStatus to 'UNFOLLOWED' after unfollow
    await prisma.followRequest.update({
      where: {
        senderId_receiverId: { senderId: followerId, receiverId: followingId },
      },
      data: {
        status: 'UNFOLLOWED',
      },
    });

    return deletedFollow;
  } catch (error) {
    console.error('Failed to delete follow:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  addFollowRequest,
  updateFollowRequest,
  addFollow,
  findUserFollowings,
  findUserFollowers,
  deleteFollow,
};
