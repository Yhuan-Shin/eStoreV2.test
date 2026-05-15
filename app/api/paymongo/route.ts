import { NextResponse } from "next/server";
import { url } from "..";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const backendResponse = await fetch(`${url}/api/PayMongoAPI/CheckOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data?.message || "Checkout failed" },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("PayMongo route error:", error);
    return NextResponse.json(
      { message: "Unable to connect to checkout service" },
      { status: 500 },
    );
  }
}
