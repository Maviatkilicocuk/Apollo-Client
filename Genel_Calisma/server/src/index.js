import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

import pubsub from "./pubsub.js";
import db from "./db.js";
import User from "./models/User.js";
import resolvers from "@resolvers";
import typeDefs from "@type-defs";

db(); // DB bağlantısını başlat

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  context: () => ({ pubsub, db, _db: { User } }),
});

const server = createServer(yoga);

const wsServer = new WebSocketServer({
  server,
  path: "/",
});

console.log("📡 WebSocket server created on path /");

useServer(
  {
    schema,
    context: () => ({ pubsub, db, _db: { User } }),
    onConnect: (ctx) => {
      console.log("✅ WS client connected", ctx);
    },
    onSubscribe: (ctx, msg) => {
      console.log("📨 WS subscribe received:", msg.payload);
    },
    onNext: (ctx, msg, args, result) => {
      console.log("📤 WS sent result:", result);
    },
    onError: (ctx, msg, errors) => {
      console.error("❗ WS error:", errors);
    },
    onComplete: (ctx, msg) => {
      console.log("❌ WS subscription completed");
    },
  },
  wsServer
);

server.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
});
