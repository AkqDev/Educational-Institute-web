"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { Marker as CobeMarker } from "cobe";

interface GlobeProps {
  data: { lat: number; lng: number }[];
  globeConfig?: {
    pointSize?: number;
    autoRotateSpeed?: number;
    devicePixelRatio?: number;
  };
}

export function World({ data, globeConfig }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const markers: CobeMarker[] = data.map((point) => ({
      location: [point.lat, point.lng],
      size: globeConfig?.pointSize || 0.1,
    }));

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: globeConfig?.devicePixelRatio || 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 10000, // Reduced for mobile
      mapBrightness: 6,
      baseColor: [0.051, 0.463, 0.737],
      markerColor: [0.051, 0.463, 0.737],
      glowColor: [0.051, 0.463, 0.737],
      markers,
      onRender: (state: Record<string, any>) => {
        state.phi = phi;
        phi += globeConfig?.autoRotateSpeed || 0.005;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    const timeout = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [data, globeConfig]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          transition: "opacity 1s ease",
          background: "transparent",
        }}
      />
    </div>
  );
}