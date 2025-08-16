"use client";

import React, { useLayoutEffect, useRef, useState, useMemo} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { MapContext } from "@/context/map-context";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type MapComponentProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  children?: React.ReactNode;
};

export default function MapProvider({
                                      mapContainerRef,
                                      initialViewState,
                                      children,
                                    }: MapComponentProps) {
  const map = useRef<never>(null);
  const [created, setCreated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!mapContainerRef.current || map.current) return;

      const mapboxgl = (await import("mapbox-gl")).default;
      await import("mapbox-gl/dist/mapbox-gl.css");

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

      const m = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard",
        center: [initialViewState.longitude, initialViewState.latitude],
        zoom: initialViewState.zoom,
        attributionControl: false,
        logoPosition: "bottom-right",
        collectResourceTiming: false,
      });

      map.current = m;
      setCreated(true);

      const onLoad = () => !cancelled && setLoaded(true);
      m.on("load", onLoad);

      return () => {
        m.off("load", onLoad);
      };
    };

    init().catch((error) => console.error(error));

    return () => {
      cancelled = true;
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setCreated(false);
      setLoaded(false);
    };
  }, [mapContainerRef, initialViewState.longitude, initialViewState.latitude, initialViewState.zoom]);

  const ctxValue = useMemo(
    () => ({ map: created ? (map.current as mapboxgl.Map | null) : null }),
    [created]
  );

  return (
    <div className="z-[1000]">
      <MapContext.Provider value={ctxValue}>{children}</MapContext.Provider>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
          <div className="text-lg font-medium">Loading map...</div>
        </div>
      )}
    </div>
  );
}