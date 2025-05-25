export const Query = {
  //User
  users: (_, _, { db }) => db.userList,
  user: (_, _, args, { id }) => db.userList.find((u) => u.id === id),
  //Event
  events: (_, _, { db }) => db.eventList,
  event: (_, _, args, { id }) => db.eventList.find((e) => e.id === id),
  //Location
  locations: (_, _, { db }) => db.locationList,
  location: (_, _, args, { id }) => db.locationList.find((l) => l.id === id),
  //Participant
  participants: (_, _, { db }) => db.participantList,
  participant: (_, _, args, { id }) => db.participantList.find((p) => p.id === id),
};