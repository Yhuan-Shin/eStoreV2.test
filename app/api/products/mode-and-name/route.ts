import { NextResponse } from "next/server";
import { url } from "../..";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const planDesc = searchParams.get("planDesc")?.trim();
    const mode = searchParams.get("mode")?.trim();

    if (!planDesc || !mode) {
      return NextResponse.json(
        { message: "planDesc and mode are required" },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      `${url}/GetModeAndName?planDesc=${encodeURIComponent(planDesc)}&mode=${encodeURIComponent(mode)}`,
      {
        method: "GET",
      },
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: "Failed to fetch mode and name" },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Products mode-and-name route error:", error);
    return NextResponse.json(
      { message: "Unable to fetch mode and name" },
      { status: 500 },
    );
  }
}
