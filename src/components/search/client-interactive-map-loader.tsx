
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
  // Directly return the dynamically imported component.
  // The 'dynamic' function with 'ssr: false' and 'loading' prop
  // handles the server-side behavior (rendering the loading fallback)
  // and client-side loading state, ensuring consistency.
  return <InteractiveMap mainDestination={mainDestination} nearbyAttractions={nearbyAttractions} />;
}
