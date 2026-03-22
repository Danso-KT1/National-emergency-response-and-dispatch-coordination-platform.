# Ghana Emergency Response Platform Frontend

A React + TypeScript frontend for the **CPEN 421 Final Course Project**. This UI is designed around the project brief, which requires a minimal web interface that lets administrators **log in, record incidents, view dispatch status, track responder vehicles on a map, and view analytics**. It also respects the wider workflow in the document where an operator receives a phone call, captures the emergency on a form, selects the location on **Google Maps**, and then the backend determines the **nearest available responder**. fileciteturn1file1 fileciteturn1file3

## What this frontend covers from the brief

- Secure staff login screen for system users supported by the authentication service.
- Dashboard view for emergency operators.
- Incident list and status progression.
- Incident creation form with **Google Maps location picker** and latitude/longitude capture.
- Live dispatch tracking map for vehicles.
- Analytics dashboard for response times, incidents by region, and resource utilization.
- Mock API mode for frontend-first development before backend microservices are ready.

## Tech stack

- React
- TypeScript
- Vite
- Material UI
- React Router
- TanStack Query
- Axios
- React Hook Form + Zod
- Recharts
- Google Maps via `@react-google-maps/api`
- react-hot-toast
- framer-motion

## Packages to install

After placing the code in the project folder, run:

```bash
npm install
```

These are the important packages already listed in `package.json`:

```text
@emotion/react
@emotion/styled
@hookform/resolvers
@mui/icons-material
@mui/material
@react-google-maps/api
@tanstack/react-query
axios
dayjs
framer-motion
react
react-dom
react-hook-form
react-hot-toast
react-router-dom
recharts
zod
typescript
vite
@vitejs/plugin-react
```

## Folder structure

```text
emergency-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   └── layout/
│   ├── features/
│   │   └── auth/
│   ├── hooks/
│   ├── lib/
│   ├── mocks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## What each important folder does

### `src/pages`
Contains the main route-level screens:
- `LoginPage.tsx`
- `DashboardPage.tsx`
- `IncidentsPage.tsx`
- `NewIncidentPage.tsx`
- `TrackingPage.tsx`
- `AnalyticsPage.tsx`

### `src/components`
Reusable UI blocks:
- layout shell, sidebar, topbar
- metric cards
- status chips
- Google Maps picker
- live vehicles map

### `src/services`
All API calls are isolated here so you can later plug the real microservices in without rewriting page components.

### `src/mocks`
Frontend-first development data. Set `VITE_USE_MOCK_API=true` to work without backend services.

### `src/features/auth`
Auth context and login form.

## Environment setup

1. Duplicate `.env.example` and name it `.env`
2. Fill it like this:

```env
VITE_APP_NAME=Ghana Emergency Response Platform
VITE_AUTH_API_URL=http://localhost:4001
VITE_INCIDENTS_API_URL=http://localhost:4002
VITE_TRACKING_API_URL=http://localhost:4003
VITE_ANALYTICS_API_URL=http://localhost:4004
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_USE_MOCK_API=true
```

### About Google Maps
The project document explicitly says the incident location must be selected using **Google Maps** and the system must store **latitude and longitude**. This frontend supports that using `@react-google-maps/api`. If you do not add a valid API key yet, the app falls back to manual coordinate inputs so you can keep building. fileciteturn1file1turn1file2

## How to run the app

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

## Demo login in mock mode

Use any email and a password of at least 6 characters. The login page is wired to mock data when `VITE_USE_MOCK_API=true`.

## How the frontend matches the project brief

### 1. Authentication service alignment
The brief requires a microservice for registration, login, refresh token, and profile retrieval with JWT-based access for staff users. This frontend already includes:
- login UI
- auth context
- token storage
- protected routes
- profile-aware top bar

When the real auth service is ready, point `VITE_AUTH_API_URL` to it and match the response shape.

### 2. Incident service alignment
The brief says the incident form must capture:
- citizen details
- incident type
- location from Google Maps
- notes
- admin who created the report

This frontend includes that exact flow on `NewIncidentPage.tsx`. It also previews assignment logic visually, but the final assignment should happen on the backend incident microservice. fileciteturn1file2

### 3. Dispatch tracking alignment
The brief requires real-time vehicle tracking so administrators can see responder movement. The tracking page is designed for that and polls vehicle data regularly. With websockets later, you can replace polling with live push updates. fileciteturn1file3

### 4. Analytics alignment
The brief requires analytics like response times, incidents per region/type, bed usage, and responder utilization. The analytics page is structured directly around those views. fileciteturn1file3

## How to connect your real backend later

When your backend microservices are ready:

- set `VITE_USE_MOCK_API=false`
- update the API URLs in `.env`
- ensure your backend returns JSON that matches the TypeScript interfaces in `src/types/index.ts`
- keep auth tokens in the same `Authorization: Bearer <token>` format

### Expected backend route groups

- Auth service: `/auth/login`, `/auth/profile`
- Incident service: `/incidents`, `/incidents/open`, `/incidents/:id/status`
- Tracking service: `/vehicles`
- Analytics service: `/analytics/response-times`, `/analytics/incidents-by-region`, `/analytics/resource-utilization`

## Screen-by-screen explanation

### `LoginPage.tsx`
A strong first impression screen with a Ghana emergency operations theme. It presents the system purpose and signs in authorized personnel.

### `DashboardPage.tsx`
An operations summary page showing the most urgent metrics and recent incidents. This is useful for call-center or national control-room style workflows.

### `IncidentsPage.tsx`
Shows all open records, searchable and filterable. Operators can move incidents through required statuses such as Created, Dispatched, In Progress, and Resolved.

### `NewIncidentPage.tsx`
This is one of the most important pages because it maps directly to the document’s incident capture requirement. It supports:
- citizen name and phone
- incident type
- region
- notes
- map-based location selection
- lat/lng persistence

### `TrackingPage.tsx`
Displays vehicle markers and unit cards for dispatch operations.

### `AnalyticsPage.tsx`
Uses charts to surface insights for decision-making and demonstration scoring.

## Notes for your course project

This frontend is intentionally polished and presentation-ready because the project also expects a demonstration. The UI uses mock data first so you can show progress early while the microservices are still under development. The structure is also clean enough for later expansion into:
- hospital capacity management
- role-specific dashboards
- websocket tracking
- dispatch timelines
- incident detail pages
- responder roster management

## Suggested next frontend improvements

- Add a dedicated incident detail page
- Add role-based menu visibility
- Add dark/light theme switch
- Add websocket-based live tracking
- Add hospital capacity management page
- Add service-specific admin pages for hospital, fire, and police stations
