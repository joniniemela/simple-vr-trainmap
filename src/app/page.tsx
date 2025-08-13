"use client"

import React, {Suspense, useEffect} from "react";
import { useSuspenseQuery } from "@apollo/client";
import { GET_CURRENTLY_RUNNING_TRAINS } from '@/graphql/queries';

export default function Home() {


  const { data, refetch } = useSuspenseQuery(GET_CURRENTLY_RUNNING_TRAINS);

  const filteredTrains = data.currentlyRunningTrains.filter(train => train.trainType.name !== 'PAI')

  useEffect(() => {
      const interval = setInterval(() => {
          refetch().catch((error) => {console.error(error)});
      }, 20000);

      return () => clearInterval(interval);
  }, [refetch]);

  return (
    <>
      <h1 className={"font-bold text-4xl text-center py-2"}>VR Trains</h1>
      <div className={"flex flex-wrap gap-4"}>
        <Suspense fallback={<div>Loading...</div>}>
            {filteredTrains.map((train) => (
              <div className={"p-8 border-2 rounded-2xl m-8 flex-1 min-w-80"} key={train.trainNumber + train.departureDate}>
                <div className={"text-2xl"}>{train.trainType.name + train.trainNumber}</div>
                <div>Departure date: {train.departureDate}</div>
                <div>
                  <div>{train.trainLocations.map((trainLocation, i) => (
                    <div key={i}>
                      <div>Speed: {trainLocation.speed} km/h</div>
                      <div>Coordinates:</div>
                      <div key={i}>
                        <div>Lat: {trainLocation.location[0]}</div>
                        <div>Lon: {trainLocation.location[1]}</div>
                      </div>
                    </div>
                  ))}</div>
                </div>
              </div>
            ))}
        </Suspense>

      </div>
  </>
  );
}
