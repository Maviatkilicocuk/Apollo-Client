/* const Query = require("./Query");
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
}; */

/* const path = require('path');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');  */

import path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolversArray = loadFilesSync(path.join(__dirname), {
    extensions: ['js'],
    ignoreIndex: true 
});

export default mergeResolvers(resolversArray);