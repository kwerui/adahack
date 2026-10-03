"use client";

import { useEffect, useState } from "react";

type CarbonCardProps = {
  postcode: string | null;
  onData: (value: number) => void;
};

export default function CarbonCard({
  postcode,
  onData,
}: CarbonCardProps) {
  const [carbonIntensity, setCarbonIntensity] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCarbonIntensity() {
      if (!postcode) return;

      try {
        const outwardPostcode = postcode.split(" ")[0];

        const response = await fetch(
          `https://api.carbonintensity.org.uk/regional/postcode/${outwardPostcode}`
        );

        const data = await response.json();

        console.log("Carbon response:", data);

        const intensity =
          data.data?.[0]?.data?.[0]?.intensity?.forecast;

        if (intensity !== undefined) {
          setCarbonIntensity(intensity);
          onData(intensity);
        } else {
          setError("Carbon intensity data unavailable");
        }
      } catch {
        setError("Could not load carbon intensity");
      }
    }

    getCarbonIntensity();
  }, [postcode, onData]);

  function getCarbonIntensityLabel(value: number) {
    if (value < 100) return "Very Low";
    if (value < 180) return "Low";
    if (value < 250) return "Moderate";
    if (value < 350) return "High";
    return "Very High";
  }

  return (
<div className="bg-white text-gray-800 border border-green-200 rounded-2xl p-6 text-center w-64 min-h-48 flex flex-col justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">      <h2 className="text-xl font-bold mb-2">
        ⚡ Carbon Intensity
      </h2>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : carbonIntensity === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="text-3xl font-bold">
            {carbonIntensity}
          </p>

          <p className="font-semibold text-green-600">
            {getCarbonIntensityLabel(carbonIntensity)}
          </p>

          <p className="text-sm text-gray-500">
            gCO₂/kWh
          </p>
        </>
      )}
    </div>
  );
}