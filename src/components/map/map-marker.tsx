"use client";

import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
import { useMap } from "@/context/map-context";

interface MarkerProps {
  latitude: number;
  longitude: number;
  trainNumber?: string;
  speed?: number;
}

export default function Marker({ latitude, longitude, trainNumber, speed }: MarkerProps) {
  const { map } = useMap();
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map || !latitude || !longitude) return;

    if (markerRef.current) {
      markerRef.current.remove();
    }

    const markerElement = document.createElement('div');
    markerElement.innerHTML = `
      <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110">
        <div class="w-16 h-16 bg-white rounded-full shadow-lg border-4 ${speed && speed > 20 ? 'border-green-500' : speed && speed < 5 ? 'border-red-500' : 'border-blue-500'} flex items-center justify-center">
          ${trainNumber ? `<span class="text-xs font-bold text-gray-800">${trainNumber}</span>` : ''}
        </div>
      </div>
    `;

    markerRef.current = new mapboxgl.Marker({ element: markerElement })
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map, latitude, longitude, trainNumber, speed]);

  return null;
}