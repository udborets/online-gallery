import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function dbDeleteAllUsers() {
  try {
    return await prisma.user.deleteMany();
  } catch (e) {
    return null;
  }
}

async function dbDeleteAllAlbums() {
  try {
    return await prisma.album.deleteMany();
  } catch (e) {
    return null;
  }
}

async function dbDeleteAllPhotos() {
  try {
    return await prisma.photo.deleteMany({});
  } catch (e) {
    return null;
  }
}

async function dbDeleteAll() {
  try {
    await dbDeleteAllPhotos();
    await dbDeleteAllAlbums();
    await dbDeleteAllUsers();
  } catch (e) {
    return null;
  }
}

async function dbGetAllUsers() {
  try {
    return await prisma.user.findMany({
      include: {
        albums: true,
        photos: true,
      },
    });
  } catch (e) {
    return null;
  }
}
async function dbGetUserByEmail(userEmail: string) {
  try {
    return prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
  } catch (e) {
    return null;
  }
}
async function dbGetUserById(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        albums: true,
        photos: true,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbGetAllPhotos() {
  try {
    return prisma.photo.findMany();
  } catch (e) {
    return null;
  }
}

async function dbGetAllAlbums() {
  try {
    return prisma.album.findMany();
  } catch (e) {
    return null;
  }
}

async function dbGetAllPhotosByUserId(userId: string) {
  try {
    return prisma.photo.findMany({
      where: {
        authorId: userId,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbDeletePhotoById(photoId: string) {
  try {
    return prisma.photo.delete({
      where: {
        id: photoId,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbAddPhotoToAlbum(
  userId: string,
  albumId: string,
  photoName: string,
  photoDescription?: string
) {
  try {
    return await prisma.photo.create({
      data: {
        authorId: userId,
        albumId: albumId,
        name: photoName,
        description: photoDescription ?? null,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbGetAllAlbumsByUserId(userId: string) {
  try {
    return await prisma.album.findMany({
      where: {
        authorId: userId,
      },
      include: {
        photos: true,
        author: true,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbGetPhotoById(photoId: string) {
  try {
    return await prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbGetAlbumById(albumId: string) {
  try {
    return await prisma.album.findFirst({
      where: {
        id: albumId,
      },
      include: {
        photos: true,
        author: true,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbAddAlbum(
  userId: string,
  albumName: string,
  albumDescription?: string
) {
  try {
    return await prisma.album.create({
      data: {
        name: albumName,
        authorId: userId,
        description: albumDescription ?? null,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbDeleteAlbumById(albumId: string) {
  try {
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
  } catch (e) {
    return null;
  }
}

async function dbGetAllPhotosByAlbumId(albumId: string) {
  try {
    return await prisma.photo.findMany({
      where: {
        albumId: albumId,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbRenamePhotoById(photoId: string, newName: string) {
  try {
    return await prisma.photo.update({
      where: {
        id: photoId,
      },
      data: {
        name: newName,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbRenameAlbumById(photoId: string, newName: string) {
  try {
    return await prisma.photo.update({
      where: {
        id: photoId,
      },
      data: {
        name: newName,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbDeleteUserById(userId: string) {
  try {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (e) {
    return null;
  }
}

async function dbCreateUser(
  userEmail: string,
  userName: string,
  userAvatar?: string,
  userRole?: Role
) {
  try {
    return await prisma.user.create({
      data: {
        email: userEmail,
        name: userName,
        avatar: userAvatar ?? null,
        role: userRole ?? Role.BASIC,
      },
    });
  } catch (e) {
    return null;
  }
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
  dbGetUserByEmail,
};
