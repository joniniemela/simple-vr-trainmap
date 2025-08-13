"use client"

import React, {Suspense} from "react";
import { useSuspenseQuery } from "@apollo/client";
import { GET_CURRENTLY_RUNNING_TRAINS } from '@/graphql/queries';

export default function Home() {

  // Fetch all Trains
  const { data } = useSuspenseQuery(GET_CURRENTLY_RUNNING_TRAINS);

  return (
    <>
      <h1 className={"font-bold text-4xl text-center py-2"}>VR Trains</h1>
      <div className={"flex justify-center items-center"}>
        <Suspense fallback={<div>Loading...</div>}>
          <ul>
            {data.currentlyRunningTrains.map((train) => (
              <div className={"py-4 container"} key={train.trainNumber + train.departureDate}>
                <div>Junan numero: {train.trainNumber}</div>
                <div>Junan lähtöpäivä: {train.departureDate}</div>
                <div>
                  <div>{train.trainLocations.map((trainLocation, i) => (
                    <div key={i}>
                      <div>Junan Sijainti</div>
                      <div>Nopeus: {trainLocation.speed}</div>
                      <div>Koordinaatit:</div>
                      <div key={i}>
                        <div>Lat: {trainLocation.location[0]}</div>
                        <div>Lon: {trainLocation.location[1]}</div>
                      </div>
                    </div>
                  ))}</div>
                </div>
              </div>
            ))}
          </ul>
        </Suspense>

      </div>
  </>
  );
}
