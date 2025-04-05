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
      },
    });

    return user;
  } catch (error) {
    console.error('Failed to find user:', error);
    throw new Error(error.message);
  }
};

const findById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
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

module.exports = { createUser, findByEmail, findByUsername, findById };
