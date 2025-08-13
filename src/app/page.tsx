"use client";
import React, { useState , useContext} from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_CURRENTLY_RUNNING_TRAINS } from '@/graphql/queries';
import {TrainQueryItem} from "@/utils/types";

export default function Home() {

  // Fetch all Trains
  const { loading, error, data, refetch } = useQuery(GET_CURRENTLY_RUNNING_TRAINS);
  console.log(data)

  return (
      <div>
        <h1>VR Trains</h1>
        {loading ? <div>Loading...</div> : <ul>
          {data.currentlyRunningTrains.map((train: TrainQueryItem) => (
            <div key={train.trainNumber + train.departureDate}>
              <div>Junan numero: {train.trainNumber}</div>
              <div>Junan lähtöpäivä: {train.departureDate}</div>
              <div>
                <div>Junan Sijainti</div>
                <div>{train.trainLocations.map((trainLocation, i) => (
                  <div key={i}>
                    <div>Nopeus: {trainLocation.speed}</div>
                    <div>Sijainti:</div>
                      <div key={i}>
                        <div>Lat: {trainLocation.location[0]}</div>
                        <div>Lon: {trainLocation.location[1]}</div>
                      </div>
                  </div>
                  ))}</div>
              </div>
            </div>
          ))}
        </ul>}

      </div>
  );
}
