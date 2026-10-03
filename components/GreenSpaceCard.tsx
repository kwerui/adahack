"use client";

import { useEffect, useState } from "react";

type GreenSpaceProps = {
  latitude: string | null;
  longitude: string | null;
  onData: (value: number) => void;
};

export default function GreenSpaceCard({
  latitude,
  longitude,
  onData,
}: GreenSpaceProps) {
  const [greenSpaceCount, setGreenSpaceCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getGreenSpaceData() {
      if (!latitude || !longitude) return;

      try {
        const response = await fetch(
          `/api/green-spaces?latitude=${latitude}&longitude=${longitude}`
        );

        const data = await response.json();

        console.log("Green space data:", data);

        if (!response.ok) {
          setError(data.error || "Could not load green spaces");
          return;
        }

        setGreenSpaceCount(data.count);
        onData(data.count);
      } catch (error) {
        console.error("Green space error:", error);
        setError("Could not load green spaces");
      }
    }

    getGreenSpaceData();
  }, [latitude, longitude, onData]);

  return (
    <div className="bg-white text-gray-800 border-2 border-green-600 rounded-xl p-6 text-center w-60 h-48 flex flex-col justify-center">
      <h2 className="text-xl font-bold mb-2">
        🌳 Green Spaces
      </h2>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : greenSpaceCount === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="text-3xl font-bold">
            {greenSpaceCount}
          </p>

          <p className="font-semibold text-green-600">
            nearby
          </p>

          <p className="text-sm text-gray-500">
            within 1 km
          </p>
        </>
      )}
    </div>
  );
}