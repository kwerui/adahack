"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostCodeSearch() {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);

  const router = useRouter();

  function goToArea(result: any) {
    const region =
      result.region ??
      result.country ??
      "";

    const areaUrl =
      `/area?postcode=${encodeURIComponent(result.postcode)}` +
      `&latitude=${result.latitude}` +
      `&longitude=${result.longitude}` +
      `&region=${encodeURIComponent(region)}` +
      `&adminDistrict=${encodeURIComponent(
        result.admin_district ?? ""
      )}`;

    // Remember this area for the "My Area" navbar link
    localStorage.setItem("lastAreaUrl", areaUrl);

    router.push(areaUrl);
  }

  async function search() {
    setError("");

    if (!postcode.trim()) {
      setError("Please enter a postcode.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(
          postcode.trim()
        )}`
      );

      const data = await response.json();

      if (response.ok && data.result) {
        goToArea(data.result);
      } else {
        setError(
          "Postcode not found. Please check it and try again."
        );
      }
    } catch {
      setError(
        "Could not connect to the postcode service."
      );
    }
  }

  function useMyLocation() {
    setError("");
    setLocating(true);

    if (!navigator.geolocation) {
      setError(
        "Location is not supported by this browser."
      );
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`
          );

          const data = await response.json();

          if (
            response.ok &&
            Array.isArray(data.result) &&
            data.result.length > 0
          ) {
            const nearestPostcode =
              data.result[0];

            setPostcode(
              nearestPostcode.postcode
            );

            goToArea(nearestPostcode);
          } else {
            setError(
              "Could not find a postcode near your location."
            );
          }
        } catch {
          setError(
            "Could not find your postcode."
          );
        } finally {
          setLocating(false);
        }
      },

      () => {
        setError(
          "Location access was denied. You can still enter your postcode manually."
        );

        setLocating(false);
      }
    );
  }

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-green-600">
        GreenStreet 🌱
      </h1>

      <p className="mb-4 text-gray-600">
        Make your postcode greener, together.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) =>
            setPostcode(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }
          }}
          className="border border-gray-400 rounded px-3 py-2 text-gray-800"
        />

        <button
          onClick={search}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      <p className="text-sm text-gray-500 my-3">
        or
      </p>

      <button
        onClick={useMyLocation}
        disabled={locating}
        className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 disabled:text-gray-400 disabled:border-gray-400"
      >
        {locating
          ? "Finding your location..."
          : "📍 Use my current location"}
      </button>

      {error && (
        <p className="text-red-600 mt-3 text-center">
          {error}
        </p>
      )}
    </div>
  );
}