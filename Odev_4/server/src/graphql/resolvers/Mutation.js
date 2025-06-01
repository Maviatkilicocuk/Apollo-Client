/* const { nanoid } = require("nanoid");
const { events, locations, users, participants } = require('../../data'); */

import { nanoid } from "nanoid";
import {events, locations, users, participants } from '../../data';

export const Mutation = {
    // USer
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

    // Location
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

    // Event
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

    // Participant
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
  };
