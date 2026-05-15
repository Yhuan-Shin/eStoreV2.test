import { createAPIClient } from "@/services/API/APIClient";

const geoAddressClient = createAPIClient("/address");

export const GeoApifyService = {
  async autocompleteAddress(address: string) {
    address = "B15 L15, Triumph St. Diamond Crest Village, San Jose Del Monte";

    const data = await geoAddressClient.post<any, { address: string }>({ address });

    console.log("SERVICE RESPONSE:", data);
    console.log("request address", address);

    return data;
  },
};