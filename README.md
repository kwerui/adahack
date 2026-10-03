Yep — you should have a README that looks like an actual hackathon project README, not just “this is our app” 😭

This version matches what you actually built and keeps prototype/demo features clearly labelled. The project is directly aligned with the challenge goal of showing postcode-level environmental information and encouraging neighbours to act together. :chatgpt-content-reference{index="0"}

Copy this into your root `README.md`:

```md
# 🌱 GreenStreet

**Make your postcode greener, together.**

GreenStreet is a postcode-based sustainability platform built for **AdaHack 2026**.

It helps people understand environmental conditions in their local area and turns that information into practical actions that neighbours can take together.

🔗 **Live Demo:** https://greenerstreet-sigma.vercel.app

---

## 💡 The Idea

Environmental data can be difficult to understand and often feels disconnected from everyday life.

GreenStreet makes sustainability local.

Users can enter their postcode — or use their current location — to see information about:

- 🌫️ Local air quality
- ⚡ Electricity carbon intensity
- 🌳 Nearby green spaces
- 💡 Lower-carbon electricity periods

GreenStreet then turns this information into personalised recommendations, local sustainability challenges and community goals.

The idea is simple:

> **Your postcode is your team.**

---

## ✨ Features

### 📍 Postcode Search

Users can:

- Enter any UK postcode
- Use their current location
- Return to their most recently viewed area through **Dashboard**

Postcodes are converted into geographic coordinates using **Postcodes.io**.

---

### 🌫️ Local Air Quality

GreenStreet retrieves current air-quality data using the **Open-Meteo Air Quality API**.

The dashboard displays:

- European AQI
- A simple air-quality rating
- Local recommendations based on current conditions

---

### ⚡ Carbon Intensity

The dashboard shows the current electricity carbon intensity for the user's postcode area.

Data comes from the **UK Carbon Intensity API** and is displayed in:

`gCO₂/kWh`

GreenStreet also converts this into simple labels such as:

- Very Low
- Low
- Moderate
- High
- Very High

---

### ⚡ Green Hour

GreenStreet looks at the next 24 hours of local electricity carbon-intensity forecasts and identifies a lower-carbon period.

Users can see:

- The recommended time period
- Forecast carbon intensity
- Suggestions for flexible electricity use
- A prototype community participation counter

For example, users may choose to run a washing machine or dishwasher during a lower-carbon period.

> Green Hour represents lower-carbon electricity periods, not necessarily cheaper electricity prices.

---

### 🌳 Nearby Green Spaces

Using the **Geoapify Places API**, GreenStreet finds green spaces within approximately 1 km of the selected postcode.

Users can:

- See the number of nearby green spaces
- Expand the card to view individual locations
- See approximate distance from their postcode

Duplicate map features are filtered so the same place is not repeatedly displayed.

---

### 💡 Best Action Today

Environmental data is converted into simple, relevant recommendations.

For example:

- Good air quality → consider walking or cycling for a short journey
- High carbon intensity → consider delaying flexible electricity use
- Few nearby green spaces → support local greening activities
- Low carbon intensity → consider using flexible appliances during this period

The recommendation system is currently **rule-based**, allowing decisions to remain simple and explainable.

---

### 🤝 Street Challenges

GreenStreet gives postcode communities sustainability challenges based on local conditions.

Challenge categories include:

- 🚶 Cleaner travel
- ⚡ Energy use
- 🌳 Green spaces
- 🔌 Lower-carbon electricity

Example challenges include:

- Walk instead of driving for a short journey
- Run a full washing-machine load at 30°C or lower
- Visit a local green space you have not visited before
- Use natural daylight when practical
- Avoid unnecessary engine idling

Users can join a challenge and see prototype neighbourhood participation progress.

---

### 🏆 GreenStreet Awards

Communities progress through four GreenStreet levels:

| Level | Score |
|---|---:|
| 🌱 Seedling | 0–24 |
| 🌿 Sprout | 25–49 |
| 🌸 Bloom | 50–74 |
| 🌳 Canopy | 75–100 |

The prototype points system includes:

#### Individual Actions

- Everyday sustainable actions: **5–25 points**
- Larger household energy shifts: **50–100 points**

#### Community Actions

- Larger neighbourhood sustainability projects can contribute significantly more points.

The Awards page also demonstrates potential sustainability-focused rewards such as:

- Community recognition
- Local partner discounts
- Sustainability-related freebies
- Neighbourhood competitions

> Rewards and scores shown in the current prototype are demonstration concepts and are not confirmed People's Postcode Lottery rewards.

---

## 🧠 How It Works

The main data flow is:

```text
User enters postcode
        ↓
