import { readFileSync } from 'fs';
import { findUserById, getUsers } from './user.js';
import { getTaskById, getTasks } from './task/index.js';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const resolvers = {
  Query: {
    tasks() {
      return getTasks();
    },
    task(_root, args) {
      return getTaskById(args.id)
    },
    users(){
      return getUsers();
    },
    async loggedUser(_root, _args, contextValue){
      if (!contextValue.userId){
        return null;
      }
      const { username, id } = await findUserById(contextValue.userId);
      return { username, id };
    }
  }
}

export { typeDefs, resolvers };
