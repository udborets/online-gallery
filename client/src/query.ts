import client from "./client";

async function deleteUser(userName: string) {
  return await client.deleteUserByName.query({ userName: userName });
}

async function getUser(userName: string) {
  return await client.getUserByName.query({ userName: userName });
}

async function getUsers() {
  return await client.getAllUsers.query();
}

async function updateUserName(userName: string, newName: string) {
  return await client.updateUserName.query({
    userName: userName,
    newName: newName,
  });
}

async function updateUserAvatar(userName: string, avatarURL: string) {
  return await client.updateUserAvatar.query({
    userName: userName,
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