Postcodes.io
        ↓
Postcode + latitude + longitude
        ↓
Area Dashboard
        ↓
 ┌─────────────────────────────┐
 │ Open-Meteo → Air Quality    │
 │ Carbon API → Electricity    │
 │ Geoapify → Green Spaces     │
 └─────────────────────────────┘
        ↓
Recommendations
        ↓
Street Challenges
        ↓
Community participation
```

When a user chooses **Use my current location**:

```text
Browser Geolocation
        ↓
Latitude + Longitude
        ↓
Postcodes.io reverse lookup
        ↓
Nearest postcode
        ↓
Area Dashboard
```

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Next.js Features

- App Router
- Client Components
- API Routes
- React state and effects
- Dynamic query parameters
- Suspense boundaries

### Browser APIs

- `navigator.geolocation`
- `localStorage`

### External APIs

- **Postcodes.io**
  - Postcode lookup
  - Reverse postcode lookup
  - Latitude / longitude
  - Administrative area information

- **Open-Meteo Air Quality API**
  - European Air Quality Index

- **UK Carbon Intensity API**
  - Current regional carbon intensity
  - 24-hour carbon-intensity forecast

- **Geoapify Places API**
  - Nearby parks and green spaces

### Deployment

- **Vercel**

---

## 🔐 API Key Security

The Geoapify API key is stored as a server-side environment variable:

```env
GEOAPIFY_API_KEY=your_api_key_here
```

The key is accessed through a Next.js API route rather than exposed directly in the client.

`.env.local` should **never be committed to GitHub**.

---

## 🚀 Running GreenStreet Locally

### 1. Clone the repository

```bash
git clone https://github.com/kwerui/adahack.git
cd adahack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
GEOAPIFY_API_KEY=your_geoapify_api_key
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📦 Production Build

To test the production build locally:

```bash
npm run build
```

Then:

```bash
npm start
```

---

## 🧩 Project Structure

```text
app/
├── api/
│   └── green-spaces/
│       └── route.ts
├── about/
│   └── page.tsx
├── area/
│   └── page.tsx
├── awards/
│   └── page.tsx
├── layout.tsx
└── page.tsx

components/
├── AirQualityCard.tsx
├── CarbonCard.tsx
├── GreenHour.tsx
├── GreenSpaceCard.tsx
├── Navbar.tsx
├── PostCodeSearch.tsx
├── RecommendationCard.tsx
└── StreetChallenge.tsx
```

---

## 🧑‍💻 Technical Decisions

### Why use postcode as the starting point?

The challenge is centred around neighbourhood communities, so postcode provides a simple way to connect environmental information with a recognisable local area.

---

### Why use a Next.js API route for green spaces?

Green-space requests go through:

```text
Browser
→ /api/green-spaces
→ Geoapify
→ GreenStreet
```

This keeps the Geoapify API key on the server rather than exposing it in frontend code.

---

### Why Geoapify?

An early version of GreenStreet experimented with the public OpenStreetMap Overpass API.

During development, public Overpass endpoints repeatedly encountered issues including timeouts, rate limits and connection failures.

The green-space feature was therefore placed behind a Next.js API route and switched to Geoapify, allowing the frontend architecture to remain largely unchanged while improving reliability.

---

### Why rule-based recommendations?

For the hackathon prototype, recommendations use transparent conditions rather than a machine-learning or AI model.

For example:

```ts
if (carbonIntensity >= 250) {
  // Recommend delaying flexible electricity use
}
```

This keeps recommendations:

- Predictable
- Explainable
- Easy to test
- Directly connected to live environmental data

---

## ⚠️ Prototype Features

Some features currently use demonstration data because a production version would require user accounts, a database and verification infrastructure.

These include:

- Community participant counts
- Challenge participation
- Green Hour participation
- Community points
- Award progress
- Reward unlocking

These are intended to demonstrate how the community system could work in a full implementation.

---

## 🔮 Future Development

Possible future additions include:

- User accounts and authenticated households
- Persistent challenge participation
- Real postcode-level community scores
- Historical environmental trends
- Greenest / most improved postcode leaderboards
- Verified community projects
- EPC data integration
- Notifications for upcoming Green Hours
- Local sustainability events
- Community project coordination
- Accessibility and localisation improvements

---

## 🌍 Our Goal

GreenStreet aims to make environmental information feel:

- **Local**
- **Understandable**
- **Actionable**
- **Social**

Instead of simply showing environmental statistics, GreenStreet gives neighbours a reason to improve them together.

### 🌱 Your postcode. Your community. Your GreenStreet.

