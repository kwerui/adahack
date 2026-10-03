"use client";

import { useEffect, useState } from "react";

type GreenSpaceProps = {
  latitude: string | null;
  longitude: string | null;
  onData: (value: number) => void;
};

type GreenSpace = {
  name: string;
  distance: number | null;
  latitude: number | null;
  longitude: number | null;
};

export default function GreenSpaceCard({
  latitude,
  longitude,
  onData,
}: GreenSpaceProps) {
  const [greenSpaceCount, setGreenSpaceCount] = useState<number | null>(null);
  const [greenSpaces, setGreenSpaces] = useState<GreenSpace[]>([]);
  const [showSpaces, setShowSpaces] = useState(false);
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
        setGreenSpaces(data.spaces ?? []);

        onData(data.count);
      } catch (error) {
        console.error("Green space error:", error);
        setError("Could not load green spaces");
      }
    }

    getGreenSpaceData();
  }, [latitude, longitude, onData]);

  return (
    <div className="bg-white text-gray-800 border-2 border-green-600 rounded-xl p-6 text-center w-60 min-h-48 flex flex-col justify-center">
      <h2 className="text-xl font-bold mb-2">
        🌳 Green Spaces
      </h2>

      {error ? (
        <p className="text-red-600">
          {error}
        </p>
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

          <p className="text-sm text-gray-500 mb-2">
            within 1 km
          </p>

          {greenSpaces.length > 0 && (
            <button
              onClick={() => setShowSpaces(!showSpaces)}
              className="text-green-600 text-sm font-semibold hover:underline"
            >
              {showSpaces ? "Hide spaces" : "View nearby spaces"}
            </button>
          )}

          {showSpaces && (
            <div className="mt-4 text-left text-sm space-y-2">
              {greenSpaces.map((space, index) => (
                <div
                  key={`${space.name}-${index}`}
                  className="border-t border-gray-200 pt-2"
                >
                  <p className="font-semibold">
                    🌳 {space.name}
                  </p>

                  {space.distance !== null && (
                    <p className="text-gray-500">
                      {Math.round(space.distance)} m away
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}