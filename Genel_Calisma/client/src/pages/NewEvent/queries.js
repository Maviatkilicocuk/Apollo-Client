import { gql } from "@apollo/client";

export const GET_USERS = gql`
query Users {
  users{
    _id
    username
  }
}
`;

export const GET_LOCATIONS = gql`
query Locations {
  locations {
    name
    _id
  }
}
`;


export const NEW_EVENT_MUTATION = gql`
mutation createNewEvent($data: CreateEventInput!) {
  createEvent(data: $data) {
    _id
    title
  }
}
`