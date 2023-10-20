import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { findUserById, getUsers } from '../app/user/user.js';
import { getTaskById, getTasks } from '../app/task/index.js';

const filename = fileURLToPath(import.meta.url);

const typeDefs = readFileSync(resolve(dirname(filename), 'schema.graphql'), { encoding: 'utf-8' });

const resolvers = {
  Query: {
    tasks() {
      return getTasks();
    },
    task(_root, args) {
      return getTaskById(args.id);
    },
    users() {
      return getUsers();
    },
    async loggedUser(_root, _args, contextValue) {
      if (!contextValue.userId) {
        return null;
      }
      const { username, id } = await findUserById(contextValue.userId);
      return { username, id };
    }
  }
};

export { typeDefs, resolvers };
