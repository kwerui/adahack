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
      `&limit=100` +
      `&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geoapify error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Green space client data:", data);
    
    return NextResponse.json({
      count: data.features?.length ?? 0,
    });
  } catch (error) {
    console.error("Geoapify error:", error);

    return NextResponse.json(
      { error: "Could not load green spaces" },
      { status: 500 }
    );
  }
}