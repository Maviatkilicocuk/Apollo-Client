import { gql } from "@apollo/client";

export const USERS_COUNT_SUBSCRIPTION = gql`
subscription UserCount{
  userCount
}
`;
