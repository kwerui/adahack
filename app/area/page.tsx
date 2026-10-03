"use client";

import { useSearchParams } from "next/navigation";
import AirQualityCard from "@/components/AirQualityCard";
import CarbonCard from "@/components/CarbonCard";
import GreenSpaceCard from "@/components/GreenSpaceCard";

export default function AreaPage() {
  const searchParams = useSearchParams();

  const postcode = searchParams.get("postcode");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const region = searchParams.get("region");
  const adminDistrict = searchParams.get("adminDistrict");

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center gap-6 p-10">
      <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-800">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Area 🌱
        </h1>

        <p>Postcode: {postcode}</p>
        <p>Area: {adminDistrict}</p>
        <p>Region: {region}</p>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </div>

      <AirQualityCard
        latitude={latitude}
        longitude={longitude}
      />
      <CarbonCard postcode={postcode} />

      <GreenSpaceCard
        latitude={latitude}
        longitude={longitude}
      />
    </main>
  );
}
