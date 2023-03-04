import client from "./client";

async function deleteUser(email: string) {
  return await client.deleteUserByEmail.query({ userEmail: email });
}

async function getUser(email: string) {
  return await client.getUserByEmail.query({ userEmail: email });
}

async function getUsers() {
  return await client.getAllUsers.query();
}

async function updateUserName(email: string, name: string) {
  return await client.updateUserName.query({
    userEmail: email,
    userName: name,
  });
}

async function updateUserAvatar(email: string, avatarURL: string) {
  return await client.updateUserAvatar.query({
    userEmail: email,
    avatarURL: avatarURL,
  });
}

async function createUser(email: string, name: string, avatarURL: string) {
  return await client.createUser.query({
    userEmail: email,
    userName: name,
    avatarURL: avatarURL,
  });
}

export {
  deleteUser,
  getUser,
  updateUserName,
  updateUserAvatar,
  createUser,
  getUsers,
};
