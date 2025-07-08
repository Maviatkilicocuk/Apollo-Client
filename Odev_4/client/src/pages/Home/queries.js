import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetAllUser {
    users {
      id
      username
      email
      profile_photo
    }
  }
`