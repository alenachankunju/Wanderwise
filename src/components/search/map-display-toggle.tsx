
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClientInteractiveMapLoader } from '@/components/search/client-interactive-map-loader';
import { Map as MapIcon, Eye, EyeOff } from 'lucide-react'; // Using Eye/EyeOff for better toggle indication

// Prop types mirroring ClientInteractiveMapLoaderProps and adding destinationName
interface NearbyPoint {
  name: string;
  description: string;
  lat: number;
  lng: number;
  photoUrl?: string;
  rating?: number;
}

interface MapDisplayToggleProps {
  destinationName: string;
  mainDestination: {
    name: string;
    lat: number;
    lng: number;
  };
  nearbyAttractions: NearbyPoint[];
}

export function MapDisplayToggle({ destinationName, mainDestination, nearbyAttractions }: MapDisplayToggleProps) {
  const [isMapVisible, setIsMapVisible] = useState(false);

  const toggleMapVisibility = () => {
    setIsMapVisible(prev => !prev);
  };

  return (
    <section className="mb-8">
      <Button onClick={toggleMapVisibility} variant="outline" className="mb-6 shadow-md hover:shadow-lg transition-shadow">
        {isMapVisible ? (
          <>
            <EyeOff className="mr-2 h-5 w-5" />
            Hide Interactive Map
          </>
        ) : (
          <>
            <Eye className="mr-2 h-5 w-5" />
            Show Interactive Map
          </>
        )}
      </Button>

      {isMapVisible && (
        <>
          <h2 className="text-3xl font-headline font-semibold mb-6 text-foreground flex items-center gap-3">
            <MapIcon className="h-8 w-8 text-primary" />
            Interactive Map for {destinationName}
          </h2>
          <ClientInteractiveMapLoader
            mainDestination={mainDestination}
            nearbyAttractions={nearbyAttractions}
          />
        </>
      )}
    </section>
  );
}
