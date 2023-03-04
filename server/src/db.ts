import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function dbCreateUser(
  name: string,
  userEmail: string,
  avatarURL: string
) {
  return prisma.user.create({
    data: {
      avatar: avatarURL,
      email: userEmail,
      name: name,
    },
  });
}

async function dbDeleteUserByEmail(userEmail: string) {
  prisma.user.delete({
    where: {
      email: userEmail,
    },
  });
}

async function dbUpdateUserName(userEmail: string, newName: string) {
  prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      name: newName,
    },
  });
}

async function dbUpdateUserAvatar(userEmail: string, newAvatarURL: string) {
  prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      avatar: newAvatarURL,
    },
  });
}

async function dbGetUserByEmail(userEmail: string) {
  return prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

export {
  dbCreateUser,
  dbDeleteUserByEmail,
  dbGetUserByEmail,
  dbUpdateUserAvatar,
  dbUpdateUserName,
};
