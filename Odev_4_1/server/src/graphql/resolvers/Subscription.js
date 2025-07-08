/* const { withFilter } = require("graphql-subscriptions");
const pubsub = require('../../pubsub');
const { events, locations, users, participants } = require('../../data'); */

import { withFilter } from 'graphql-subscriptions';
import pubsub from '../../pubsub';
import {events, locations, users, participants } from '../../data';

export const Subscription = {
    // User
    userCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("USER_CREATED"),
        (payload, variables) => {

          return variables.id? payload.userCreated.id === variables.id : true;
        }
      ),
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator("USER_UPDATED"),
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator("USER_DELETED"),
    },
    userCount: {
      subscribe: (parent, args, { pubsub }) => {
        setTimeout(() => {
          pubsub.publish("USER_COUNT", { userCount: users.length });
        }, 1000);

        return pubsub.asyncIterator("USER_COUNT");
      },
    },

    // Event
    eventCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("EVENT_CREATED"),
        (payload, variables) => {

          return variables.user_id? payload.eventCreated.user_id === variables.user_id : true;
        }
      ),
    },
    eventUpdated: {
      subscribe: () => pubsub.asyncIterator("EVENT_UPDATED"),
    },
    eventDeleted: {
      subscribe: () => pubsub.asyncIterator("EVENT_DELETED"),
    },

    // Location
    locationCreated: {
      subscribe: () => pubsub.asyncIterator("LOCATION_CREATED"),
    },
    locationUpdated: {
      subscribe: () => pubsub.asyncIterator("LOCATION_UPDATED"),
    },
    locationDeleted: {
      subscribe: () => pubsub.asyncIterator("LOCATION_DELETED"),
    },
    
    // Participant
    participantCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("PARTICIPANT_CREATED"),
        (payload, variables) => {
          console.log("payload", payload);
          console.log("variables", variables);

          return variables.user_id? payload.participantCreated.user_id === variables.user_id : true;
        }
      ),
    },
    participantUpdated: {
      subscribe: () => pubsub.asyncIterator("PARTICIPANT_UPDATED"),
    },
    participantDeleted: {
      subscribe: () => pubsub.asyncIterator("PARTICIPANT_DELETED"),
    },
  };
