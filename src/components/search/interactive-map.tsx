
'use client';

import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

// Robust fix for default Leaflet icon path issues with Webpack/Next.js
// Ensures this modification runs only once per client session.
if (typeof window !== 'undefined') {
  if (!(window as any).__LEAFLET_ICON_FIXED__) {
    // Check if _getIconUrl exists on the prototype before attempting to delete it
    if (L.Icon.Default.prototype.hasOwnProperty('_getIconUrl')) {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
    }
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    (window as any).__LEAFLET_ICON_FIXED__ = true;
  }
}


const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const highlightedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


interface NearbyPoint {
  name: string;
  description: string;
  lat: number;
  lng: number;
  photoUrl?: string;
  rating?: number;
}

interface InteractiveMapProps {
  mainDestination: {
    name: string;
    lat: number;
    lng: number;
  };
  nearbyAttractions: NearbyPoint[];
}

export default function InteractiveMap({ mainDestination, nearbyAttractions }: InteractiveMapProps) {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const position: LatLngExpression = [mainDestination.lat, mainDestination.lng];

  useEffect(() => {
    // Cleanup function to remove the map instance when the component unmounts or mapInstance changes.
    // This is crucial for React StrictMode and preventing re-initialization errors.
    return () => {
      if (mapInstance) {
        // Check if the map container still exists and if it's the one associated with this map instance.
        // Leaflet's map.remove() should handle this, but this adds an extra layer of safety.
        const container = mapInstance.getContainer();
        if (container && container._leaflet_id === mapInstance._leaflet_id) {
            mapInstance.remove();
        }
      }
    };
  }, [mapInstance]); // Rerun effect if mapInstance changes (though it shouldn't change after creation)

  return (
    <Card className="shadow-xl rounded-xl border-border/50 overflow-hidden w-full h-[500px] lg:h-[600px]">
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMapInstance} // Get reference to the map instance
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={highlightedIcon}>
          <Popup>
            <div className="w-64">
              <h3 className="text-lg font-semibold mb-1">{mainDestination.name} (Main Destination)</h3>
            </div>
          </Popup>
        </Marker>
        {nearbyAttractions.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lng]} icon={defaultIcon}>
            <Popup>
              <div className="w-64 space-y-2">
                {point.photoUrl && (
                   <div className="relative h-32 w-full rounded-md overflow-hidden">
                    <Image
                        src={point.photoUrl}
                        alt={`Image of ${point.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{objectFit: "cover"}}
                        data-ai-hint={`${point.name.substring(0,50)} attraction`}
                    />
                   </div>
                )}
                <h3 className="text-lg font-semibold">{point.name}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
                {point.rating && (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < point.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">({point.rating})</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Card>
  );
}
