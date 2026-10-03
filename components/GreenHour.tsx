"use client";

import { useEffect, useState } from "react";

type GreenHourProps = {
  postcode: string | null;
};

type ForecastPeriod = {
  from: string;
  to: string;
  intensity: {
    forecast: number;
    index?: string;
  };
};

export default function GreenHour({
  postcode,
}: GreenHourProps) {
  const [bestPeriod, setBestPeriod] =
    useState<ForecastPeriod | null>(null);

  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState(18);

  useEffect(() => {
    async function getGreenHour() {
      if (!postcode) return;

      setError("");

      try {
        const outwardPostcode =
          postcode.trim().split(" ")[0];

        const now = new Date();

        const requestTime = new Date(now);

        requestTime.setUTCMinutes(
          requestTime.getUTCMinutes() < 30 ? 0 : 30,
          0,
          0
        );

        const from =
          requestTime.toISOString().slice(0, 16) + "Z";

        const url =
          `https://api.carbonintensity.org.uk/regional/intensity/` +
          `${from}/fw24h/postcode/${encodeURIComponent(
            outwardPostcode
          )}`;

        const response = await fetch(url);

        const data = await response.json();

        console.log("Green Hour response:", data);

        if (!response.ok) {
          setError("Green Hour forecast unavailable");
          return;
        }

        // The API returns:
        // data -> data -> forecast periods
        const periods = data.data?.data;

        if (!Array.isArray(periods)) {
          console.error(
            "Unexpected Green Hour data structure:",
            data
          );

          setError("Green Hour forecast unavailable");
          return;
        }
        // Keep only future forecast periods that contain a valid carbon value.
        const validPeriods = periods.filter(
          (period: ForecastPeriod) =>
            typeof period.intensity?.forecast === "number" &&
            new Date(period.to) > now
        );

        if (validPeriods.length === 0) {
          setError("Green Hour forecast unavailable");
          return;
        }
        // Compare all valid periods and keep the one with the lowest forecast intensity.
        const lowestPeriod =
          validPeriods.reduce(
            (
              lowest: ForecastPeriod,
              current: ForecastPeriod
            ) =>
              current.intensity.forecast <
              lowest.intensity.forecast
                ? current
                : lowest
          );

        setBestPeriod(lowestPeriod);
      } catch (error) {
        console.error("Green Hour error:", error);

        setError("Could not load Green Hour");
      }
    }

    getGreenHour();
  }, [postcode]);

  function joinGreenHour() {
    if (joined) return;

    setParticipants((current) => current + 1);
    setJoined(true);
  }

  function formatTime(value: string) {
    return new Date(value).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

return (
  <div className="bg-white text-gray-800 border border-green-200 rounded-2xl p-7 w-full max-w-2xl text-center shadow-sm">
      <h2 className="text-2xl font-bold text-green-600 mb-3">
        ⚡ Green Hour
      </h2>

      <p className="text-gray-600 mb-5">
        Find a lower-carbon time for flexible electricity use.
      </p>

      {error ? (
        <p className="text-red-600">
          {error}
        </p>
      ) : bestPeriod === null ? (
        <p>Finding the next Green Hour...</p>
      ) : (
        <>
          <p className="text-sm text-gray-500">
            Lowest forecast in the next 24 hours
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {formatTime(bestPeriod.from)}
            {" – "}
            {formatTime(bestPeriod.to)}
          </p>

          <p className="mt-2 font-semibold">
            {bestPeriod.intensity.forecast} gCO₂/kWh
          </p>

          <p className="text-gray-600 mt-4">
            Consider using flexible appliances such as your
            washing machine or dishwasher during this lower-carbon
            period.
          </p>

          <div className="mt-6">
            <p className="font-semibold mb-3">
              {participants} demo neighbours joined
            </p>

            <button
              onClick={joinGreenHour}
              disabled={joined}
className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-sm hover:bg-green-700 hover:shadow-md transition disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"            >
              {joined
                ? "Joined ✓"
                : "Join Green Hour"}
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Prototype participation data.
          </p>
        </>
      )}
    </div>
  );
}