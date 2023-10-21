import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { findUserById, getUsers } from '../app/user/user.js';
import { createTask, getDoneTasks, getNotDoneTasks, getTaskById, getTasks, deleteTask as delTask, updateTask as patchTask } from '../app/task/index.js';

const filename = fileURLToPath(import.meta.url);

const typeDefs = readFileSync(resolve(dirname(filename), 'schema.graphql'), { encoding: 'utf-8' });

const resolvers = {
  Query: {
    tasks(_root, args, contextValue) {
      if(args.isDone === true){
        return getDoneTasks(contextValue.userId);
      }
      if(args.isDone === false){
        return getNotDoneTasks(contextValue.userId);
      }
      return getTasks(contextValue.userId);
    },
    task(_root, args, contextValue) {
      return getTaskById(contextValue.userId, args.id);
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
  },
  Mutation: {
    createTask(_root, args, contextValue) {
      return createTask(contextValue.userId, args);
    },
    updateTask(_root, args, contextValue) {
      return patchTask(contextValue.userId, args)
    },
    deleteTask(_root, args, contextValue) {
      return delTask(contextValue.userId, args)
    }
  }
};

export { typeDefs, resolvers };
