"use client";

import { useState } from "react";

export default function Home() {
  const [postcode, setPostcode] = useState("");

  function search() {
    console.log("Searching for:", postcode);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-10">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        GreenStreet 🌱
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="border p-2 rounded text-gray-700"
        />

        <button
          onClick={search}
          className="bg-green-600 text-gray px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
    </main>
  );
}