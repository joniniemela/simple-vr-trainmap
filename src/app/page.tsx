"use client"

import React, {Suspense, useEffect} from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSuspenseQuery } from "@apollo/client";
import { GET_CURRENTLY_RUNNING_TRAINS } from '@/graphql/queries';
import {ModeToggle} from "@/components/ModeToggle";

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

      <div className={"flex flex-row items-center justify-between m-8"}>
        <h1 className={"font-bold text-4xl text-center"}>VR Trains</h1>
        <div className={"flex flex-row items-center justify-between gap-4"}>
          <Button disabled>Admin Panel</Button>
          <ModeToggle />
        </div>

      </div>
      <div className={"flex flex-col gap-4 mx-8 my-4"}>
        <Suspense fallback={<div>Loading...</div>}>
          {filteredTrains.map((train, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <CardTitle>{train.trainType.name + train.trainNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Departure Date: {train.departureDate}</p>
                {train.trainLocations.length > 0 && (
                  <p>Location: {train.trainLocations[0].location.join(", ")}</p>
                )}
              </CardContent>
              <CardFooter>
                <CardAction>Speed: {train.trainLocations[0]?.speed || 0} km/h</CardAction>
              </CardFooter>
            </Card>
          ))}
        </Suspense>

      </div>
    </>
  );
}
