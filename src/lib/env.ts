export const env = {
  appName: import.meta.env.VITE_APP_NAME || 'Ghana Emergency Response Platform',
  authApiUrl: import.meta.env.VITE_AUTH_API_URL || 'http://localhost:4001',
  incidentsApiUrl: import.meta.env.VITE_INCIDENTS_API_URL || 'http://localhost:4002',
  trackingApiUrl: import.meta.env.VITE_TRACKING_API_URL || 'http://localhost:4003',
  analyticsApiUrl: import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:4004',
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  useMockApi: String(import.meta.env.VITE_USE_MOCK_API || 'true') === 'true',
};
