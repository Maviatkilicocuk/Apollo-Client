/* const { createServer } = require("node:http");
const { createSchema, createYoga } = require("graphql-yoga");
const pubsub = require("./pubsub");
const fs = require("fs");
const path = require("path");

const db = require ('./data');

const resolvers = require("./graphql/resolvers");
const typeDefs = require('./graphql/type-defs');
const { resolve } = require("node:path"); */

import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import pubsub from "./pubsub.js";
import fs from "fs";
import path from "path";

import db from "./data.js";

import resolvers from "@resolvers";
import typeDefs from "@type-defs";
import resolve from "node:path";

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  context: ({ request, response }) => ({
    pubsub,
    db,
  }),
});


const server = createServer(yoga);


server.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
});
