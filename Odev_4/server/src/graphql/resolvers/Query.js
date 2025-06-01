/* const { events, locations, users, participants } = require('../../data'); */

import {events, locations, users, participants } from '../../data';

export const Query = {
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
  };
