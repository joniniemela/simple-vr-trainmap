"use client"

import React, {useEffect, useRef, useMemo, Suspense} from "react";
import {useQuery} from "@apollo/client/react";
import { GET_CURRENTLY_RUNNING_TRAINS } from '@/graphql/queries';
import MapProvider from "@/lib/mapbox/provider";
import MapStyles from "@/components/map/map-styles";
import MapControls from "@/components/map/map-controls";
import Marker from "@/components/map/map-marker";

function TrainMapContent() {
  const { data, refetch, loading } = useQuery(GET_CURRENTLY_RUNNING_TRAINS, {
    fetchPolicy: 'cache-and-network',
  });
  const filteredTrains = data?.currentlyRunningTrains.filter(t => t.trainType.name !== "PAI") || []
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const initialViewState = useMemo(
    () => ({
      longitude: 25.187237,
      latitude: 62.5588,
      zoom: 5,
    }),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      refetch().catch((error) => console.error(error));
    }, 12000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (loading && !data) {
    return <div className="flex items-center justify-center h-full">Loading map...</div>;
  }

  return (
      <>
        <div
          id="map-container"
          ref={mapContainerRef}
          className="absolute inset-0 h-full w-full"
        />
        <MapProvider
          mapContainerRef={mapContainerRef}
          initialViewState={initialViewState}
        >
          <MapControls />
          <MapStyles />
          {filteredTrains.map((train) => {
            const lat = train.trainLocations[0]?.location[1];
            const lng = train.trainLocations[0]?.location[0];
            const speed = train.trainLocations[0]?.speed;
            const trainNumber = train.trainType.name + train.trainNumber;
            if (lat == null || lng == null || Number.isNaN(lat) || Number.isNaN(lng)) return null;

            return (
              <Marker
                key={trainNumber}
                latitude={lat}
                longitude={lng}
                speed={speed}
                trainNumber={trainNumber}
              />
            );
          })}
        </MapProvider>
      </>
  );
}

export default function Home() {
  return (
      <div className="flex flex-col h-screen">
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading map...</div>}>
          <TrainMapContent />
        </Suspense>
      </div>
  );
}
