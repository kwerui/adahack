"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import AirQualityCard from "@/components/AirQualityCard";
import CarbonCard from "@/components/CarbonCard";
import GreenSpaceCard from "@/components/GreenSpaceCard";
import RecommendationCard from "@/components/RecommendationCard";
import StreetChallenge from "@/components/StreetChallenge";
import GreenHour from "@/components/GreenHour";

function AreaContent() {
  const searchParams = useSearchParams();

  const postcode = searchParams.get("postcode");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const region = searchParams.get("region");
  const adminDistrict = searchParams.get("adminDistrict");

  const [airQuality, setAirQuality] = useState<number | null>(null);
  const [carbonIntensity, setCarbonIntensity] =
    useState<number | null>(null);
  const [greenSpaceCount, setGreenSpaceCount] =
    useState<number | null>(null);

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center gap-6 p-6 sm:p-10">
      {/* AREA HEADER */}
      <div className="bg-white/90 border border-green-200 rounded-3xl shadow-sm p-7 text-center text-gray-800 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          {postcode} 🌱
        </h1>

        <p className="text-gray-600">
          {adminDistrict}, {region}
        </p>
      </div>

      {/* ENVIRONMENTAL DATA */}
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

      {/* RECOMMENDATION */}
      <RecommendationCard
        airQuality={airQuality}
        carbonIntensity={carbonIntensity}
        greenSpaceCount={greenSpaceCount}
      />

      {/* GREEN HOUR */}
      <GreenHour postcode={postcode} />

      {/* STREET CHALLENGE */}
      <StreetChallenge
        airQuality={airQuality}
        carbonIntensity={carbonIntensity}
        greenSpaceCount={greenSpaceCount}
      />
    </main>
  );
}

export default function AreaPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-green-100 flex items-center justify-center">
          <p className="text-green-700 font-semibold">
            Loading your area... 🌱
          </p>
        </main>
      }
    >
      <AreaContent />
    </Suspense>
  );
}