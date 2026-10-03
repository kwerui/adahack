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
    <div className="w-full max-w-xl bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-green-100 p-6 sm:p-12 flex flex-col items-center text-center">
      <h1 className="text-3xl sm:text-5xl font-bold mb-3 text-green-700">
        GreenStreet 🌱
      </h1>

      <p className="mb-7 text-gray-600 text-base sm:text-lg">
        Make your postcode greener, together.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
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
          className="flex-1 min-w-0 border border-green-200 bg-green-50/50 rounded-xl px-4 py-3 text-base text-gray-800 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />

        <button
          onClick={search}
          className="bg-green-600 text-white text-base font-semibold px-6 py-3 rounded-xl shadow-sm hover:bg-green-700 hover:shadow-md transition whitespace-nowrap"
        >
          Search
        </button>
      </div>

      <p className="text-sm text-gray-500 my-4">
        or
      </p>

      <button
        onClick={useMyLocation}
        disabled={locating}
        className="border border-green-300 bg-white text-green-700 text-base font-semibold px-5 py-3 rounded-xl hover:bg-green-50 transition disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
      >
        {locating
          ? "Finding your location..."
          : "📍 Use my current location"}
      </button>

      {error && (
        <p className="text-red-600 mt-4 text-sm text-center">
          {error}
        </p>
      )}
    </div>
  );
}