import { url } from "..";
import { IPlanholderApiResponse } from "@/types/planholder";

export async function searchPlanholder(firstName: string, dateOfBirth: string, lastName: string) {
  // const res = await fetch(`${url}/SearchPlanholder?lpaNo=${encodeURIComponent(firstName)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}&lastName=${encodeURIComponent(lastName)}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const res = await fetch(`http://192.168.23.16:5237/SearchPlanholder?lpaNo=${encodeURIComponent(firstName)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}&lastName=${encodeURIComponent(lastName)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseText = await res.text();
  let payload: IPlanholderApiResponse | null = null;

  if (responseText) {
    try {
      payload = JSON.parse(responseText) as IPlanholderApiResponse;
    } catch {
      payload = null;
    }
  }

  if (!res.ok || payload === null) {
    throw new Error(`Planholder search failed (${res.status})`);
  }

  return payload;
}