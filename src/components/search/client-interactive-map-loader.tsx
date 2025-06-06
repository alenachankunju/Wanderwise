
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
  ssr: false,
  loading: () => (
    <Skeleton className="w-full h-[400px] lg:h-[500px] rounded-xl shadow-lg" />
  ),
});

export function ClientInteractiveMapLoader({ mainDestination, nearbyAttractions }: ClientInteractiveMapLoaderProps) {
  // Although InteractiveMap itself checks for window,
  // it's good practice to be defensive in the loader too,
  // or ensure the loading skeleton handles SSR correctly.
  if (typeof window === 'undefined') {
    // This skeleton will be shown during SSR and initial client render before dynamic import resolves
    return <Skeleton className="w-full h-[400px] lg:h-[500px] rounded-xl shadow-lg" />;
  }

  return <InteractiveMap mainDestination={mainDestination} nearbyAttractions={nearbyAttractions} />;
}
