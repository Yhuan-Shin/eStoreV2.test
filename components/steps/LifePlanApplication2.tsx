"use client";
import {
  VStack,
  SimpleGrid,
  Box,
  Select,
  createListCollection,
  Portal,
  Field,
  Span,
} from "@chakra-ui/react";
import FloatingLabelInput from "../ui/floating-label-input";
import { Body } from "st-peter-ui";
import { useEffect, useState } from "react";
import { useOcr } from "@/hooks/useOCR";
import { GeoApifyService } from "@/services/API/GeoApifyService";
import { IAddress } from "@/types/planholder";

const provinceOptions = [
  "Abra",
  "Agusan del Norte",
  "Agusan del Sur",
  "Aklan",
  "Albay",
  "Antique",
  "Apayao",
  "Aurora",
  "Basilan",
  "Bataan",
  "Batanes",
  "Batangas",
  "Benguet",
  "Biliran",
  "Bohol",
  "Bukidnon",
  "Bulacan",
  "Cagayan",
  "Camarines Norte",
  "Camarines Sur",
  "Camiguin",
  "Capiz",
  "Catanduanes",
  "Cavite",
  "Cebu",
  "Cotabato",
  "Davao de Oro",
  "Davao del Norte",
  "Davao del Sur",
  "Davao Occidental",
  "Davao Oriental",
  "Dinagat Islands",
  "Eastern Samar",
  "Guimaras",
  "Ifugao",
  "Ilocos Norte",
  "Ilocos Sur",
  "Iloilo",
  "Isabela",
  "Kalinga",
  "La Union",
  "Laguna",
  "Lanao del Norte",
  "Lanao del Sur",
  "Leyte",
  "Maguindanao del Norte",
  "Maguindanao del Sur",
  "Marinduque",
  "Masbate",
  "Metro Manila",
  "Misamis Occidental",
  "Misamis Oriental",
  "Mountain Province",
  "Negros Occidental",
  "Negros Oriental",
  "Northern Samar",
  "Nueva Ecija",
  "Nueva Vizcaya",
  "Occidental Mindoro",
  "Oriental Mindoro",
  "Palawan",
  "Pampanga",
  "Pangasinan",
  "Quezon",
  "Quirino",
  "Rizal",
  "Romblon",
  "Samar",
  "Sarangani",
  "Siquijor",
  "Sorsogon",
  "South Cotabato",
  "Southern Leyte",
  "Sultan Kudarat",
  "Sulu",
  "Surigao del Norte",
  "Surigao del Sur",
  "Tarlac",
  "Tawi-Tawi",
  "Zambales",
  "Zamboanga del Norte",
  "Zamboanga del Sur",
  "Zamboanga Sibugay",
].map((prov) => ({ label: prov, value: prov }));

const cityOptions = [
  "Quezon City",
  "Manila",
  "Davao City",
  "Caloocan",
  "Cebu City",
  "Zamboanga City",
  "Taguig",
  "Antipolo",
  "Pasig",
  "Valenzuela",
  "Las Piñas",
  "Makati",
  "San Jose del Monte",
  "Bacolod",
  "Muntinlupa",
  "Cagayan de Oro",
  "Dasmariñas",
  "Pasay",
  "General Santos",
  "Santa Rosa",
  "Iloilo City",
  "Parañaque",
  "Bacoor",
  "Mandaluyong",
  "Angeles",
  "Imus",
  "Lapu-Lapu",
  "Mandaue",
  "Baguio",
  "San Fernando",
  "Biñan",
  "Butuan",
  "San Pedro",
  "Navotas",
  "Tanauan",
  "Malabon",
  "Ormoc",
  "Legazpi",
  "Olongapo",
  "Cabuyao",
  "Tacloban",
  "Naga",
  "San Pablo",
  "Valencia",
  "Roxas",
  "Tarlac City",
  "Lucena",
  "Tagum",
  "Calamba",
  "Puerto Princesa",
  "Gapan",
  "Cotabato City",
  "Santiago",
  "Tuguegarao",
  "Bayawan",
  "Dipolog",
  "Pagadian",
  "Kidapawan",
  "Koronadal",
  "Surigao",
  "Dagupan",
  "Digos",
  "Candon",
  "Tabaco",
  "Baybay",
  "San Carlos",
  "Gingoog",
  "Sorsogon City",
  "Cauayan",
  "Science City of Muñoz",
  "Calapan",
  "San Jose",
  "Urdaneta",
  "Bayugan",
  "San Fernando (La Union)",
  "Bais",
  "Talisay",
  "Polomolok",
  "Panabo",
  "Danao",
  "Santa Maria",
  "Silay",
  "Cavite City",
  "Bogo",
  "Tabuk",
  "Trece Martires",
  "Ligao",
  "Canlaon",
  "Dumaguete",
  "Malaybalay",
  "Baclayon",
  "San Juan",
  "Laoag",
  "Mati",
  "Bangued",
  "Baler",
  "Vigan",
  "Puerto Galera",
  "Marawi",
  "Basilan City",
  "Isabela City",
  "Lamitan",
  "Jolo",
  "Bongao",
  "Ipil",
].map((city) => ({ label: city, value: city }));

