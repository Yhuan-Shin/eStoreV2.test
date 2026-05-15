"use client";

import {
  Select,
  Input,
  Box,
  VStack,
  Grid,
  createListCollection,
  FileUpload,
  Field,
  Separator,
  Button,
} from "@chakra-ui/react";
import FloatingLabelInput from "../ui/floating-label-input";
import { Body } from "st-peter-ui";
import { useOcr } from "@/hooks/useOCR";
import { useEffect, useState } from "react";
import { IOcrValue } from "@/types/ocrResponse";
import { IApplicationData, IPersonalInfo } from "@/types/planholder";
import { saveApplicationDataToLocalStorage } from "@/lib/utils/applicationDataFactory";

interface LifePlanApplication1Props {
  initialData?: IPersonalInfo;
  onUpdate?: (personalInfo: IPersonalInfo, address?: any) => void;
}

const LifePlanApplication1 = ({
  initialData,
  onUpdate,
}: LifePlanApplication1Props) => {
  const { runOCR, data } = useOcr();

  const [formData, setFormData] = useState<IPersonalInfo>({
    firstName: initialData?.firstName ?? "",
    middleName: initialData?.middleName ?? "",
    lastName: initialData?.lastName ?? "",
    suffix: initialData?.suffix ?? "",
    birthDate: initialData?.birthDate ?? "",
    idType: initialData?.idType ?? "",
    idNumber: initialData?.idNumber ?? "",
    height: initialData?.height ?? 0,
    weight: initialData?.weight ?? 0,
    gender: initialData?.gender ?? "",
    civilStatus: initialData?.civilStatus ?? "",
    nationality: initialData?.nationality ?? "",
    mobileNumber: initialData?.mobileNumber ?? "",
    emailAddress: initialData?.emailAddress ?? "",
    mailingAddress: initialData?.mailingAddress ?? "",
    landLineNumber: initialData?.landLineNumber ?? "",
    // addressLine1: initialData?.addressLine1 ?? "",
  });
  // const OCRValue = localStorage.getItem("ocrResult");
  const OCRValue = "";
  useEffect(() => {
    runOCR();
  }, []);

  const [stateOcrValue, setStateOrcValue] = useState<IOcrValue>();

  const idCollection = createListCollection({
    items: [
      { label: "Passport", value: "passport" },
      { label: "Driver's License", value: "driver_license" },
      { label: "Philippine Identification Card", value: "national_id" },
    ],
  });

  // Auto-save formData to parent whenever it changes
  useEffect(() => {
    onUpdate?.(formData);
  }, [formData, onUpdate]);

  useEffect(() => {
    if (OCRValue != null) {
      const ocrData = JSON.parse(OCRValue);
      setStateOrcValue(ocrData);
      console.log("OCR Data:", ocrData);

      const [month, day, year] = ocrData.birthDate
        .split("/")
        .map((part: string) => part.trim());
      const formattedBirthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

      let mappedIdType = "";
      if (ocrData.idType) {
        const normalizedIdType = ocrData.idType
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/'/g, "");
        if (normalizedIdType.includes("passport")) {
          mappedIdType = "passport";
        } else if (normalizedIdType.includes("driver")) {
          mappedIdType = "driver_license";
        } else if (
          normalizedIdType.includes("national") ||
          normalizedIdType.includes("id")
        ) {
          mappedIdType = "national_id";
        }
      }

      // console.log(
      //   "Original idType:",
      //   ocrData.idType,
      //   "Mapped to:",
      //   mappedIdType,
      // );

      const updatedData = {
        ...formData,
        firstName: ocrData.firstName || "",
        lastName: ocrData.lastName || "",
        middleName: ocrData.middleName || "",
        addressLine1: ocrData.addressLine || "",
        suffix: ocrData.suffix || "",
        birthDate: formattedBirthDate || "",
        idType: mappedIdType || "",
      };
      setFormData(updatedData);
      onUpdate?.(updatedData);
    }
  }, [OCRValue]);

  return (
    <>
      <VStack mb={4} align="stretch">
        <Body fontWeight="bold">Identification</Body>
      </VStack>
      {/* <Button onClick={() => console.log("Current formData:", formData)}>
        Log Form Data
      </Button> */}
      <VStack gap={6} align="stretch" w="full">
        {/* Identification Section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Select.Root
            collection={idCollection}
            value={formData.idType ? [formData.idType] : []}
            onValueChange={(details) =>
              setFormData({ ...formData, idType: details.value[0] })
            }
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select ID Type" />
                {formData.idType && (
                  <Box fontSize="sm" color="fg.default" hidden>
                    {
                      idCollection.items.find(
                        (item) => item.value === formData.idType,
                      )?.label
                    }
                  </Box>
                )}
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {idCollection.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>

          {/* <Field.Root>
            <FileUpload.Root>
              <FileUpload.HiddenInput />

              <FileUpload.Context>
                {({ acceptedFiles }) => (
                  <Box
                    width="100%"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="sm"
                    p={2}
                    cursor="pointer"
                    _hover={{ borderColor: "gray.400" }}
                    fontSize="sm"
                  >
                    <FileUpload.Trigger asChild>
                      <Box
                      // onChange={(e) =>
                      //   setStateOrcValue({
                      //     ...stateOcrValue,
                      //     idType: e.target.addEventListener.,
                      //   })
                      // }
                      >
                        value={stateOcrValue?.idType || ""}
                        {acceptedFiles.length > 0
                          ? acceptedFiles.map((file) => file.name).join(", ")
                          : `${stateOcrValue?.idType || "Upload ID Image"}`}
                      </Box>
                    </FileUpload.Trigger>
                  </Box>
                )}
              </FileUpload.Context>
            </FileUpload.Root>
          </Field.Root> */}
        </Grid>

        <Separator />

        {/* Full Name Section */}
        <Body fontWeight="bold">Full Name</Body>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="lastName"
              type="text"
              label="Last Name"
              value={formData.lastName || ""}
              onChange={(e) => {
                const newData = { ...formData, lastName: e.target.value };
                setFormData(newData);
                onUpdate?.(newData);
              }}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="firstName"
              type="text"
              label="First Name"
              value={formData.firstName || ""}
              onChange={(e) => {
                const newData = { ...formData, firstName: e.target.value };
                setFormData(newData);
                onUpdate?.(newData);
              }}
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="middleName"
              type="text"
              label="Middle Name"
              value={formData.middleName || ""}
              onChange={(e) => {
                const newData = { ...formData, middleName: e.target.value };
                setFormData(newData);
                onUpdate?.(newData);
              }}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="suffix"
              type="text"
              label="Suffix (Optional)"
              value={formData.suffix || ""}
              onChange={(e) => {
                const newData = { ...formData, suffix: e.target.value };
                setFormData(newData);
                onUpdate?.(newData);
              }}
            />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Personal Data Section */}
        <Body fontWeight="bold">Personal Details</Body>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <Field.Label>Date of Birth</Field.Label>

            <Input
              id="dateOfBirth"
              type="date"
              value={formData.birthDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Date of Naturalization</Field.Label>

            <Input id="dateOfNeutralization" type="date" />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              id="height"
              label="Height (ft)"
              // value={stateOcrValue?.height}
              onChange={(e) =>
                setFormData({ ...formData, height: parseFloat(e.target.value) })
              }
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="weight"
              label="Weight (lbs)"
              // value={stateOcrValue?.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: parseFloat(e.target.value) })
              }
            />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Demographics Section */}
        <Body fontWeight="bold">Demographics</Body>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2 , 1fr)" }} gap={8}>
          <Field.Root>
            <Select.Root
              collection={createListCollection({
                items: [
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ],
              })}
            >
              <Select.HiddenSelect id="gender" />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Gender" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {createListCollection({
                    items: [
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ],
                  }).items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Field.Root>
          <Field.Root>
            <Select.Root
              collection={createListCollection({
                items: [
                  { label: "Single", value: "single" },
                  { label: "Married", value: "married" },
                  { label: "Widowed", value: "widowed" },
                  { label: "Divorced", value: "divorced" },
                  { label: "Separated", value: "separated" },
                  { label: "Annulled", value: "annulled" },
                ],
              })}
            >
              <Select.HiddenSelect id="civilStatus" />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Civil Status" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {createListCollection({
                    items: [
                      { label: "Single", value: "single" },
                      { label: "Married", value: "married" },
                      { label: "Widowed", value: "widowed" },
                      { label: "Divorced", value: "divorced" },
                      { label: "Separated", value: "separated" },
                      { label: "Annulled", value: "annulled" },
                    ],
                  }).items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="nationality"
              type="text"
              label="Nationality"
              onChange={(e) =>
                setFormData({ ...formData, nationality: e.target.value })
              }
            />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Basic Contact Info */}
        <Body fontWeight="bold">Contact Information</Body>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="mobileNumber"
              type="text"
              label="Mobile Number"
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="landlineNumber"
              type="text"
              label="Landline Number"
              onChange={(e) =>
                setFormData({ ...formData, landLineNumber: e.target.value })
              }
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="email"
              type="email"
              label="Email Address"
              onChange={(e) =>
                setFormData({ ...formData, emailAddress: e.target.value })
              }
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="mailingAddress"
              type="text"
              label="Mailing Address"
              onChange={(e) =>
                setFormData({ ...formData, mailingAddress: e.target.value })
              }
            />
          </Field.Root>
        </Grid>

        <Separator />

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="insurability"
              type="text"
              label="Insurability"
              value="Insurable"
              readOnly
            />
          </Field.Root>
        </Grid>
      </VStack>
    </>
  );
};

export default LifePlanApplication1;
