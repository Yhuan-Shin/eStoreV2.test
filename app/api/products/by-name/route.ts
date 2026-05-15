import { NextResponse } from "next/server";
import { url } from "../..";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const planDesc = searchParams.get("planDesc")?.trim();

    if (!planDesc) {
      return NextResponse.json(
        { message: "planDesc is required" },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      `${url}/GetProductByName?planDesc=${encodeURIComponent(planDesc)}`,
      {
        method: "GET",
      },
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: "Failed to fetch product by name" },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(Array.isArray(data) ? data : [data]);
  } catch (error) {
    console.error("Products by-name route error:", error);
    return NextResponse.json(
      { message: "Unable to fetch product by name" },
      { status: 500 },
    );
  }
}
