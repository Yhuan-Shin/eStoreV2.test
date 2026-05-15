import { NextResponse } from "next/server";
import { url } from "../..";

export async function GET() {
  try {
    const backendResponse = await fetch(`${url}/GetPlansSection`, {
      method: "GET",
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: "Failed to fetch plans section" },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(Array.isArray(data) ? data : [data]);
  } catch (error) {
    console.error("Products sections route error:", error);
    return NextResponse.json(
      { message: "Unable to fetch plans section" },
      { status: 500 },
    );
  }
}
