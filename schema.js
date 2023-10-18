import {readFileSync} from 'fs';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const resolvers = {
  Query: {
    tasks() {
      return tasks
    },
    task(_root, args) {
      return tasks.find(task => task.id == args.id)
    }
  }
}

const tasks = [
  {
    id: "1",
    title: "Hello world",
    description: "Task description"
  },
  {
    id: "2",
    title: "Hello world 2",
    description: "Task description 2"
  }
]

export { typeDefs, resolvers };
