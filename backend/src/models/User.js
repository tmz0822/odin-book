const prisma = require('../config/prisma');

const createUser = async (userData) => {
  const { email, username, password, firstName, lastName } = userData;

  try {
    const createdUser = await prisma.user.create({
      data: {
        email,
        username,
        password,
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        profile: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return createdUser;
  } catch (error) {
    console.error('Failed to create user: ', error);
    throw new Error(error.message);
  }
};

// Returning user list that consists of avatar, full name.
const findAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        profile: {
          select: {
            picture: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return { users };
  } catch (error) {
    console.error('Failed to find all users: ', error);
    throw new Error(error.message);
  }
};

const findByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Failed to find user:', error);
    throw new Error(error.message);
  }
};

const findByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        likes: true,
        following: true,
        followers: true,
        sentFollowRequests: true,
        receivedFollowRequests: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Failed to find user:', error);
    throw new Error(error.message);
  }
};

// Used to get the 'current' user
const findById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        likes: true,
        following: true,
        followers: true,
        sentFollowRequests: true,
        receivedFollowRequests: true,
      },
      omit: {
        password: true,
      },
    });

    // Map the relationships to make them more intuitive
    return user;
  } catch (error) {
    console.error('Failed to find user:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findByEmail,
  findByUsername,
  findById,
};
