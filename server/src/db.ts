import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function dbDeleteAllUsers() {
  return await prisma.user.deleteMany();
}

async function dbDeleteAllAlbums() {
  return await prisma.album.deleteMany();
}

async function dbDeleteAllPhotos() {
  return await prisma.photo.deleteMany({});
}

async function dbDeleteAll() {
  await dbDeleteAllPhotos();
  await dbDeleteAllAlbums();
  await dbDeleteAllUsers();
}

async function dbGetAllUsers() {
  return await prisma.user.findMany({
    include: {
      albums: true,
      photos: true,
    },
  });
}

async function dbGetUserById(userId: string) {
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

async function dbGetAllPhotos() {
  return prisma.photo.findMany();
}

async function dbGetAllAlbums() {
  return prisma.album.findMany();
}

async function dbGetAllPhotosByUserId(userId: string) {
  return prisma.photo.findMany({
    where: {
      authorId: userId,
    },
  });
}

async function dbDeletePhotoById(photoId: string) {
  return prisma.photo.delete({
    where: {
      id: photoId,
    },
  });
}

async function dbAddPhotoToAlbum(
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

async function dbGetAllAlbumsByUserId(userId: string) {
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

async function dbGetPhotoById(photoId: string) {
  return await prisma.photo.findUnique({
    where: {
      id: photoId,
    },
  });
}

async function dbGetAlbumById(albumId: string) {
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

async function dbAddAlbum(
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

async function dbDeleteAlbumById(albumId: string) {
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

async function dbGetAllPhotosByAlbumId(albumId: string) {
  return await prisma.photo.findMany({
    where: {
      albumId: albumId,
    },
  });
}

async function dbRenamePhotoById(photoId: string, newName: string) {
  return await prisma.photo.update({
    where: {
      id: photoId,
    },
    data: {
      name: newName,
    },
  });
}

async function dbRenameAlbumById(photoId: string, newName: string) {
  return await prisma.photo.update({
    where: {
      id: photoId,
    },
    data: {
      name: newName,
    },
  });
}

async function dbDeleteUserById(userId: string) {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

async function dbCreateUser(
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

export {
  dbGetAlbumById,
  dbGetAllAlbumsByUserId,
  dbGetAllAlbums,
  dbGetPhotoById,
  dbGetAllPhotos,
  dbGetAllPhotosByAlbumId,
  dbGetAllPhotosByUserId,
  dbGetUserById,
  dbGetAllUsers,
  dbAddAlbum,
  dbAddPhotoToAlbum,
  dbCreateUser,
  dbDeleteAlbumById,
  dbDeletePhotoById,
  dbDeleteUserById,
  dbDeleteAll,
  dbDeleteAllAlbums,
  dbDeleteAllPhotos,
  dbDeleteAllUsers,
  dbRenameAlbumById,
  dbRenamePhotoById,
};
