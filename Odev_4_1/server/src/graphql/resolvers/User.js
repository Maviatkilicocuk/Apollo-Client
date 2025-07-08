import { events, participants } from "../../data";

export const User = {
    events: (parent) => events.filter((event) => event.user_id == parent.id),
    participants: (parent) =>
      participants.filter((p) => p.user_id == parent.id),
  };
