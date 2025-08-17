## Simple VR train map

A simple web-app to show realtime data from Finnish trains. The idea for this is to be a clone for the original VR Trains on map with some additional functionality being added sometime in the future. You can currently view trains on the map with realtime (12s interval) rendering.

Link to application: https://simple-vr-trainmap.vercel.app/

### Tech stack & data source

- Next.js as frontend framework
- TailwindCSS & Shadcn for UI design and elements
- Mapbox GL JS for map rendering
- Digitraffic GraphQL API as main data source for realtime train data

### TODO:

- Map marker pop up with further train data
- Responsive frontend design for mobile form-factor etc.
- Timetables table
- Own backend API for gathering static data and managing it from admin panel

### Authors and acknowledgements

Author: Joni Niemelä

External templates and APIs used:
- Next.js & Shadcn map ui template by Anmoldeep Singh: https://medium.com/@sainianmol16/build-modern-maps-in-next-js-with-mapbox-and-shadcn-ui-80c276a1e9bf
- Digitraffic rail traffic API: https://www.digitraffic.fi/rautatieliikenne/
