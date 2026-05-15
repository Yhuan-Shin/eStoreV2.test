import { NextResponse } from "next/server";
import { url } from "../";


export async function GET() {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const res = await fetch(`${url}/api/GetPlansCards`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`C# API returned ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json({ result: data });
  } catch (error: any) {
    console.error("Error calling C# API:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
