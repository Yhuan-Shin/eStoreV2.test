"use client";

import { Box, Button } from "@chakra-ui/react";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import { createLifePlanSteps } from "@/data/lifePlanSteps";
import { useState } from "react";
import { Body, Breadcrumb, H3 } from "st-peter-ui";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cartItem";
import {
  TransactionService,
  PayMongoService,
} from "@/services/API/PayMongoService";
import {
  createEmptyApplicationData,
  loadApplicationDataFromLocalStorage,
} from "@/lib/utils/applicationDataFactory";
import Container from "../ui/container";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Plan Management", href: "/plan-management" },
  { label: "Life Plan Application", href: "#" },
];

const LifePlanApplicationStepWrapper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false); // optional
  const [allAgreementsAccepted, setAllAgreementsAccepted] = useState(false);
  const router = useRouter();

  const steps = createLifePlanSteps({
    onAllAcceptedChange: setAllAgreementsAccepted,
  });

  const handleCheckout = async () => {
    if (!allAgreementsAccepted) return;
    setLoading(true);

    try {
      function safeParse<T>(value: string | null): T | null {
        if (!value) return null;
        try {
          return JSON.parse(value) as T;
        } catch {
          return null;
        }
      }

      const checkoutRaw = sessionStorage.getItem("CheckoutCart");
      const cartRaw = sessionStorage.getItem("Cart");

      const parsed =
        safeParse<CartItem | CartItem[]>(checkoutRaw) ??
        safeParse<CartItem | CartItem[]>(cartRaw);

      const items: CartItem[] = Array.isArray(parsed)
        ? parsed
        : parsed
          ? [parsed]
          : [];

      if (items.length === 0) {
        throw new Error("No items to checkout");
      }

      const applicationData =
        loadApplicationDataFromLocalStorage() ?? createEmptyApplicationData();

      await TransactionService.insert(applicationData);

      const checkoutPayload = items.map((item) => ({
        planDesc: item.planDesc,
        // productCode: item.productCode,
        // contractPrice: item.contractPrice,
        ipInstAmt: Number(item.price),
        planTerm: item.planTerm,
        quantity: item.quantity ?? 1,
      }));
      const { checkoutUrl } =
        await PayMongoService.createCheckout(checkoutPayload);

      if (!checkoutUrl) throw new Error("Checkout URL not found");

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      alert("Failed to proceed to payment");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <Box
        w="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH={{ base: "auto", md: "auto" }}
      >
        <Box bg="white" maxW="7xl" mx="auto" w="full" mb={{ base: 32, lg: 8 }}>
          <Box display={{ base: "block", md: "none" }} px={{ base: 4, md: 0 }}>
            <Button variant="ghost" onClick={() => router.back()} px={0}>
              <FaArrowLeft color="#177D54" />
              Back
            </Button>
          </Box>

          <Box mb={8} textAlign="start" mt={4} px={{ base: 4, md: 0 }}>
            <H3>Life Plan Application</H3>
            <Body mt={2}>
              Please fill out the form below to apply for a life plan.
            </Body>
          </Box>

          <Box px={{ base: 4, md: 0 }}>
            <HorizontalStepper
              steps={steps}
              onStepChange={setCurrentStep}
              onSubmit={handleCheckout}
              submitDisabled={!allAgreementsAccepted}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LifePlanApplicationStepWrapper;
