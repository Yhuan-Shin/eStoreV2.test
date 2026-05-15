"use client";

import React, { useState } from "react";
import { Body, Box, H3, PrimaryMdFlexButton } from "st-peter-ui";
import {
  VStack,
  Grid,
  Button,
  Separator,
  Input,
  Field,
} from "@chakra-ui/react";
import FloatingLabelInput from "@/components/ui/floating-label-input";
import { FaArrowLeft } from "react-icons/fa";
import { Breadcrumb } from "st-peter-ui";
import { useSearchPlanholder } from "@/hooks/planholder/useSearchPlanholder";

import { useRouter } from "next/navigation";

const PayMyPlan = () => {
  const router = useRouter();
  const { loading, error, search } = useSearchPlanholder();
  const [validationError, setValidationError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    lpaNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const normalize = (value: string) =>
    value.trim().replace(/\s+/g, " ").toLowerCase();

  const handleSearch = async () => {
    if (!formData.lpaNumber.trim()) {
      setValidationError("LPA Number is required.");
      return;
    } else if (!formData.firstName.trim()) {
      setValidationError("First Name is required.");
      return;
    } else if (!formData.lastName.trim()) {
      setValidationError("Last Name is required.");
      return;
    } else if (!formData.dateOfBirth.trim()) {
      setValidationError("Date of Birth is required.");
      return;
    }

    setValidationError(null);
    // search expects three arguments: lpaNumber, dateOfBirth, lastName
    const result = await search(
      formData.lpaNumber.trim(),
      formData.dateOfBirth.trim(),
      formData.lastName,
    );

    if (!result) {
      return;
    }

    const firstNameMatches =
      !formData.firstName ||
      normalize(result.personalInfo.firstName).includes(
        normalize(formData.firstName),
      );
    const middleNameMatches =
      !formData.middleName ||
      normalize(result.personalInfo.middleName).includes(
        normalize(formData.middleName),
      );
    const lastNameMatches =
      !formData.lastName ||
      normalize(result.personalInfo.lastName).includes(
        normalize(formData.lastName),
      );
    const birthDateMatches =
      !formData.dateOfBirth ||
      result.personalInfo.birthDate === formData.dateOfBirth;

    if (
      !firstNameMatches ||
      !middleNameMatches ||
      !lastNameMatches ||
      !birthDateMatches
    ) {
      setValidationError("Entered details do not match the planholder record.");
      return;
    }

    sessionStorage.setItem("payMyPlanDetails", JSON.stringify(result));
    router.push("/pay-my-plan/details");
  };
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Pay My Plan",
      href: "/pay-my-plan",
    },
  ];

  return (
    <Box
      mt={{ base: 24, md: 32 }}
      maxW={"7xl"}
      mx={"auto"}
      mb={{ base: 24, md: 16 }}
      px={{ base: 4, md: 0 }}
    >
      <Box display={{ base: "block", md: "none" }} mb={8}>
        <Button variant="ghost" size="md" onClick={() => router.back()} px={0}>
          <FaArrowLeft color="#177D54" />
          Back
        </Button>
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <Breadcrumb items={breadcrumbItems} />
      </Box>
      <Box>
        <H3>Pay My Plan</H3>
        <Body>
          Search for your St. Peter Life Plan account to view details and manage
          your plan.
        </Body>
      </Box>

      <VStack gap={6} mt={8} align="stretch" w="full">
        {/* LPA Number Section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="lpaNumber"
              name="lpaNumber"
              type="text"
              label="LPA Number"
              value={formData.lpaNumber}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        {/* Full Name Section */}

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="middleName"
              name="middleName"
              type="text"
              label="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap={8}>
          <Field.Root>
            <Field.Label>Date of Birth</Field.Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        <Separator />

        {(validationError || error) && (
          <Body color="red.500">{validationError ?? error}</Body>
        )}

        {/* Search Button */}
        <PrimaryMdFlexButton onClick={handleSearch} disabled={loading}>
          SEARCH
        </PrimaryMdFlexButton>

        {/* Use My Saved Templates Link */}
        <Box textAlign="center">
          <Button w="full" variant="outline">
            Use My Saved Templates
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default PayMyPlan;
