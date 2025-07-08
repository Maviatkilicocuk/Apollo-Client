import Event from "../../models/Event.js";
import Participant from "../../models/Participant.js";
import Location from "../../models/Location.js";

export const User = {
    events: async (parent) => await Event.find({user: parent.id}),
    participants: async (parent) => await Participant.find({user: parent.id}),
    locations: async (parent) => await Location.find({ user: parent.id }),
  };
