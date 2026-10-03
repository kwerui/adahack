# Greener by Postcode

An English-language AdaHack prototype that helps neighbours explore their environment, try shared challenges and grow a community tree.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. No API keys are needed. The existing Next.js / React project and package lock are retained.

For a production check and local production server:

```sh
npm run build -- --webpack
npm start
```

Webpack is useful in restricted environments where Turbopack's CSS compiler cannot bind a local port. Deploy as a Next.js application with server route support; this is not a static export.

## Walkthrough

1. The home page opens on a clearly labelled sample neighbourhood in Hackney (E8 1EA).
2. Submit a full UK postcode to retrieve real environmental data.
3. Join the park-care challenge, then choose **Record your completion** and **Simulate verified completion**.
4. The tree grows from 80 to 100 leaves and unlocks the proposed community planting-kit reward.
5. Explore challenge filters, electricity forecasts and map information layers.
6. Use **Reset demo progress** in the footer to repeat the presentation.

## Data and limitations

- **Postcodes.io:** postcode coordinates, local authority and region.
- **Open-Meteo / CAMS:** European AQI and PM2.5 model estimates, approximately 11 km resolution in Europe. https://open-meteo.com/en/docs/air-quality-api
- **Carbon Intensity API:** Great Britain regional forecast and generation mix, matched by outward postcode. This does not measure household consumption. https://carbon-intensity.github.io/api-definitions/
- **OpenStreetMap / Overpass:** mapped parks, gardens and nature reserves within the query radius. Private/no-access entries are excluded when tagged. Coverage and access tags may be incomplete. Distances are straight-line estimates, not walking routes. https://www.openstreetmap.org/copyright
- Live services have timeouts and return partial results when a provider is unavailable. Missing live readings are never substituted with invented values. Default sample data remains available through **Explore demo**.
- Community neighbours, challenges, verification, points and rewards are illustrative. Activity is saved by postcode **on this browser only**, not synchronised across people or devices. Joining does not book an event. No real rewards can be redeemed.
- Home actions are self-reported; organiser verification is explicitly simulated. Leaves measure participation, not verified carbon savings. Repeated completion cannot earn duplicate points.
- Sharing copies a postcode link only. A localhost link is not accessible from other computers.
- This is an independent hackathon concept, not an official Postcode Lottery service. Lottery odds and prizes are not affected.

## Main files

- `components/Dashboard.tsx`: the interactive overview, challenges, map and rewards views.
- `lib/community.ts`: typed data contract, demo fixture and challenge definitions.
- `lib/environment-server.ts`: input validation, provider requests and response normalisation.
- `app/api/environment/route.ts`: combined environmental endpoint.
- `app/api/postcode/route.ts`: postcode lookup endpoint.
- `app/globals.css`: responsive visual design.

The tree illustration was generated specifically for this prototype.
