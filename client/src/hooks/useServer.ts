import client from "../client";

export default function useServer() {
  async function getUserById(userId: string) {
    return await client.users.getUserById.query({ userId: userId });
  }
  async function getUserByEmail(userEmail: string) {
    return await client.users.getUserByEmail.query({ userEmail: userEmail });
  }
  async function createUser(userEmail: string, userName: string) {
    return await client.users.createUser.query({
      userEmail: userEmail,
      userName: userName,
    });
  }

  async function deleteAllUsers() {
    await client.users.deleteAll.query();
  }

  async function getAllUsers() {
    return await client.users.getAll.query();
  }

  return {
    getUserById,
    createUser,
    deleteAllUsers,
    getUserByEmail,
    getAllUsers,
  };
}
