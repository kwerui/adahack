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
