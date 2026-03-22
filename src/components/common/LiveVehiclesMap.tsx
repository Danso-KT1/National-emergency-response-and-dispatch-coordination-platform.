import { Box, Typography } from '@mui/material';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { env } from '@/lib/env';
import { Vehicle } from '@/types';
import { useMemo, useState } from 'react';

const defaultCenter = { lat: 5.6037, lng: -0.1870 };

export function LiveVehiclesMap({ vehicles }: { vehicles: Vehicle[] }) {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: env.googleMapsApiKey });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const center = useMemo(() => {
    if (!vehicles.length) return defaultCenter;
    return { lat: vehicles[0].latitude, lng: vehicles[0].longitude };
  }, [vehicles]);

  if (!env.googleMapsApiKey) {
    return (
      <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'background.paper', minHeight: 380, display: 'grid', placeItems: 'center' }}>
        <Typography color="text.secondary">Add a Google Maps API key to display live responder tracking on a map.</Typography>
      </Box>
    );
  }

  if (!isLoaded) return <Typography>Loading live map...</Typography>;

  return (
    <Box sx={{ borderRadius: 5, overflow: 'hidden' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '460px' }}
        center={center}
        zoom={8}
        options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
      >
        {vehicles.map((vehicle) => (
          <MarkerF
            key={vehicle.id}
            position={{ lat: vehicle.latitude, lng: vehicle.longitude }}
            onClick={() => setSelectedId(vehicle.id)}
          >
            {selectedId === vehicle.id && (
              <InfoWindowF onCloseClick={() => setSelectedId(null)}>
                <Box>
                  <Typography fontWeight={700}>{vehicle.unitName}</Typography>
                  <Typography variant="body2">{vehicle.serviceType}</Typography>
                  <Typography variant="body2">Status: {vehicle.status}</Typography>
                  <Typography variant="body2">Station: {vehicle.stationName}</Typography>
                </Box>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    </Box>
  );
}
