import client from "../client";

export default function useServer() {
  async function getUserById(userId: string) {
    return await client.getUserById.query({ userId: userId });
  }

  async function getUserByEmail(userEmail: string) {
    return await client.getUserByEmail.query({ userEmail: userEmail });
  }

  async function createUser(userEmail: string, userName: string) {
    return await client.createUser.query({
      userEmail: userEmail,
      userName: userName,
    });
  }

  async function getAllPhotosByAlbumId(albumId: string) {
    return await client.getAllPhotosByAlbumId.query({ albumId: albumId });
  }

  async function getPhotoById(photoId: string) {
    return await client.getPhotoById.query({ photoId: photoId });
  }

  async function getAllUsers() {
    return await client.getAllUsers.query();
  }

  async function createAlbum(
    userId: string,
    albumName: string,
    albumDescription: string,
    isPrivate?: boolean
  ) {
    await client.addAlbumToUser.query({
      userId: userId,
      albumName: albumName,
      albumDescription: albumDescription,
      isPrivate: isPrivate ?? false,
    });
  }

  async function getAlbumById(albumId: string) {
    return await client.getAlbumById.query({ albumId });
  }

  return {
    getUserById,
    createUser,
    getUserByEmail,
    getAllUsers,
    createAlbum,
    getAllPhotosByAlbumId,
    getAlbumById,
    getPhotoById,
  };
}
