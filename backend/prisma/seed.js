const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  await prisma.followRequest.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      id: '1',
      username: 'admin',
      email: faker.internet.email(),
      password: '$2a$12$S7L9DdFkTW1FZGCiczzGYu0wzWRV9WrVtfJhFASEGtr0ML2RvvRfO',
      profile: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          bio: faker.lorem.sentence(),
          picture: faker.image.avatar(),
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      id: '2',
      username: 'user',
      email: faker.internet.email(),
      password: '$2a$12$S7L9DdFkTW1FZGCiczzGYu0wzWRV9WrVtfJhFASEGtr0ML2RvvRfO',
      profile: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          bio: faker.lorem.sentence(),
          picture: faker.image.avatar(),
        },
      },
    },
  });

  const users = [];
  for (let i = 2; i < 10; i++) {
    const username = faker.internet.username();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const user = await prisma.user.create({
      data: {
        id: (i + 1).toString(),
        username,
        email,
        password,
        profile: {
          create: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            bio: faker.lorem.sentence(),
            picture: faker.image.avatar(),
          },
        },
      },
    });

    users.push(user);
  }

  // Create posts for users
  for (const user of users) {
    for (let j = 0; j < faker.number.int({ min: 1, max: 3 }); j++) {
      const post = await prisma.post.create({
        data: {
          content: faker.lorem.paragraph(),
          authorId: user.id,
        },
      });

      // Comments from random users
      const commentCount = faker.number.int({ min: 1, max: 5 });
      for (let k = 0; k < commentCount; k++) {
        const commenter =
          users[faker.number.int({ min: 0, max: users.length - 1 })];
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            postId: post.id,
            userId: commenter.id,
          },
        });
      }

      // Likes from random users
      const likedUserIds = new Set();
      while (
        likedUserIds.size < faker.number.int({ min: 1, max: users.length })
      ) {
        const liker =
          users[faker.number.int({ min: 0, max: users.length - 1 })];
        if (liker.id !== user.id) likedUserIds.add(liker.id);
      }

      await prisma.post.update({
        where: { id: post.id },
        data: {
          likes: {
            connect: Array.from(likedUserIds).map((id) => ({ id })),
          },
        },
      });
    }
  }

  // Follow relationships
  for (const follower of users) {
    const followingCount = faker.number.int({ min: 1, max: 5 });
    const followings = new Set();
    while (followings.size < followingCount) {
      const followee =
        users[faker.number.int({ min: 0, max: users.length - 1 })];
      if (followee.id !== follower.id) followings.add(followee.id);
    }

    for (const followingId of followings) {
      await prisma.follow.create({
        data: {
          followerId: follower.id,
          followingId,
        },
      });
    }
  }

  // Follow requests
  for (let i = 0; i < 10; i++) {
    const sender = users[faker.number.int({ min: 0, max: users.length - 1 })];
    let receiver = users[faker.number.int({ min: 0, max: users.length - 1 })];
    while (sender.id === receiver.id) {
      receiver = users[faker.number.int({ min: 0, max: users.length - 1 })];
    }

    await prisma.followRequest.upsert({
      where: {
        senderId_receiverId: {
          senderId: sender.id,
          receiverId: receiver.id,
        },
      },
      update: {},
      create: {
        senderId: sender.id,
        receiverId: receiver.id,
        status: faker.helpers.arrayElement(['PENDING', 'ACCEPTED', 'REJECTED']),
      },
    });
  }

  console.log('Seed complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
