import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10),
  mongodbUrl: process.env.MONGODB_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT, 10),
});
