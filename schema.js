import {readFileSync} from 'fs';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const resolvers = {
  Query: {
    getTasks() {
      return tasks
    }
  }
}

const tasks = [
  {
    id: "1",
    title: "Hello world",
    description: "Task description"
  }
]

export { typeDefs, resolvers };
