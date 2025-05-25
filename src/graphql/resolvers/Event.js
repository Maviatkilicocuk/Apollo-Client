export const Event = {
  user: (parent, __, { db }) => db.userList.find((u) => u.id === parent.user_id),
  location: (parent, __, { db }) => db.locationList.find((l) => l.id === parent.location_id),
  participants: (parent, __, { db }) =>
    db.participantList.filter((p) => p.event_id === parent.id),
};

