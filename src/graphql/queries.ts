import {gql, TypedDocumentNode} from '@apollo/client';
import {TrainQueryData} from "@/utils/types";

export const GET_CURRENTLY_RUNNING_TRAINS: TypedDocumentNode<TrainQueryData> = gql`
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