import User from "../../models/User.js";
import Event from "../../models/Event.js";
import Participant from "../../models/Participant.js";
import Location from "../../models/Location.js";
import mongoose from "mongoose";

export const Mutation = {
  // User
  createUser: async (_, { data }, { pubsub }) => {
    const newUser = new User({
      username: data.username,
      email: data.email,
      profile_photo: data.profile_photo,
    });
    await newUser.save();

    pubsub.publish("USER_CREATED", { userCreated: newUser });
    const userCount = await User.countDocuments();
    pubsub.publish("USER_COUNT", { userCount });

    return newUser;
  },

  updateUser: async (_, { _id, data }, { pubsub }) => {
    const user = await User.findByIdAndUpdate(_id, data, { new: true });
    if (!user) throw new Error("User not found");

    pubsub.publish("USER_UPDATED", { userUpdated: user });
    return user;
  },

  deleteUser: async (_, { _id }, { pubsub }) => {
    const user = await User.findByIdAndDelete(_id);
    if (!user) throw new Error("User not found");

    pubsub.publish("USER_DELETED", { userDeleted: user });
    const userCount = await User.countDocuments();
    pubsub.publish("USER_COUNT", { userCount });

    return user;
  },

  deleteAllUser: async (_, __, { pubsub }) => {
    const count = await User.countDocuments();
    await User.deleteMany();
    pubsub.publish("USER_COUNT", { userCount: 0 });

    return { count };
  },

  // Location
  createLocation: async (_, { data }, { pubsub }) => {
    const newLocation = new Location({ ...data });
    await newLocation.save();

    pubsub.publish("LOCATION_CREATED", { locationCreated: newLocation });
    return newLocation;
  },

  updateLocation: async (_, { _id, data }, { pubsub }) => {
    const location = await Location.findByIdAndUpdate(_id, data, { new: true });
    if (!location) throw new Error("Location not found");

    pubsub.publish("LOCATION_UPDATED", { locationUpdated: location });
    return location;
  },

  deleteLocation: async (_, { _id }, { pubsub }) => {
    const location = await Location.findByIdAndDelete(_id);
    if (!location) throw new Error("Location not found");

    pubsub.publish("LOCATION_DELETED", { locationDeleted: location });
    return location;
  },

  deleteAllLocation: async (_, __, { pubsub }) => {
    const count = await Location.countDocuments();
    await Location.deleteMany();
    pubsub.publish("LOCATION_COUNT", { locationCount: 0 }); // Eğer sayacın varsa

    return { count };
  },

  // Event
createEvent: async (_, { data }, { pubsub }) => {
  try {
    const newEvent = new Event({
      ...data,
      user: new mongoose.Types.ObjectId(data.user),
      location: new mongoose.Types.ObjectId(data.location),
    });
    await newEvent.save();

    pubsub.publish("EVENT_CREATED", { eventCreated: newEvent });

    const eventCount = await Event.countDocuments();
    pubsub.publish("EVENT_COUNT", { eventCount });

    return newEvent;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
},


updateEvent: async (_, { _id, data }, { pubsub }) => {
  try {
    const updatedData = {
      ...data,
      ...(data.user && { user: new mongoose.Types.ObjectId(data.user) }),
      ...(data.location && { location: new mongoose.Types.ObjectId(data.location) }),
    };

    const updatedEvent = await Event.findByIdAndUpdate(
      _id,
      updatedData,
      { new: true }
    );

    if (!updatedEvent) throw new Error("Event not found");

    pubsub.publish("EVENT_UPDATED", { eventUpdated: updatedEvent });

    return updatedEvent;
  } catch (error) {
    console.error("❌ updateEvent error:", error);
    throw new Error("Internal Server Error");
  }
},

  deleteEvent: async (_, { _id }, { pubsub }) => {
    const event = await Event.findByIdAndDelete(_id);
    if (!event) throw new Error("Event not found");

    pubsub.publish("EVENT_DELETED", { eventDeleted: event });
    const eventCount = await Event.countDocuments();
    pubsub.publish("EVENT_COUNT", { eventCount });

    return event;
  },

  deleteAllEvent: async (_, __, { pubsub }) => {
    const count = await Event.countDocuments();
    await Event.deleteMany();
    pubsub.publish("EVENT_COUNT", { eventCount: 0 });

    return { count };
  },

  // Participant
createParticipant: async (_, { data }, { pubsub }) => {
  try {
    const newParticipant = new Participant({ ...data });
    await newParticipant.save();

    const populatedParticipant = await newParticipant.populate(['user', 'event']);

    pubsub.publish("PARTICIPANT_CREATED", { participantCreated: populatedParticipant });

    return populatedParticipant;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
},

  updateParticipant: async (_, { _id, data }, { pubsub }) => {
    const participant = await Participant.findByIdAndUpdate(_id, data, { new: true });
    if (!participant) throw new Error("Participant not found");

    pubsub.publish("PARTICIPANT_UPDATED", { participantUpdated: participant });
    return participant;
  },

  deleteParticipant: async (_, { _id }, { pubsub }) => {
    const participant = await Participant.findByIdAndDelete(_id);
    if (!participant) throw new Error("Participant not found");

    pubsub.publish("PARTICIPANT_DELETED", { participantDeleted: participant });
    return participant;
  },

  deleteAllParticipant: async (_, __, { pubsub }) => {
    const count = await Participant.countDocuments();
    await Participant.deleteMany();
    pubsub.publish("PARTICIPANT_COUNT", { participantCount: 0 }); // Eğer sayacın varsa

    return { count };
  },
};
