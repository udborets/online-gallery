import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function deleteAllUsers() {
  return await prisma.user.deleteMany();
}

async function deleteAllAlbums() {
  return await prisma.album.deleteMany();
}

async function deleteAllPhotos() {
  return await prisma.photo.deleteMany({});
}

async function deleteAll() {
  await deleteAllPhotos();
  await deleteAllAlbums();
  await deleteAllUsers();
}

async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      albums: true,
      photos: true,
    },
  });
}

async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      albums: true,
      photos: true,
    },
  });
}

async function getAllPhotos() {
  return prisma.photo.findMany();
}

async function getAllAlbums() {
  return prisma.album.findMany();
}

async function getAllPhotosByUserId(userId: string) {
  return prisma.photo.findMany({
    where: {
      authorId: userId,
    },
  });
}

async function deletePhotoById(photoId: string) {
  return prisma.photo.delete({
    where: {
      id: photoId,
    },
  });
}

async function addPhotoToAlbum(
  userId: string,
  albumId: string,
  photoName: string,
  photoDescription?: string
) {
  return await prisma.photo.create({
    data: {
      authorId: userId,
      albumId: albumId,
      name: photoName,
      description: photoDescription ?? null,
    },
  });
}

async function getAllAlbumsByUserId(userId: string) {
  return await prisma.album.findMany({
    where: {
      authorId: userId,
    },
    include: {
      photos: true,
      author: true,
    },
  });
}

async function getPhotoById(photoId: string) {
  return await prisma.photo.findUnique({
    where: {
      id: photoId,
    },
  });
}

async function getAlbumById(albumId: string) {
  return await prisma.album.findFirst({
    where: {
      id: albumId,
    },
    include: {
      photos: true,
      author: true,
    },
  });
}

async function addAlbum(
  userId: string,
  albumName: string,
  albumDescription?: string
) {
  return await prisma.album.create({
    data: {
      name: albumName,
      authorId: userId,
      description: albumDescription ?? null,
    },
  });
}

async function deleteAlbumById(albumId: string) {
  await prisma.photo.deleteMany({
    where: {
      albumId: albumId,
    },
  });
  await prisma.album.delete({
    where: {
      id: albumId,
    },
  });
}

async function getAllPhotosByAlbumId(albumId: string) {
  return await prisma.photo.findMany({
    where: {
      albumId: albumId,
    },
  });
}

async function renamePhotoById(photoId: string, newName: string) {
  return await prisma.photo.update({
    where: {
      id: photoId,
    },
    data: {
      name: newName,
    },
  });
}

async function renameAlbumById(photoId: string, newName: string) {
  return await prisma.photo.update({
    where: {
      id: photoId,
    },
    data: {
      name: newName,
    },
  });
}

async function deleteUserById(userId: string) {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

async function createUser(
  userEmail: string,
  userName: string,
  userAvatar?: string,
  userRole?: Role
) {
  return await prisma.user.create({
    data: {
      email: userEmail,
      name: userName,
      avatar: userAvatar ?? null,
      role: userRole ?? Role.BASIC,
    },
  });
}

export default {
  getAlbumById,
  getAllAlbumsByUserId,
  getAllAlbums,
  getPhotoById,
  getAllPhotos,
  getAllPhotosByAlbumId,
  getAllPhotosByUserId,
  getUserById,
  getAllUsers,
  addAlbum,
  addPhotoToAlbum,
  createUser,
  deleteAlbumById,
  deletePhotoById,
  deleteUserById,
};
