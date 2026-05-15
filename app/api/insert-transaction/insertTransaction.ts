import { ITransactionData } from "@/types/planholder";

export async function  insertTransactionApi(data: ITransactionData) {
  const res = await fetch(
    "http://192.168.2.10:8010/api/EstoreV2/PostInsertTransaction",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const raw = await res.text();
  const parsed = raw ? JSON.parse(raw) : null;

  if (!res.ok) {
    console.error("API ERROR:", parsed);
    throw new Error("Transaction failed");
  }

  return parsed;
}