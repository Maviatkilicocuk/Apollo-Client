import User from "../../models/User.js";
import Event from "../../models/Event.js";

export const Participant = {
  user: async (parent) => await User.findById(parent.user),
  event: async (parent) => await Event.findById(parent.event),
};
