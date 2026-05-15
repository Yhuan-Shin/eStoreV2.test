import path from "path";
import { url } from "../";
import fs from "node:fs";


export async function getModeAndName(planDesc: string, selectedPlan: string) {
  const api = `${url}/GetModeAndName?planDesc=${planDesc}&mode=${selectedPlan}`;
  const res = await fetch(api);
  const data = await res.json();
  return data;
}

export async function getProductByName(planDesc: string) {
  const api = `${url}/GetProductByName?planDesc=${planDesc}`;
  const res = await fetch(api);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

export async function getPlansCard() {
    const api = `${url}api/Product/GetPlanCards`;
    // const res = await fetch(api);
    // const data = await res.json();
    const filePath = path.join(process.cwd(), "data/plan_dummy.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);
    return Array.isArray(data) ? data : [data];
}

export async function getPlansSection() {
    const api = `${url}api/Product/GetPlanSections`;
    
    // console.log("API URL for getPlansSection:", api); // Debug log to check the API URL
    // const res = await fetch(api);
    // console.log("Response from getPlansSection:", res); // Debug log to check the response
    // const data = await res.json();
    const filePath = path.join(process.cwd(), "data/plansection_dummy.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");

    const data = JSON.parse(jsonData);

    return Array.isArray(data) ? data : [data];
}

