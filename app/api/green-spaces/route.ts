import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Missing coordinates" },
      { status: 400 }
    );
  }
  // Read the key server-side so it is not exposed in client-side JavaScript.
  const apiKey = process.env.GEOAPIFY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Geoapify API key is missing" },
      { status: 500 }
    );
  }

  try {
    const url =
      `https://api.geoapify.com/v2/places` +
      `?categories=leisure.park` +
      `&filter=circle:${longitude},${latitude},1000` +
      `&bias=proximity:${longitude},${latitude}` +
      `&limit=20` +
      `&apiKey=${apiKey}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Geoapify error: ${response.status}`);
    }

    const data = await response.json();

    const allSpaces = (data.features ?? []).map((feature: any) => ({
  name:
    feature.properties?.name ||
    feature.properties?.address_line1 ||
    feature.properties?.formatted ||
    "Unnamed green space",

  distance: feature.properties?.distance ?? null,

  latitude: feature.properties?.lat ?? null,

  longitude: feature.properties?.lon ?? null,
}));
// Geoapify can return multiple features with the same place name,
// so deduplicate results before displaying them.
const uniqueSpaces = Array.from(
  new Map(
    allSpaces.map((space: any) => [
      space.name.toLowerCase(),
      space,
    ])
  ).values()
);

const spaces = uniqueSpaces.slice(0, 5);

    console.log("Geoapify spaces:", spaces);

    return NextResponse.json({
      count: uniqueSpaces.length,
      spaces,
    });
  } catch (error) {
    console.error("Geoapify error:", error);

    return NextResponse.json(
      { error: "Could not load green spaces" },
      { status: 500 }
    );
  }
}