const districtOptions = cityOptions;
const barangayOptions = cityOptions;

const provinceCollection = createListCollection({ items: provinceOptions });
const cityCollection = createListCollection({ items: cityOptions });
const districtCollection = createListCollection({ items: districtOptions });
const barangayCollection = createListCollection({ items: barangayOptions });

interface LifePlanApplication2Props {
  onAddressUpdate?: (address: IAddress) => void;
}

const LifePlanApplication2 = ({
  onAddressUpdate,
}: LifePlanApplication2Props) => {
  const OCRValue = "";
  // const OCRValue = localStorage.getItem("ocrResult");
  const { runOCR, data } = useOcr();
  const [lot, setLot] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [barangay, setBarangay] = useState("");

  const parseAddress = async (address: string) => {
    if (!address) return;

    try {
      const result = await GeoApifyService.autocompleteAddress(address);

      console.log("PARSED RESULT:", result);

      setLot(result.houseNumber ?? "");
      setStreet(result.street ?? "");
      setCity(result.city ?? "");
      setDistrict(result.suburb ?? "");
      setProvince(result.province ?? "");
    } catch (error) {
      console.error("Error parsing address:", error);
    }
  };

  useEffect(() => {
    if (OCRValue != null) {
      const ocrData = JSON.parse(OCRValue);
      const address = ocrData.addressLine || "";
      parseAddress(address);
    } else if (data?.response) {
      const address = data.response.addressLine || "";
      parseAddress(address);
    }
  }, [OCRValue, data]);

  useEffect(() => {
    onAddressUpdate?.({
      lot,
      street,
      barangay,
      city,
      province,
      // addressLine: `${lot} ${street} ${barangay} ${city} ${province}`.trim(),
    });
  }, [lot, street, barangay, city, province, district]);

  useEffect(() => {
    runOCR();
  }, []);

  return (
    <>
      <VStack align="stretch" gap={4} mb={4}>
        <Box>
          <Body>
            <Span fontWeight="bold">Residential Address</Span>
          </Body>
        </Box>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <FloatingLabelInput
            id="lotNumber"
            label="Lot #"
            value={lot}
            onChange={(e) => setLot(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FloatingLabelInput
            id="street"
            label="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </Field.Root>
        <VStack align="stretch" gap={4}>
          <Select.Root
            value={[province]}
            onValueChange={(e) => setProvince(e.value[0])}
            collection={provinceCollection}
            width="100%"
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select Province" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {provinceOptions.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </VStack>
        <VStack align="stretch" gap={4}>
          <Select.Root
            value={[city]}
            onValueChange={(e) => setCity(e.value[0])}
            collection={cityCollection}
            width="100%"
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select City" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {cityOptions.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </VStack>
        <VStack align="stretch" gap={4}>
          <Select.Root
            value={[district]}
            onValueChange={(e) => setDistrict(e.value[0])}
            collection={districtCollection}
            width="100%"
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select District" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {districtOptions.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </VStack>
        <VStack align="stretch" gap={4}>
          <Select.Root
            value={[barangay]}
            onValueChange={(e) => setBarangay(e.value[0])}
            collection={barangayCollection}
            width="100%"
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select Barangay" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {barangayOptions.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </VStack>
      </SimpleGrid>
    </>
  );
};

export default LifePlanApplication2;
