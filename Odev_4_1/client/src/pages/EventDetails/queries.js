import { gql } from "@apollo/client";

const GET_EVENT_DETAIL = gql`
  query GetEventDetail($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      from
      to
      user {
        id
        username
        email
        profile_photo
      }
      location {
        id
        name
        desc
      }
      participants {
        id
        user {
          id
          username
        }
      }
    }
  }
`;