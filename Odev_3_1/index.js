const { createServer } = require("node:http");
const { nanoid } = require("nanoid");
const {
  createSchema,
  createYoga
} = require("graphql-yoga");
const { withFilter } = require("graphql-subscriptions");
const pubsub = require('./pubsub')


const { events, locations, users, participants } = require("./data");

const typeDefs = `

  # Event
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!

    # Relations
    user: User!
    location: Location!
    participants: [Participant!]!
  }

  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  input UpdateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }
  
  # Location
  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!

    # Relations
    events: [Event!]!
  }

  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input UpdateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  # User
  type User {
    id: ID!
    username: String!
    email: String!

    # Relations
    events: [Event!]!
    participants: [Participant!]!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }

  input UpdateUserInput {
    username: String
    email: String
  }

  # Participant
  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!

    # Relations
    user: User!
    event: Event!
  }

  input CreateParticipantInput {
    user_id: ID!
    event_id: ID!
  }

  input UpdateParticipantInput {
    user_id: ID
    event_id: ID
  }

  type DeleteAllOutput {
    count: Int!
  }

  type Query {
    # Events
    events: [Event!]!
    event(id: ID!): Event

    # Locations
    locations: [Location!]!
    location(id: ID!): Location

    # Users
    users: [User!]!
    user(id: ID!): User

    # Participants
    participants: [Participant!]!
    participant(id: ID!): Participant
  }

  type Mutation {
    #User
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUser: DeleteAllOutput!

    #Location
    createLocation(data: CreateLocationInput!): Location!
    updateLocation(id: ID!, data: UpdateLocationInput!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocation: DeleteAllOutput!

    #Event
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: ID!, data: UpdateEventInput!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvent: DeleteAllOutput!

    #Participant
    createParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipant: DeleteAllOutput!
  }

  type Subscription {
    userCreated(id: ID): User!
    userUpdated: User!
    userDeleted: User!
    userCount: Int!

    eventCreated(user_id: ID): Event!
    eventUpdated: Event!
    eventDeleted: Event!

    locationCreated: Location!
    locationUpdated: Location!
    locationDeleted: Location!

    participantCreated(user_id: ID): Participant!
    participantUpdated: Participant!
    participantDeleted: Participant!
  }
`;

