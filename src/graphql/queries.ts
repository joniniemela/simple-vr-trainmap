import {gql, TypedDocumentNode} from '@apollo/client';
import {TrainQueryData} from "@/utils/types";

export const GET_CURRENTLY_RUNNING_TRAINS: TypedDocumentNode<TrainQueryData> = gql`
  query GetCurrentlyRunningTrains {
  currentlyRunningTrains(where: {operator: {shortCode: {equals: "vr"}}}) {
    trainNumber
    trainType {
        name
    }
    departureDate
    trainLocations(where: {speed: {greaterThan: 10}}, orderBy: {timestamp: DESCENDING}, take: 1) {
      speed
      timestamp
      location
    }
  }
}
`;