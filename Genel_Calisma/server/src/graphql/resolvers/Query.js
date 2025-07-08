import Event from '../../models/Event.js';
import Location from '../../models/Location.js';
import User from '../../models/User.js';
import Participant from '../../models/Participant.js';

export const Query = {
  events: async () => {
    return await Event.find();
  },
  event: async (_, { _id }) => {
    const event = await Event.findById(_id);
    if (!event) throw new Error("Event not found");
    return event;
  },

  locations: async () => {
    return await Location.find();
  },
  location: async (_, { _id }) => {
    const location = await Location.findById(_id);
    if (!location) throw new Error("Location not found");
    return location;
  },

  locationByUserId: async (_, { _id }) => {
    // Kullanıcıya ait eventleri buluyoruz:
    const userEvents = await Event.find({ user: _id });
    // Eventlerden location ObjectId'lerini alıp uniq hale getiriyoruz:
    const locationIds = [...new Set(userEvents.map(e => e.location.toString()))];
    // Location koleksiyonundan ilgili lokasyonları çekiyoruz:
    const userLocations = await Location.find({ _id: { $in: locationIds } });

    if (userLocations.length === 0) throw new Error("Locations not found for this user");
    return userLocations;
  },

  users: async () => {
    return await User.find();
  },
  user: async (_, { _id }) => {
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");
    return user;
  },

  participants: async () => {
    return await Participant.find();
  },
  participant: async (_, { _id }) => {
    const participant = await Participant.findById(_id);
    if (!participant) throw new Error("Participant not found");
    return participant;
  },
};
