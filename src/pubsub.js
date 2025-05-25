import { RedisPubsub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'
import dotenv from 'dotenv'
dotenv.config();

const option = {
    host: process.env.REDIS_HOST,
    post: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
        return Math.min(times * 50, 200);
    },
};

const pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
});

export default pubsub;