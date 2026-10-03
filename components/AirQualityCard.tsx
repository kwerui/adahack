"use client";

import { useEffect, useState } from "react";

type AirQualityCardProps = {
  latitude: string | null;
  longitude: string | null;
  onData: (value: number) => void;
};

export default function AirQualityCard({
  latitude,
  longitude,
  onData,
}: AirQualityCardProps) {
  const [airQuality, setAirQuality] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAirQuality() {
      if (!latitude || !longitude) return;

      try {
        const response = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi`
        );

        const data = await response.json();

        console.log("Air quality response:", data);

        if (data.current?.european_aqi !== undefined) {
          const value = data.current.european_aqi;

          setAirQuality(value);
          onData(value);
        } else {
          setError("Air quality data unavailable");
        }
      } catch {
        setError("Could not load air quality");
      }
    }

    getAirQuality();
  }, [latitude, longitude, onData]);

  function getAirQualityLabel(aqi: number) {
    if (aqi <= 20) return "Very Good";
    if (aqi <= 40) return "Good";
    if (aqi <= 60) return "Moderate";
    if (aqi <= 80) return "Poor";
    return "Very Poor";
  }

  return (
    <div className="bg-white text-gray-800 border-2 border-green-600 rounded-xl p-6 text-center w-60 h-48 flex flex-col justify-center">
      <h2 className="text-xl font-bold mb-2">
        🌬 Air Quality
      </h2>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : airQuality === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="text-3xl font-bold">
            {airQuality}
          </p>

          <p className="font-semibold text-green-600">
            {getAirQualityLabel(airQuality)}
          </p>

          <p className="text-sm text-gray-500">
            European AQI
          </p>
        </>
      )}
    </div>
  );
}