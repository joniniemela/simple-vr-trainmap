"use client";

import {useSuspenseQuery} from "@apollo/client";
import {GET_RUNNING_TRAINS_WITH_TIMETABLES} from "@/graphql/queries";
import React, {useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function TimetablesRoute() {
  const { data, refetch } = useSuspenseQuery(GET_RUNNING_TRAINS_WITH_TIMETABLES);
  const filteredTrains = data?.currentlyRunningTrains.filter(t => t.trainType.name !== "PAI");

  useEffect(() => {
    const interval = setInterval(() => {
      refetch().catch((error) => console.error(error));
    }, 12000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center m-8">Timetables</h1>
      <p className="text-center mb-8">This page is under construction.</p>
      <Table className={""}>
        <TableHeader>
          <TableRow>
            <TableHead>Train</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difference in minutes</TableHead>
          </TableRow>
        </TableHeader>
      <TableBody>
        {filteredTrains.map((train) => {
          const trainNumber = train.trainType.name + train.trainNumber;

          return (
            <TableRow key={trainNumber}>
              <TableCell className="font-medium">{trainNumber}</TableCell>
              <TableCell>{train.trainType.trainCategory.name}</TableCell>
              <TableCell>{train.timeTableRows[0].differenceInMinutes}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      </Table>
    </div>
  )
}