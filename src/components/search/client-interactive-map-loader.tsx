
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { LatLngExpression } from 'leaflet'; // Keep if used, or remove if not directly

// Define the prop types based on what InteractiveMap expects and what TravelSuggestions passes.
interface NearbyPoint {
  name: string;
  description: string;
  lat: number;
  lng: number;
  photoUrl?: string;
  rating?: number;
}

interface ClientInteractiveMapLoaderProps {
  mainDestination: {
    name: string;
    lat: number;
    lng: number;
  };
  nearbyAttractions: NearbyPoint[];
}

const InteractiveMap = dynamic(() => import('@/components/search/interactive-map'), {
  ssr: false, // This ensures the component only renders on the client
  loading: () => (
    <Skeleton className="w-full h-[400px] lg:h-[500px] rounded-xl shadow-lg" />
  ),
});

export function ClientInteractiveMapLoader({ mainDestination, nearbyAttractions }: ClientInteractiveMapLoaderProps) {
  // Generate a key based on the core map data that, if changed, should warrant a full remount.
  // This helps ensure Leaflet gets a fresh DOM node.
  const mapKey = `${mainDestination.name}-${mainDestination.lat}-${mainDestination.lng}`;

  return <InteractiveMap key={mapKey} mainDestination={mainDestination} nearbyAttractions={nearbyAttractions} />;
}
