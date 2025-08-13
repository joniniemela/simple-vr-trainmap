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

export interface TrainQueryItem {
  trainNumber: number;
  trainType: trainType;
  departureDate: string;
  trainLocations: trainLocation[];
}