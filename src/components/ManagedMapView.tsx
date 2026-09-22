import React, { useEffect, useRef } from 'react';

/// <reference types="@types/google.maps" />

declare global {
  interface Window {
    google?: typeof google;
  }
}

const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
const FORGE_BASE_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL || 'https://forge.butterfly-effect.dev';
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;

function loadMapScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.google?.maps) {
      resolve();
      return;
    }
    const existing = document.querySelector('script[data-marketplace-maps="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Map script failed')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.dataset.marketplaceMaps = 'true';
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Map script failed'));
    document.head.appendChild(script);
  });
}

interface ManagedMapViewProps {
  className?: string;
  initialCenter: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady: (map: google.maps.Map) => void;
}

export const ManagedMapView: React.FC<ManagedMapViewProps> = ({ className, initialCenter, initialZoom = 11, onMapReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    let cancelled = false;
    loadMapScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.google?.maps) return;
        const map = new window.google.maps.Map(containerRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: true,
          mapId: 'DEMO_MAP_ID',
        });
        onMapReady(map);
      })
      .catch((error) => console.warn('[Marketplace Map]', error));
    return () => {
      cancelled = true;
    };
  }, [initialCenter, initialZoom, onMapReady]);

  return <div ref={containerRef} className={className || 'h-[420px] w-full'} />;
};
