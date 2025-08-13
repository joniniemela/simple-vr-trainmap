import { gql } from '@apollo/client';

export const GET_CURRENTLY_RUNNING_TRAINS = gql`
  query GetCurrentlyRunningTrains {
  currentlyRunningTrains(where: {operator: {shortCode: {equals: "vr"}}}) {
    trainNumber
    departureDate
    trainLocations(orderBy: {timestamp: DESCENDING}, take: 1) {
      speed
      timestamp
      location
    }
  }
}
`;