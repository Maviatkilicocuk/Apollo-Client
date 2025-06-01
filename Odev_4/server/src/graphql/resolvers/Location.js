export const Location = {
    events: (parent) =>
      events.filter((event) => event.location_id == parent.id),
  };
