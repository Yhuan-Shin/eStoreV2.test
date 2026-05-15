"use client";

import { useState } from "react";
import { getOCR } from "@/services/API/OcrService";
import { IAPIResponse } from "@/types/ocrResponse"

export function useOcr() {
  const [data, setData] = useState<IAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runOCR = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getOCR();
      setData(result as IAPIResponse);
    } catch (err) {
      setError("OCR failed");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, runOCR };
}