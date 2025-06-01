"use strict";var _nodeHttp=require("node:http");var _graphqlYoga=require("graphql-yoga");var _pubsub=_interopRequireDefault(require("./pubsub.js"));var _fs=_interopRequireDefault(require("fs"));var _path=_interopRequireDefault(require("path"));var _data=_interopRequireDefault(require("./data.js"));var _index=_interopRequireDefault(require("./graphql/resolvers/index.js"));var _index2=_interopRequireDefault(require("./graphql/type-defs/index.js"));var _nodePath=_interopRequireDefault(require("node:path"));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}/* const { createServer } = require("node:http");
const { createSchema, createYoga } = require("graphql-yoga");
const pubsub = require("./pubsub");
const fs = require("fs");
const path = require("path");

const db = require ('./data');

const resolvers = require("./graphql/resolvers");
const typeDefs = require('./graphql/type-defs');
const { resolve } = require("node:path"); */var schema=(0,_graphqlYoga.createSchema)({typeDefs:_index2["default"],resolvers:_index["default"]});var yoga=(0,_graphqlYoga.createYoga)({schema:schema,graphqlEndpoint:"/",context:function context(_ref){var request=_ref.request,response=_ref.response;return{pubsub:_pubsub["default"],db:_data["default"]}}});var server=(0,_nodeHttp.createServer)(yoga);server.listen(4000,function(){console.log("\uD83D\uDE80 Server running at http://localhost:4000")});