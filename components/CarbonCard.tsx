"use client";

import { useEffect, useState } from "react";

type CarbonCardProps = {
  postcode: string | null;
};

export default function CarbonCard({
  postcode,
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
        } else {
          setError("Carbon intensity data unavailable");
        }
      } catch {
        setError("Could not load carbon intensity");
      }
    }

    getCarbonIntensity();
  }, [postcode]);

  function getCarbonIntensityLabel(value: number) {
    if (value < 100) return "Very Low";
    if (value < 180) return "Low";
    if (value < 250) return "Moderate";
    if (value < 350) return "High";
    return "Very High";
  }

  return (
 <div className="bg-white text-gray-800 border-2 border-green-600 rounded-xl p-6 text-center w-60 h-48 flex flex-col justify-center">
    <h2 className="text-xl font-bold mb-2">
      ⚡ Carbon Intensity
    </h2>

      {error ? (
        <p>{error}</p>
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