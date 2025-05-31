const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { nanoid } = require("nanoid");

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
`;

const resolvers = {
  Mutation: {
    createUser: (_, { data }) => {
      const newUser = {
        id: nanoid(),
        username: data.username,
        email: data.email,
      };
      users.push(newUser);
      return newUser;
    },

    updateUser: (_, { id, data }) => {
      const user = users.find((u) => u.id == id);
      if (!user) throw new Error("User not found");
      Object.assign(user, data);
      return user;
    },

    deleteUser: (_, { id }) => {
      const index = users.findIndex((u) => u.id == id);
      if (index === -1) throw new Error("User not found");

      const deletedUser = users[index];
      users.splice(index, 1);
      return deletedUser;
    },

deleteAllUser: () => {
  const count = users.length;
  users.length = 0; // DİKKAT: user değil, users olacak
  return { count };
},

    createLocation: (_, { data }) => {
      const newLocation = { id: nanoid(), ...data };
      locations.push(newLocation);
      return newLocation;
    },

    updateLocation: (_, { id, data }) => {
      const location = locations.find((l) => l.id == id);
      if (!location) throw new Error("Location not found");
      Object.assign(location, data);
      return location;
    },

    deleteLocation: (_, { id }) => {
      const index = locations.findIndex((l) => l.id == id);
      if (index === -1) throw new Error("Location not found");
      const deletedLocation = locations[index];
      locations.splice(index, 1);
      return deletedLocation;
    },

      deleteAllLocation: () => {
    const count = locations.length;
    locations.length = 0;
    return { count };
  },

    createEvent: (_, { data }) => {
      const newEvent = { id: nanoid(), ...data };
      events.push(newEvent);
      return newEvent;
    },

    updateEvent: (_, { id, data }) => {
      const event = events.find((e) => e.id == id);
      if (!event) throw new Error("Event not found");
      Object.assign(event, data);
      return event;
    },

    deleteEvent: (_, { id }) => {
      const index = events.findIndex((e) => e.id == id);
      if (index === -1) throw new Error("Event not found");
      const deletedEvent = events[index];
      events.splice(index, 1);
      return deletedEvent;
    },

      deleteAllEvent: () => {
    const count = events.length;
    events.length = 0;
    return { count };
  },

    createParticipant: (_, { data }) => {
      const newParticipant = { id: nanoid(), ...data };
      participants.push(newParticipant);
      return newParticipant;
    },

    updateParticipant: (_, { id, data }) => {
      const participant = participants.find((p) => p.id == id);
      if (!participant) throw new Error("Participant not found");
      Object.assign(participant, data);
      return participant;
    },

    deleteParticipant: (_, { id }) => {
      const index = participants.findIndex((p) => p.id == id);
      if (index === -1) throw new Error("Participant not found");
      const deletedParticipant = participants[index];
      participants.splice(index, 1);
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

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
