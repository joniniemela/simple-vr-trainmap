"use client"

import React, {useEffect, useRef, useMemo} from "react";
import { Button } from "@/components/ui/button"
import {useSuspenseQuery} from "@apollo/client";
import { GET_CURRENTLY_RUNNING_TRAINS } from '@/graphql/queries';
import {ModeToggle} from "@/components/ModeToggle";
import MapProvider from "@/lib/mapbox/provider";
import MapStyles from "@/components/map/map-styles";
import MapControls from "@/components/map/map-controls";
import Marker from "@/components/map/map-marker";

export default function Home() {
  const { data, refetch } = useSuspenseQuery(GET_CURRENTLY_RUNNING_TRAINS);
  const filteredTrains = data?.currentlyRunningTrains.filter(t => t.trainType.name !== "PAI")
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
      refetch();
    }, 12000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className={"flex flex-col h-screen"}>
      <div className={"flex flex-row items-center justify-between m-8"}>
        <h1 className={"font-bold text-4xl text-center"}>VR Trains</h1>
        <div className={"flex flex-row items-center justify-between gap-4"}>
          <Button disabled>Admin Panel</Button>
          <ModeToggle />
        </div>
      </div>
      <div className="flex flex-col h-screen">
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

      </div>

    </div>
  );
}
