export const Participant = {
  user: (parent, __, { db }) => db.userList.find((u) => u.id === parent.user_id),
  event: (parent, __, { db }) => db.eventList.find((e) => e.id === parent.event_id),
};

