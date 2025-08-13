interface trainLocation {
  speed: number;
  timestamp: string;
  location: number[];
}

export interface TrainQueryData {
  currentlyRunningTrains: TrainQueryItem[];
}

export interface TrainQueryItem {
  trainNumber: number;
  departureDate: string;
  trainLocations: trainLocation[];
}