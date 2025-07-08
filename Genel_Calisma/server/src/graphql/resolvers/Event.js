import User from "../../models/User.js";
import Location from "../../models/Location.js";
import Participant from "../../models/Participant.js";

export const Event = {
  user: async (parent) => await User.findById(parent.user),
  location: async (parent) => await Location.findById(parent.location),
  participants: async (parent) => await Participant.find({ event: parent._id }),
};
