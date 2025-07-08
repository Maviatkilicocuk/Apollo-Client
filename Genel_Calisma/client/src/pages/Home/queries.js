import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetAllUser {
    users {
      _id
      username
      email
      profile_photo
    }
  }
`;

export const USERS_SUBSCRIPTION = gql`
  subscription UserCreated {
    userCreated {
      _id
      username
      email
      profile_photo
    }
  }
`;
