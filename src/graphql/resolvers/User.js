export const User = {
  events: (parent, __, { db }) => db.eventList.filter((e) => e.user_id === parent.id),
};
