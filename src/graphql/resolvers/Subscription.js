import { createYoga } from 'graphql-yoga'

// Event, User ve Participant için Publish key'leri
import {
  USER_CREATED,
  USER_UPDATED,
  USER_DELETED,
  EVENT_CREATED,
  EVENT_UPDATED,
  EVENT_DELETED,
  PARTICIPANT_CREATED,
  PARTICIPANT_UPDATED,
  PARTICIPANT_DELETED,
} from "../constants";

export const Subscription = {
  //User
  userCreated: {
    subscribe: () => pubsub.asyncIterator([USER_CREATED]),
  },
  userUpdated: {
    subscribe: () => pubsub.asyncIterator([USER_UPDATED]),
  },
  userDeleted: {
    subscribe: () => pubsub.asyncIterator([USER_DELETED]),
  },

  //Event
  eventCreated: {
    subscribe: () => pubsub.asyncIterator([EVENT_CREATED]),
  },
  eventUpdated: {
    subscribe: () => pubsub.asyncIterator([EVENT_UPDATED]),
  },
  eventDeleted: {
    subscribe: () => pubsub.asyncIterator([EVENT_DELETED]),
  },

  //Participant
  participantCreated: {
    subscribe: () => pubsub.asyncIterator([PARTICIPANT_CREATED]),
  },
  participantUpdated: {
    subscribe: () => pubsub.asyncIterator([PARTICIPANT_UPDATED]),
  },
  participantDeleted: {
    subscribe: () => pubsub.asyncIterator([PARTICIPANT_DELETED]),
  },
};
