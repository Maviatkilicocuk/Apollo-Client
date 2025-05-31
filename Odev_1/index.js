const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

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

  # User
  type User {
    id: ID!
    username: String!
    email: String!

      # Relations
  events: [Event!]!
  participants: [Participant!]!
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

`;

const resolvers = {
  Query: {
    // Event
    events: () => events,
    event: (_, { id }) => {
      const event = events.find((event) => event.id == id);
      if (!event) {
        throw new Error("Event not found");
      }
      return event;
    },

    //Location
    locations: () => locations,
    location: (_, { id }) => {
      const location = locations.find((loc) => loc.id == id);
      if (!location) {
        throw new Error("Location not found");
      }
      return location;
    },

    // User
    users: () => users,
    user: (_, { id }) => {
      const user = users.find((user) => user.id == id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },

    //Participant
    participants: () => participants,
    participant: (_, { id }) => {
      const participant = participants.find((p) => p.id == id);
      if (!participant) {
        throw new Error("Participant not found");
      }
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

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
