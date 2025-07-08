/* const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require ('ioredis');

const dotenv = require ('dotenv');
dotenv.config(); */

import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

import dotenv from 'dotenv';
dotenv.config();

const options = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
    tls: {},
    retryStrategy: times => {
        return Math.min(times * 50, 200);
    }
};

const pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
});

export default pubsub;