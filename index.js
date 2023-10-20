import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './graphql/schema.js';
import { login, getUserIdFromAuth } from './services/auth/auth.js';

const port = 4000;

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use(cors());
app.use(express.json());

app.use(
  '/api/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const { authorization } = req.headers;
      if (authorization) {
        const userId = getUserIdFromAuth(authorization);
        return { userId };
      }
    }
  })
);

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error('Missing username or password');
    }
    const token = await login({ username, password });
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

await new Promise((resolve) => httpServer.listen(port, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/`);
