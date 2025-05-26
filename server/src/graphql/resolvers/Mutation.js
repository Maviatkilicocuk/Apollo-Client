import { v4 as uuidv4 } from "uuid";
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
} from "../constants.js";

export const Mutation = {
  // -------------------- User --------------------
  addUser: (_, { data }, { pubsub, db }) => {
    const newUser = { id: uuidv4(), ...data };
    db.userList.push(newUser);
    pubsub.publish(USER_CREATED, { userCreated: newUser });
    return newUser;
  },

  updateUser: (_, { id, data }, { pubsub, db }) => {
    const idx = db.userList.findIndex((u) => String(u.id) === String(id));
    if (idx === -1) throw new Error("User not found");
    db.userList[idx] = { ...db.userList[idx], ...data };
    pubsub.publish(USER_UPDATED, { userUpdated: db.userList[idx] });
    return db.userList[idx];
  },

  deleteUser: (_, { id }, { pubsub, db }) => {
    const idx = db.userList.findIndex((u) => String(u.id) === String(id));
    if (idx === -1) throw new Error("User not found");
    const deleted = db.userList[idx];
    db.userList.splice(idx, 1);
    pubsub.publish(USER_DELETED, { userDeleted: deleted });
    return deleted;
  },

  deleteAllUsers: (_, __, { pubsub, db }) => {
    const deleted = [...db.userList];
    db.userList = [];
    deleted.forEach((user) => {
      pubsub.publish(USER_DELETED, { userDeleted: user });
    });
    return deleted;
  },

  // -------------------- Event --------------------
  addEvent: (_, { data }, { pubsub, db }) => {
    const newEvent = { id: uuidv4(), ...data };
    db.eventList.push(newEvent);
    pubsub.publish(EVENT_CREATED, { eventCreated: newEvent });
    return newEvent;
  },

  updateEvent: (_, { id, data }, { pubsub, db }) => {
    const idx = db.eventList.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error("Event not found");
    db.eventList[idx] = { ...db.eventList[idx], ...data };
    pubsub.publish(EVENT_UPDATED, { eventUpdated: db.eventList[idx] });
    return db.eventList[idx];
  },

  deleteEvent: (_, { id }, { pubsub, db }) => {
    const idx = db.eventList.findIndex((e) => String(e.id) === String(id));
    if (idx === -1) throw new Error("Event not found");
    const deleted = db.eventList[idx];
    db.eventList.splice(idx, 1);
    pubsub.publish(EVENT_DELETED, { eventDeleted: deleted });
    return deleted;
  },

  deleteAllEvents: (_, __, { pubsub, db }) => {
    const deleted = [...db.eventList];
    db.eventList = [];
    deleted.forEach((event) => {
      pubsub.publish(EVENT_DELETED, { eventDeleted: event });
    });
    return deleted;
  },

  // -------------------- Location --------------------
  addLocation: (_, { data }, { db }) => {
    const newLoc = { id: uuidv4(), ...data };
    db.locationList.push(newLoc);
    return newLoc;
  },

  updateLocation: (_, { id, data }, { db }) => {
    const idx = db.locationList.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error("Location not found");
    db.locationList[idx] = { ...db.locationList[idx], ...data };
    return db.locationList[idx];
  },

  deleteLocation: (_, { id }, { db }) => {
    const idx = db.locationList.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error("Location not found");
    const deleted = db.locationList[idx];
    db.locationList.splice(idx, 1);
    return deleted;
  },

  deleteAllLocations: (_, __, { db }) => {
    const deleted = [...db.locationList];
    db.locationList = [];
    return deleted;
  },

  // -------------------- Participant --------------------
  addParticipant: (_, { data }, { pubsub, db }) => {
    const newPart = { id: uuidv4(), ...data };
    db.participantList.push(newPart);
    pubsub.publish(PARTICIPANT_CREATED, { participantCreated: newPart });
    return newPart;
  },

  updateParticipant: (_, { id, data }, { pubsub, db }) => {
    const idx = db.participantList.findIndex((p) => String(p.id) === String(id));
    if (idx === -1) throw new Error("Participant not found");
    db.participantList[idx] = { ...db.participantList[idx], ...data };
    pubsub.publish(PARTICIPANT_UPDATED, {
      participantUpdated: db.participantList[idx],
    });
    return db.participantList[idx];
  },

  deleteParticipant: (_, { id }, { pubsub, db }) => {
    const idx = db.participantList.findIndex((p) => p.id === String(id));
    if (idx === -1) throw new Error("Participant not found");
    const deleted = db.participantList[idx];
    db.participantList.splice(idx, 1);
    pubsub.publish(PARTICIPANT_DELETED, { participantDeleted: deleted });
    return deleted;
  },

  deleteAllParticipants: (_, __, { pubsub, db }) => {
    const deleted = [...db.participantList];
    db.participantList = [];
    deleted.forEach((participant) => {
      pubsub.publish(PARTICIPANT_DELETED, { participantDeleted: participant });
    });
    return deleted;
  },
};
