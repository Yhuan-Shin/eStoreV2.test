import { createAPIClient } from "@/services/API/APIClient";

const ocrClient = createAPIClient("/ocr");

export const getOCR = async () => {
  return await ocrClient.get<any>();
};