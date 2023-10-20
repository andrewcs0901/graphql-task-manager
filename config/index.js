import dotenv from 'dotenv-safe';

dotenv.config();

const { SECRET, DEFAULT_TOKEN_EXPIRE_TIME, SALT_ROUNDS } = process.env;

const jwtConfig = {
  secret() {
    return SECRET;
  },

  expirationTime: () => {
    return Number.isNaN(+DEFAULT_TOKEN_EXPIRE_TIME)
      ? DEFAULT_TOKEN_EXPIRE_TIME : +DEFAULT_TOKEN_EXPIRE_TIME;
  }
};

const security = {
  getSaltRounds: () => {
    return +SALT_ROUNDS;
  }
};

export { jwtConfig, security };
