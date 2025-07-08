import Event from "../../models/Event.js";

export const Location = {
  events: async (parent) => await Event.find({ location: parent._id }),
};
