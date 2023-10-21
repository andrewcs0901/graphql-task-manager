import bcrypt from 'bcrypt';
import { security } from '../../config/index.js';
const users = [];

const initDb = async () => {
  const defaultHash = await bcrypt.hash('admin', security.getSaltRounds());
  users.push({
    id: '1',
    username: 'admin',
    hash: defaultHash
  });
};

const getUsers = async () => {
  if (!users.length) {
    await initDb();
  }
  return users;
};

const findUser = async (username) => {
  const currentUsers = await getUsers();
  return currentUsers.find(user => user.username === username);
};

const findUserById = async (id) => {
  const currentUsers = await getUsers();
  return currentUsers.find(user => user.id === id);
};

const createUser = async ({ username, password }) => {
  const currentUsers = await getUsers();
  if (currentUsers.find(user => user.username === username)) {
    throw new Error('This username already exists');
  }
  const hash = await bcrypt.hash(password, security.getSaltRounds());
  const user = {
    id: users.length + 1,
    username,
    hash
  };
  users.push(user);
  return user;
};

export {
  findUser, getUsers, findUserById, createUser
};
