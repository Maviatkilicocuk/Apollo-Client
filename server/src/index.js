const { createServer } = require("node:http");
const { createYoga } = require("graphql-yoga");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { PubSub } = require("graphql-subscriptions");
const { v4: uuidv4 } = require("uuid");


import { GraphQLServer } from 'graphql-yoga'
import resolvers from '@resolvers'
import typeDefs from '@type-defs'
import pubsub from './pubsub'
import db from './data'


const fs = require("fs");
const path = require("path");
const { users, events, locations, participants } = require("./data");

let userList = [...users];
let eventList = [...events];
let locationList = [...locations];
let participantList = [...participants];



const pubsub = new PubSub();
const USER_CREATED = "USER_CREATED";
const USER_UPDATED = "USER_UPDATED";
const USER_DELETED = "USER_DELETED";

const EVENT_CREATED = "EVENT_CREATED";
const EVENT_UPDATED = "EVENT_UPDATED";
const EVENT_DELETED = "EVENT_DELETED";

const PARTICIPANT_CREATED = "PARTICIPANT_CREATED";
const PARTICIPANT_UPDATED = "PARTICIPANT_UPDATED";
const PARTICIPANT_DELETED = "PARTICIPANT_DELETED";


const typeDefs = fs.readFileSync(
  path.join(__dirname, "./graphql/schema.graphql"),
  "utf-8"
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  context: () => ({ pubsub }),
  graphqlEndpoint: "/",
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("✅ Server is running at http://localhost:4000");
});
