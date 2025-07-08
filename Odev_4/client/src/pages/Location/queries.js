import { gql } from "@apollo/client";

export const GET_LOCATION = gql`
query GetLocation ($id: ID!) {
  location (id: $id) {
    id
    name
    desc
    lat
    lng
    location_picture
  }
}
`

export const GET_EVENT = gql`
query GetEvents ($id: ID!) {
  event (id: $id) {
    id
    title
    desc
    date
    
  }
}
`