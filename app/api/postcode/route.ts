import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get("postcode");

  if (!postcode) {
    return NextResponse.json(
      { error: "Postcode is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Postcode not found" },
      { status: 404 }
    );
  }

  const data = await response.json();

  return NextResponse.json({
    postcode: data.result.postcode,
    latitude: data.result.latitude,
    longitude: data.result.longitude,
    region: data.result.region,
    adminDistrict: data.result.admin_district,
  });
}