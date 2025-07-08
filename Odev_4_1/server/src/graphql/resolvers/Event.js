import { users, locations, participants } from "../../data";

export const Event = {
    user: (parent) => users.find((user) => user.id == parent.user_id),
    location: (parent) => locations.find((loc) => loc.id == parent.location_id),
    participants: (parent) =>
      participants.filter((p) => p.event_id == parent.id),
  }
