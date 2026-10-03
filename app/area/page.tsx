"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GreenHour from "@/components/GreenHour";
import AirQualityCard from "@/components/AirQualityCard";
import CarbonCard from "@/components/CarbonCard";
import GreenSpaceCard from "@/components/GreenSpaceCard";
import RecommendationCard from "@/components/RecommendationCard";
import StreetChallenge from "@/components/StreetChallenge";

export default function AreaPage() {
  const searchParams = useSearchParams();

  const postcode = searchParams.get("postcode");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const region = searchParams.get("region");
  const adminDistrict = searchParams.get("adminDistrict");

  const [airQuality, setAirQuality] = useState<number | null>(null);
  const [carbonIntensity, setCarbonIntensity] = useState<number | null>(null);
  const [greenSpaceCount, setGreenSpaceCount] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center gap-6 p-10">
      <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-800">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Area 🌱
        </h1>

        <p>Postcode: {postcode}</p>
        <p>Area: {adminDistrict}</p>
        <p>Region: {region}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <AirQualityCard
          latitude={latitude}
          longitude={longitude}
          onData={setAirQuality}
        />

        <CarbonCard
          postcode={postcode}
          onData={setCarbonIntensity}
        />

        <GreenSpaceCard
          latitude={latitude}
          longitude={longitude}
          onData={setGreenSpaceCount}
        />
      </div>

      <RecommendationCard
        airQuality={airQuality}
        carbonIntensity={carbonIntensity}
        greenSpaceCount={greenSpaceCount}
      />

      <GreenHour postcode={postcode} />

<StreetChallenge
  airQuality={airQuality}
  carbonIntensity={carbonIntensity}
  greenSpaceCount={greenSpaceCount}
/>
    </main>
  )
}