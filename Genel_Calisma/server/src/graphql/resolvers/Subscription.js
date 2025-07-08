import { withFilter } from 'graphql-subscriptions';
import pubsub from '../../pubsub';
import User from "../../models/User.js";
import Event from "../../models/Event.js";
import Participant from "../../models/Participant.js";
import Location from "../../models/Location.js";

// Periyodik yayın için arka planda çalışan sayaçlar
setInterval(async () => {
  const count = await User.countDocuments();
  pubsub.publish("USER_COUNT", { userCount: count });
}, 1000);

setInterval(async () => {
  const count = await Event.countDocuments();
  pubsub.publish("EVENT_COUNT", { eventCount: count });
}, 1000);

export const Subscription = {
  // User
  userCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("USER_CREATED"),
      (payload, variables) => {
        return variables._id ? payload.userCreated._id === variables._id : true;
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
    subscribe: () => pubsub.asyncIterator("USER_COUNT"),
  },

  // Event
  eventCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("EVENT_CREATED"),
      (payload, variables) => {
        return variables.user ? payload.eventCreated.user === variables.user : true;
      }
    ),
  },
  eventUpdated: {
    subscribe: () => pubsub.asyncIterator("EVENT_UPDATED"),
  },
  eventDeleted: {
    subscribe: () => pubsub.asyncIterator("EVENT_DELETED"),
  },
  eventCount: {
    subscribe: () => pubsub.asyncIterator("EVENT_COUNT"),
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
        return variables.user ? payload.participantCreated.user === variables.user : true;
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
