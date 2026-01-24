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
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;
    let height = 0;
    let animationFrameId: number;

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

    // Initialize globe after a small delay
    const initGlobe = () => {
      if (!canvasRef.current || width === 0 || height === 0) return;
      
      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width: width,
        height: height,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 8000,
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

      // Show canvas immediately
      canvasRef.current.style.opacity = "1";
    };

    // Start initialization
    const timeout = setTimeout(initGlobe, 0);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [data, globeConfig]);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0"
        style={{
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </div>
  );
}