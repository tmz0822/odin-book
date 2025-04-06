const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedDatabase = async () => {
  // Delete all data from tables in the correct order to avoid foreign key conflicts
  await prisma.followRequest.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  try {
    console.log('Seeding database...');

    // Create two users
    const user1 = await prisma.user.create({
      data: {
        id: '1',
        username: 'admin',
        email: 'john.doe@example.com',
        password:
          '$2b$10$BnDN3TarLYB55d0Im4gRCOP5GXZqDw9trBfoHImbpBMgcf0Tc755O', // In production, hash passwords!
        profile: {
          create: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            bio: 'Hello, I am John!',
          },
        },
      },
    });

    const user2 = await prisma.user.create({
      data: {
        id: '2',
        username: 'user',
        email: 'jane.doe@example.com',
        password:
          '$2b$10$BnDN3TarLYB55d0Im4gRCOP5GXZqDw9trBfoHImbpBMgcf0Tc755O', // In production, hash passwords!
        profile: {
          create: {
            id: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            bio: 'Hello, I am Jane!',
          },
        },
      },
    });

    const user3 = await prisma.user.create({
      data: {
        id: '3',
        username: 'guest',
        email: 'guest@example.com',
        password:
          '$2b$10$BnDN3TarLYB55d0Im4gRCOP5GXZqDw9trBfoHImbpBMgcf0Tc755O', // In production, hash passwords!
        profile: {
          create: {
            id: '3',
            firstName: 'Guest',
            lastName: 'User',
            bio: 'Hello, I am a guest!',
          },
        },
      },
    });

    // Create posts for user1
    await prisma.post.createMany({
      data: [
        {
          content: 'This is my first post!',
          authorId: user1.id,
        },
        {
          content: 'Another day, another post.',
          authorId: user1.id,
        },
      ],
    });

    // Create posts for user2
    await prisma.post.createMany({
      data: [
        {
          content: 'Hello world! This is Jane.',
          authorId: user2.id,
        },
        {
          content: 'Loving this platform!',
          authorId: user2.id,
        },
      ],
    });

    // Create follow relationships
    await prisma.follow.createMany({
      data: [
        {
          followerId: user1.id, // User1 follows User2
          followingId: user2.id,
        },
        {
          followerId: user2.id, // User2 follows User1
          followingId: user1.id,
        },
        {
          followerId: user3.id, // User3 follows User1
          followingId: user1.id,
        },
      ],
    });

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
