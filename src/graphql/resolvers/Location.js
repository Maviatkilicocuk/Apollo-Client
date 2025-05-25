export const Location = {
  events: (parent, __, { db }) => db.eventList.filter((e) => e.location_id === parent.id),
};
