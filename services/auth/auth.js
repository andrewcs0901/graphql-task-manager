import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUser } from '../../app/user/user.js';
import { GraphQLError } from 'graphql';
import { jwtConfig } from '../../config/index.js';

const login = async ({ username, password }) => {
  const user = await findUser(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const result = await bcrypt.compare(password, user.hash);
  if (!result) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ userId: user.id }, jwtConfig.secret(), {
    expiresIn: jwtConfig.expirationTime()
  });

  return { token };
};

const getUserIdFromAuth = (token) => {
  try {
    const { userId } = jwt.verify(token, jwtConfig.secret());
    return userId;
  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    });
  }
};

export { login, getUserIdFromAuth };
