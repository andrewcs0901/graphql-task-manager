import bcrypt from 'bcrypt';
import { security } from '../../config/index.js';
const users = []

const initDb = async () => {
  const defaultHash = await bcrypt.hash("admin", security.getSaltRounds());
  users.push({
    id: 1,
    username: "admin",
    hash: defaultHash
  })
}

const findUser = async (username) => {
  if(!users.length) {
    await initDb();
  }
  return users.find(user => user.username == username);
}

const findUserById = async (id) => {
  if(!users.length) {
    await initDb();
  }
  return users.find(user => user.id == id);
}

const getUsers = () => {
  return users;
}

export { findUser, getUsers, findUserById };