import { url } from "..";

export async function createCheckout(payload: any) {
  // const res = await fetch(`${url}/api/PayMongoAPI/CheckOut`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(payload),
  // });
  const res = await fetch(`http://192.168.2.10:9091/api/Paymongo/RedirectToPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });


  const data = await res.json();

  if (!res.ok) {
    console.error("API ERROR:", data);
    throw new Error(data?.message || "Checkout failed");
  }

  return data;
}