import { gql } from "@apollo/client";

// Event fragment
const eventsFragment = gql`
  fragment EventsFragment on Event {
    _id
    title
    desc
    date
  }
`;

// Get user's locations (through events)
export const GET_LOCATION = gql`
  query GetLocation($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      events {
        location {
          _id
          name
          desc
          lat
          lng
          location_picture
        }
      }
    }
  }
`;

// Get user's events
export const GET_EVENT = gql`
  query GetEvents($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      events {
        ...EventsFragment
      }
    }
  }
  ${eventsFragment}
`;

// Subscription for event creation
export const EVENT_SUBSCRIPTIONS = gql`
  subscription EventCreated($_id: ID) {
    eventCreated(user: $_id) {
      ...EventsFragment
    }
  }
  ${eventsFragment}
`;
