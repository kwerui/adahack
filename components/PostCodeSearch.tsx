"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostCodeSearch() {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function search() {
    setError("");

    if (!postcode.trim()) {
      setError("Please enter a postcode.");
      return;
    }

    const response = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.trim())}`
    );

    const data = await response.json();

    if (response.ok) {
      router.push(
        `/area?postcode=${encodeURIComponent(data.result.postcode)}&latitude=${data.result.latitude}&longitude=${data.result.longitude}&region=${encodeURIComponent(data.result.region ?? "")}&adminDistrict=${encodeURIComponent(data.result.admin_district ?? "")}`
      );
    } else {
      setError("Postcode not found. Please check it and try again.");
    }
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
          onChange={(e) => setPostcode(e.target.value)}
          className="border border-gray-400 rounded px-3 py-2 text-gray-800"
        />

        <button
          onClick={search}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {error && (
        <p className="text-red-600 mt-3">
          {error}
        </p>
      )}
    </div>
  );
}