const resolvers = {
  Subscription: {
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
  },

  Mutation: {
    createUser: (_, { data }, { pubsub }) => {
      const newUser = {
        id: nanoid(),
        username: data.username,
        email: data.email,
      };
      users.push(newUser);
      pubsub.publish("USER_CREATED", { userCreated: newUser });
      pubsub.publish("USER_COUNT", { userCount: users.length });
      return newUser;
    },

    updateUser: (_, { id, data }, { pubsub }) => {
      const user = users.find((u) => u.id == id);
      if (!user) throw new Error("User not found");
      Object.assign(user, data);
      pubsub.publish("USER_UPDATED", { userUpdated: user });
      return user;
    },

    deleteUser: (_, { id }, { pubsub }) => {
      const index = users.findIndex((u) => u.id == id);
      if (index === -1) throw new Error("User not found");

      const deletedUser = users[index];
      users.splice(index, 1);
      pubsub.publish("USER_DELETED", { userDeleted: deletedUser });
      pubsub.publish("USER_COUNT", { userCount: users.length });
      return deletedUser;
    },

    deleteAllUser: (_, __, { pubsub }) => {
      const count = users.length;
      users.length = 0;
      pubsub.publish("USER_COUNT", { userCount: users.length });
      return { count };
    },

    createLocation: (_, { data }, { pubsub }) => {
      const newLocation = { id: nanoid(), ...data };
      locations.push(newLocation);
      pubsub.publish("LOCATION_CREATED", { locationCreated: newLocation });
      return newLocation;
    },

    updateLocation: (_, { id, data }, { pubsub }) => {
      const location = locations.find((l) => l.id == id);
      if (!location) throw new Error("Location not found");
      Object.assign(location, data);
      pubsub.publish("LOCATION_UPDATED", { locationUpdated: location });
      return location;
    },

    deleteLocation: (_, { id }, { pubsub }) => {
      const index = locations.findIndex((l) => l.id == id);
      if (index === -1) throw new Error("Location not found");
      const deletedLocation = locations[index];
      locations.splice(index, 1);
      pubsub.publish("LOCATION_DELETED", { locationDeleted: deletedLocation });
      return deletedLocation;
    },

    deleteAllLocation: () => {
      const count = locations.length;
      locations.length = 0;
      return { count };
    },

    createEvent: (_, { data }, { pubsub }) => {
      const newEvent = { id: nanoid(), ...data };
      events.push(newEvent);
      pubsub.publish("EVENT_CREATED", { eventCreated: newEvent });
      return newEvent;
    },

    updateEvent: (_, { id, data }, { pubsub }) => {
      const event = events.find((e) => e.id == id);
      if (!event) throw new Error("Event not found");
      Object.assign(event, data);
      pubsub.publish("EVENT_UPDATED", { eventUpdated: event });
      return event;
    },

    deleteEvent: (_, { id }, { pubsub }) => {
      const index = events.findIndex((e) => e.id == id);
      if (index === -1) throw new Error("Event not found");
      const deletedEvent = events[index];
      events.splice(index, 1);
      pubsub.publish("EVENT_DELETED", { eventDeleted: deletedEvent });
      return deletedEvent;
    },

    deleteAllEvent: () => {
      const count = events.length;
      events.length = 0;
      return { count };
    },

    createParticipant: (_, { data }, { pubsub }) => {
      const newParticipant = { id: nanoid(), ...data };
      participants.push(newParticipant);
      pubsub.publish("PARTICIPANT_CREATED", {
        participantCreated: newParticipant,
      });
      return newParticipant;
    },

    updateParticipant: (_, { id, data }, { pubsub }) => {
      const participant = participants.find((p) => p.id == id);
      if (!participant) throw new Error("Participant not found");
      Object.assign(participant, data);
      pubsub.publish("PARTICIPANT_UPDATED", {
        participantUpdated: participant,
      });
      return participant;
    },

    deleteParticipant: (_, { id }, { pubsub }) => {
      const index = participants.findIndex((p) => p.id == id);
      if (index === -1) throw new Error("Participant not found");
      const deletedParticipant = participants[index];
      participants.splice(index, 1);
      pubsub.publish("PARTICIPANT_DELETED", {
        participantDeleted: deletedParticipant,
      });
      return deletedParticipant;
    },

    deleteAllParticipant: () => {
      const count = participants.length;
      participants.length = 0;
      return { count };
    },
  },

  Query: {
    events: () => events,
    event: (_, { id }) => {
      const event = events.find((event) => event.id == id);
      if (!event) throw new Error("Event not found");
      return event;
    },

    locations: () => locations,
    location: (_, { id }) => {
      const location = locations.find((loc) => loc.id == id);
      if (!location) throw new Error("Location not found");
      return location;
    },

    users: () => users,
    user: (_, { id }) => {
      const user = users.find((user) => user.id == id);
      if (!user) throw new Error("User not found");
      return user;
    },

    participants: () => participants,
    participant: (_, { id }) => {
      const participant = participants.find((p) => p.id == id);
      if (!participant) throw new Error("Participant not found");
      return participant;
    },
  },

  Event: {
    user: (parent) => users.find((user) => user.id == parent.user_id),
    location: (parent) => locations.find((loc) => loc.id == parent.location_id),
    participants: (parent) =>
      participants.filter((p) => p.event_id == parent.id),
  },

  Location: {
    events: (parent) =>
      events.filter((event) => event.location_id == parent.id),
  },

  User: {
    events: (parent) => events.filter((event) => event.user_id == parent.id),
    participants: (parent) =>
      participants.filter((p) => p.user_id == parent.id),
  },

  Participant: {
    user: (parent) => users.find((user) => user.id == parent.user_id),
    event: (parent) => events.find((event) => event.id == parent.event_id),
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  context: ({ request, response }) => ({
    pubsub,
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
