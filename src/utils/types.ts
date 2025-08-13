interface trainLocation {
  speed: number;
  timestamp: string;
  location: number[];
}

export interface TrainQueryItem {
  trainNumber: number;
  departureDate: string;
  trainLocations: trainLocation[];
}