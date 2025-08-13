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

      <div className={"flex flex-row items-center justify-between p-8"}>
        <h1 className={"font-bold text-4xl text-center text-text"}>VR Trains</h1>
      </div>


      <div className={"flex flex-wrap gap-4 text-custom-text text-text"}>
        <Suspense fallback={<div>Loading...</div>}>
          {filteredTrains.map((train) => (
            <div className={"p-8 border-1 border-gray-200 dark:border-gray-700 dark:bg-background2 shadow-sm rounded-2xl m-8 flex-1 min-w-80"}
                 key={train.trainNumber + train.departureDate}>
              <div className={"text-2xl font-bold pb-4"}>{train.trainType.name + train.trainNumber}</div>
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
