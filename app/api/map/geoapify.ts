export async function POST(req: Request) {
  const { address } = await req.json();

  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(address)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "eStore"
    }
  });

  const data = await res.json();

  if (!data.length) {
    return Response.json({ error: "Address not found" }, { status: 404 });
  }

  const addr = data[0].address;

  const result = {
    lot: "", // APIs usually don’t return this
    street: addr.road || addr.pedestrian || "",
    barangay: addr.suburb || addr.village || addr.neighbourhood || "",
    city: addr.city || addr.town || addr.municipality || "",
    province: addr.state || "",
  };

  return Response.json(result);
}