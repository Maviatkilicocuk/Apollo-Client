"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _path=_interopRequireDefault(require("path"));var _merge=require("@graphql-tools/merge");var _loadFiles=require("@graphql-tools/load-files");function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}/* const Query = require("./Query");
const Mutation = require("./Mutation");
const Subscription = require("./Subscription");
const Event = require("./Event");
const Location = require("./Location");
const User = require("./User");
const Participant = require("./Participant");

module.exports = {
    Query,
    Mutation,
    Subscription,
    Event,
    Location,
    User,
    Participant,
}; *//* const path = require('path');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');  */var resolversArray=(0,_loadFiles.loadFilesSync)(_path["default"].join(__dirname),{extensions:["js"],ignoreIndex:true});var _default=exports["default"]=(0,_merge.mergeResolvers)(resolversArray);