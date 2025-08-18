interface trainLocation {
  speed: number;
  timestamp: string;
  location: number[];
}

interface trainType {
    name: string;
}

export interface TrainQueryData {
  currentlyRunningTrains: TrainQueryItem[];
}

export interface TrainTimetablesQueryData {
  currentlyRunningTrains: TrainTimetablesQueryItem[];
}

export interface TrainQueryItem {
  trainNumber: number;
  trainType: trainType;
  departureDate: string;
  trainLocations: trainLocation[];
}

export interface TrainTimetablesQueryItem {
  trainType: {
    name: string;
    trainCategory: {
      name: string;
    };
  };
  trainNumber: number
  timeTableRows: {
    scheduledTime: string;
    actualTime: string;
    differenceInMinutes: number;
    station: {
      name: string;
      shortCode: string;
    };
  }[];
}