import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { env } from '@/lib/env';
import { useMemo, useState } from 'react';

const containerStyle = { width: '100%', height: '420px', borderRadius: '20px' };
const defaultCenter = { lat: 5.6037, lng: -0.1870 };

interface GoogleMapPickerProps {
  latitude: number;
  longitude: number;
  onChange: (coords: { lat: number; lng: number }) => void;
}

export function GoogleMapPicker({ latitude, longitude, onChange }: GoogleMapPickerProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.googleMapsApiKey,
    libraries: ['places'],
  });
  const [manualLat, setManualLat] = useState(latitude);
  const [manualLng, setManualLng] = useState(longitude);

  const center = useMemo(() => ({ lat: latitude || defaultCenter.lat, lng: longitude || defaultCenter.lng }), [latitude, longitude]);

  const useBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      onChange({ lat: position.coords.latitude, lng: position.coords.longitude });
      setManualLat(position.coords.latitude);
      setManualLng(position.coords.longitude);
    });
  };

  if (!env.googleMapsApiKey) {
    return (
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Add your Google Maps API key in <code>.env</code> to enable the real map picker. A fallback coordinate input is shown for now.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField label="Latitude" type="number" value={manualLat} onChange={(e) => setManualLat(Number(e.target.value))} fullWidth />
          <TextField label="Longitude" type="number" value={manualLng} onChange={(e) => setManualLng(Number(e.target.value))} fullWidth />
        </Stack>
        <Button variant="outlined" onClick={() => onChange({ lat: manualLat, lng: manualLng })}>Use these coordinates</Button>
      </Stack>
    );
  }

  if (!isLoaded) return <Typography>Loading Google Maps...</Typography>;

  return (
    <Stack spacing={2}>
      <Box sx={{ borderRadius: 5, overflow: 'hidden' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
          onClick={(event) => {
            const lat = event.latLng?.lat() || defaultCenter.lat;
            const lng = event.latLng?.lng() || defaultCenter.lng;
            onChange({ lat, lng });
            setManualLat(lat);
            setManualLng(lng);
          }}
        >
          <MarkerF position={center} />
        </GoogleMap>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField label="Latitude" value={latitude} fullWidth InputProps={{ readOnly: true }} />
        <TextField label="Longitude" value={longitude} fullWidth InputProps={{ readOnly: true }} />
      </Stack>
      <Button variant="outlined" onClick={useBrowserLocation}>Use current browser location</Button>
    </Stack>
  );
}
