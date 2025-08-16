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

const ANIMATION_DURATION_MS = 1200;

export default function Marker({ latitude, longitude, trainNumber, speed }: MarkerProps) {
  const { map } = useMap();

  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const markerElementRef = useRef<HTMLDivElement | null>(null);
  const prevLngLatRef = useRef<[number, number] | null>(null);
  const rafRef = useRef<number | null>(null);

  // Helper to render/update marker content
  const setContent = () => {
    const el = markerElementRef.current;
    if (!el) return;
    el.innerHTML = `
      <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110">
        <div class="w-16 h-16 bg-white rounded-full shadow-lg border-4 ${
      speed && speed > 20
        ? "border-green-500"
        : speed && speed < 5
          ? "border-red-500"
          : "border-blue-500"
    } flex items-center justify-center">
          ${trainNumber ? `<span class="text-xs font-bold text-gray-800">${trainNumber}</span>` : ""}
        </div>
      </div>
    `;
  };

  useEffect(() => {
    // Guard: map and valid coords
    if (
      !map ||
      typeof (map as any).getContainer !== "function" ||
      !(map as any).getContainer() ||
      latitude == null ||
      longitude == null ||
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      return;
    }

    // Create marker once, set content immediately so it's visible on first render
    if (!markerRef.current) {
      markerElementRef.current = document.createElement("div");
      setContent(); // ensure initial content
      markerRef.current = new mapboxgl.Marker({ element: markerElementRef.current })
        .setLngLat([longitude, latitude])
        .addTo(map);
      prevLngLatRef.current = [longitude, latitude];
      return;
    }

    // Always refresh content (handles cases where only speed/trainNumber change)
    setContent();

    const to: [number, number] = [longitude, latitude];
    const fromLngLat = markerRef.current.getLngLat();
    const from: [number, number] = prevLngLatRef.current ?? [fromLngLat.lng, fromLngLat.lat];

    // Nothing to animate
    if (from[0] === to[0] && from[1] === to[1]) return;

    // Cancel any in-flight animation
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Easing: easeOutCubic
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    // Shortest path across anti-meridian
    let dLng = to[0] - from[0];
    if (dLng > 180) dLng -= 360;
    if (dLng < -180) dLng += 360;
    const dLat = to[1] - from[1];

    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ANIMATION_DURATION_MS);
      const k = ease(t);
      const lng = from[0] + dLng * k;
      const lat = from[1] + dLat * k;

      markerRef.current!.setLngLat([lng, lat]);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        prevLngLatRef.current = to;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [map, latitude, longitude, trainNumber, speed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      markerElementRef.current = null;
      prevLngLatRef.current = null;
    };
  }, []);

  return null;
}