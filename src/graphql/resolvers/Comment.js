export const Comment = {
  user: (parent, __, { db }) => db.user.find((user) => (user.id = parent.user_id)),
  location: (parent, __, { db }) => db.location.find((location) => (location.id = parent.location_id)),
  event: (parent, __, { db }) => db.event.find((event) => (event.id = parent.event_id)),
  participant: (parent, __, { db }) => db.participant.find((participant) => (participant.id = parent.participant_id)),
};

