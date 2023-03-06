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

async function dbGetAllUsers() {
  return prisma.user.findMany();
}

async function dbDeleteUserByName(userName: string) {
  return prisma.user.delete({
    where: {
      name: userName,
    },
  });
}

async function dbUpdateUserName(userName: string, newName: string) {
  return prisma.user.update({
    where: {
      name: userName,
    },
    data: {
      name: newName,
    },
  });
}

async function dbUpdateUserAvatar(userName: string, newAvatarURL: string) {
  return prisma.user.update({
    where: {
      name: userName,
    },
    data: {
      avatar: newAvatarURL,
    },
  });
}

async function dbGetUserByName(userName: string) {
  return prisma.user.findUnique({
    where: {
      name: userName,
    },
  });
}

export {
  dbCreateUser,
  dbDeleteUserByName,
  dbGetUserByName,
  dbUpdateUserAvatar,
  dbUpdateUserName,
  dbGetAllUsers,
};
