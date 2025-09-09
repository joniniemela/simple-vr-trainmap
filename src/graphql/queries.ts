import {gql, TypedDocumentNode} from '@apollo/client';
import {TrainQueryData, TrainTimetablesQueryData} from "@/utils/types";

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

export const GET_RUNNING_TRAINS_WITH_TIMETABLES: TypedDocumentNode<TrainTimetablesQueryData> = gql`
query {
    currentlyRunningTrains( ,
        where: {timeTableRows:{contains:{station:{name:{equals:"Lappeenranta"}}}}}
    ) {
        trainType {
            name
            trainCategory {
                name
            }
        }
        trainNumber
        departureDate
        timeTableRows(where:  {
            station:  {
                name:  {
                    equals: "Lappeenranta"
                }
            }
        }) {
            station {
                name
                uicCode
            }
            liveEstimateTime
            differenceInMinutes
        }
    }
}`;