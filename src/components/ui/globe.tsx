"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { Marker as CobeMarker } from "cobe";

interface GlobeProps {
  data: { lat: number; lng: number }[];
  globeConfig?: {
    pointSize?: number;
    autoRotateSpeed?: number;
  };
}

export function World({ data, globeConfig }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;
    let height = 0;
    let globe: ReturnType<typeof createGlobe>;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        height = canvasRef.current.offsetHeight;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const markers: CobeMarker[] = data.map((point) => ({
      location: [point.lat, point.lng],
      size: globeConfig?.pointSize || 0.1,
    }));

    // Wait for dimensions to be set
    const initGlobe = () => {
      if (width === 0 || height === 0) {
        onResize();
      }
      
      globe = createGlobe(canvasRef.current!, {
        devicePixelRatio: 1, // Fixed to 1 for better mobile performance
        width: width,
        height: height,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 8000, // Further reduced for mobile
        mapBrightness: 6,
        baseColor: [0.051, 0.463, 0.737],
        markerColor: [0.051, 0.463, 0.737],
        glowColor: [0.051, 0.463, 0.737],
        markers,
        onRender: (state: Record<string, any>) => {
          state.phi = phi;
          phi += globeConfig?.autoRotateSpeed || 0.005;
          state.width = width;
          state.height = height;
        },
      });
    };

    const timeout = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
      initGlobe();
    }, 50);

    return () => {
      clearTimeout(timeout);
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [data, globeConfig]);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-500 "
      />
    </div>
  );
}