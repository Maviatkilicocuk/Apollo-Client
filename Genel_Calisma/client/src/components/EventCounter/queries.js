import { gql } from "@apollo/client";

export const EVENTS_COUNT_SUBSCRIPTION = gql`
subscription EventCount{
  eventCount
}
`;
