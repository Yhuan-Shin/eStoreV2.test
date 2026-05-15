"use client";

import {
  Badge,
  Box,
  Flex,
  Grid,
  HStack,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Body,
  H4,
  PrimaryMdButton,
  SecondaryMdButton,
  Small,
} from "st-peter-ui";
import { HiInformationCircle } from "react-icons/hi";
import { useEffect, useMemo, useState } from "react";
import SideBar from "@/components/ui/sidebar";
import { PayMongoService } from "@/services/API/PayMongoService";
import { ListOfPlans, MessageDialogProvider } from "@splpi/plan-management";
import { IPlans } from "@/types/product";

const PAY_MY_PLAN_STORAGE_KEY = "payMyPlanSelectedItems";

const activePlans = [
  {
    contractNo: "LOS001106C",
    plan: "ST. BERNADETTE",
    mode: "Semi-Annual",
    amountDue: "13,250.00",
    effectiveDate: "01/04/2026",
    dueDate: "02/04/2028",
    balance: "79,500.00",
  },
  {
    contractNo: "LOS001107C",
    plan: "ST. BERNADETTE",
    mode: "Semi-Annual",
    amountDue: "13,250.00",
    effectiveDate: "02/04/2026",
    dueDate: "08/04/2026",
    balance: "119,250.00",
  },
  {
    contractNo: "LOS001110C",
    plan: "ST. CLAIRE",
    mode: "Monthly",
    amountDue: "1,870.00",
    effectiveDate: "02/09/2026",
    dueDate: "04/09/2026",
    balance: "108,460.00",
  },
  {
    contractNo: "LOS001111C",
    plan: "ST. ANNE",
    mode: "Monthly",
    amountDue: "3,000.00",
    effectiveDate: "02/09/2026",
    dueDate: "04/09/2026",
    balance: "174,000.00",
  },
  {
    contractNo: "LOS001112C",
    plan: "ST. GREGORY",
    mode: "Annual",
    amountDue: "11,400.00",
    effectiveDate: "02/20/2026",
    dueDate: "02/20/2027",
    balance: "45,600.00",
  },
  {
    contractNo: "LOS001113C",
    plan: "ST. CLAIRE",
    mode: "Annual",
    amountDue: "19,700.00",
    effectiveDate: "03/09/2026",
    dueDate: "03/09/2027",
    balance: "78,800.00",
  },
];

const tableHeaders = [
  "Contract No.",
  "Plan",
  "Mode",
  "Amount Due (P)",
  "Effective Date",
  "Due Date",
  "Balance (P)",
  "Actions",
];

type ActivePlan = (typeof activePlans)[number];

const parseAmount = (value: string) => Number(value.replace(/,/g, ""));

const PayMyPlan = () => {
  const [selectedPlans, setSelectedPlans] = useState<ActivePlan[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(PAY_MY_PLAN_STORAGE_KEY);

      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as ActivePlan[];

      if (!Array.isArray(parsed)) {
        return;
      }

      const validPlans = parsed.filter((storedPlan) =>
        activePlans.some((plan) => plan.contractNo === storedPlan.contractNo),
      );

      setSelectedPlans(validPlans);
    } catch {
      sessionStorage.removeItem(PAY_MY_PLAN_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      PAY_MY_PLAN_STORAGE_KEY,
      JSON.stringify(selectedPlans),
    );
  }, [selectedPlans]);

  const totalSelectedAmount = useMemo(() => {
    return selectedPlans.reduce(
      (total, plan) => total + parseAmount(plan.amountDue),
      0,
    );
  }, [selectedPlans]);

  const toggleContract = (planToToggle: ActivePlan) => {
    setSelectedPlans((prev) => {
      const exists = prev.some(
        (plan) => plan.contractNo === planToToggle.contractNo,
      );

      if (exists) {
        return prev.filter(
          (plan) => plan.contractNo !== planToToggle.contractNo,
        );
      }

      return [...prev, planToToggle];
    });
  };

  const handleCheckout = async () => {
    if (selectedPlans.length === 0) {
      return;
    }

    setIsCheckingOut(true);

    try {
      // const payload = {
      //   items: selectedPlans.map((plan) => ({
      //     planDesc: plan.plan,
      //     ipInstAmt: Number(plan.amountDue.replace(/,/g, "")),
      //     quantity: 1,
      //   })),
      // };
      const payload = [
        {
          planDesc: selectedPlans[0].plan,
          ipInstAmt: Number(selectedPlans[0].amountDue.replace(/,/g, "") ?? 0),
          quantity: 1,
        },
      ];

      const { checkoutUrl } = await PayMongoService.createCheckout(payload);

      if (!checkoutUrl) {
        throw new Error("Checkout URL not found");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      alert("Failed to proceed to payment");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    // <Box
    //   mt="32"
    //   px={{ base: "3", md: "8" }}
    //   pb={{ base: "44", md: "10" }}
    //   bg="white"
    // >
    //   <Flex w="full" maxW="7xl" mx="auto" gap="8" align="flex-start">
    //     <Box display={{ base: "none", md: "block" }}>
    //       <SideBar />
    //     </Box>

    //     <VStack flex="1" align="stretch" gap="5">
    //       <Box
    //         p={{ base: "4", md: "6" }}
    //         rounded="2xl"
    //         border="1px solid"
    //         borderColor="green.200"
    //         bg="green.50"
    //       >
    //         <H4>Pay My Plan</H4>
    //         <Body fontWeight="700" color="green.800" mt="1">
    //           Account No.: SPLPI-22-000021
    //         </Body>
    //         <Body color="green.700" mt="2">
    //           Select one or more active plans to prepare your payment in one go.
    //         </Body>

    //         <Grid
    //           templateColumns={{
    //             base: "1fr",
    //             sm: "repeat(2, 1fr)",
    //             lg: "repeat(4, 1fr)",
    //           }}
    //           gap="3"
    //           mt="4"
    //         >
    //           <Box
    //             bg="white"
    //             rounded="xl"
    //             p="3"
    //             border="1px solid"
    //             borderColor="green.200"
    //           >
    //             <Small color="green.700">Active Plans</Small>
    //             <Text color="green.900" fontWeight="700" fontSize="xl">
    //               {activePlans.length}
    //             </Text>
    //           </Box>
    //           <Box
    //             bg="white"
    //             rounded="xl"
    //             p="3"
    //             border="1px solid"
    //             borderColor="green.200"
    //           >
    //             <Small color="green.700">Selected</Small>
    //             <Text color="green.900" fontWeight="700" fontSize="xl">
    //               {selectedPlans.length}
    //             </Text>
    //           </Box>
    //           <Box
    //             bg="white"
    //             rounded="xl"
    //             p="3"
    //             border="1px solid"
    //             borderColor="green.200"
    //           >
    //             <Small color="green.700">Amount to Pay</Small>
    //             <Text color="green.900" fontWeight="700" fontSize="xl">
    //               P{" "}
    //               {totalSelectedAmount.toLocaleString("en-US", {
    //                 minimumFractionDigits: 2,
    //               })}
    //             </Text>
    //           </Box>
    //           {/* <Box
    //             bg="white"
    //             rounded="xl"
    //             p="3"
    //             border="1px solid"
    //             borderColor="green.200"
    //           >
    //             <Small color="green.700">Status</Small>
    //             <Badge
    //               bg="green.700"
    //               color="white"
    //               rounded="full"
    //               px="3"
    //               py="1"
    //               mt="1"
    //             >
    //               Ready to Pay
    //             </Badge>
    //           </Box> */}
    //         </Grid>
    //       </Box>

    //       <HStack
    //         gap="2"
    //         color="green.700"
    //         align="center"
    //         p="3"
    //         rounded="lg"
    //         bg="green.50"
    //         border="1px solid"
    //         borderColor="green.100"
    //       >
    //         <Box as={HiInformationCircle} boxSize="5" />
    //         <Body fontWeight="600">
    //           Tap Add to include a plan. You can remove it anytime before
    //           checkout.
    //         </Body>
    //       </HStack>

    //       {/* <Box
    //         display={{ base: "none", lg: "block" }}
    //         border="1px solid"
    //         borderColor="green.200"
    //         rounded="2xl"
    //         overflowX="auto"
    //         bg="white"
    //       >
    //         <Box as="table" w="full" minW="980px" borderCollapse="collapse">
    //           <Box as="thead" bg="green.700" color="white">
    //             <Box as="tr">
    //               {tableHeaders.map((header) => (
    //                 <Box
    //                   as="th"
    //                   key={header}
    //                   textAlign="left"
    //                   px="4"
    //                   py="3"
    //                   fontSize="sm"
    //                   fontWeight="700"
    //                   borderBottom="1px solid"
    //                   borderColor="green.800"
    //                 >
    //                   {header}
    //                 </Box>
    //               ))}
    //             </Box>
    //           </Box>

    //           <Box as="tbody">
    //             {activePlans.map((plan) => (
    //               <Box
    //                 as="tr"
    //                 key={plan.contractNo}
    //                 bg={
    //                   selectedPlans.some(
    //                     (selectedPlan) =>
    //                       selectedPlan.contractNo === plan.contractNo,
    //                   )
    //                     ? "green.50"
    //                     : "white"
    //                 }
    //                 _hover={{ bg: "green.50" }}
    //                 transition="background 0.2s ease"
    //               >
    //                 <Box
    //                   as="td"
    //                   px="4"
    //                   py="4"
    //                   borderBottom="1px solid"
    //                   borderColor="green.100"
    //                 >
    //                   <Text color="green.900" fontSize="sm">
    //                     {plan.contractNo}
    //                   </Text>
    //                 </Box>
    //                 <Box
    //                   as="td"
    //                   px="4"
    //                   py="4"
    //                   borderBottom="1px solid"
    //                   borderColor="green.100"
    //                 >
    //                   <Text color="green.900" fontWeight="600" fontSize="sm">
    //                     {plan.plan}
    //                   </Text>
    //                 </Box>
    //                 <Box
    //                   as="td"
    //                   px="4"
    //                   py="4"
    //                   borderBottom="1px solid"
    //                   borderColor="green.100"
    //                 >
    //                   <Text color="green.800" fontSize="sm">
    //                     {plan.mode}
    //                   </Text>
    //                 </Box>
    //                 <Box
    //                   as="td"
    //                   px="4"
    //                   py="4"
    //                   borderBottom="1px solid"
    //                   borderColor="green.100"
    //                   color="green.900"
    //                   fontSize="sm"
    //                 >
    //                   {plan.amountDue}
    //                 </Box>
    //                 <Box
    //                   as="td"
    //                   px="4"
    //                   py="4"
    //                   borderBottom="1px solid"
    //                   borderColor="green.100"
    //                   color="green.900"
    //                   fontSize="sm"
    //                 >
    //                   {plan.effectiveDate}
    //                 </Box>
    //                 <Box
    //                   as="td"
    //                   px="4"
    //                   py="4"
    //                   borderBottom="1px solid"
    //                   borderColor="green.100"
    //                   color="green.900"
    //                   fontSize="sm"
    //                 >
    //                   {plan.dueDate}
    //                 </Box>
    //                 <Box
    //                   as="td"
    //                   px="4"
    //                   py="4"
    //                   borderBottom="1px solid"
    //                   borderColor="green.100"
    //                   color="green.900"
    //                   fontWeight="600"
    //                   fontSize="sm"
    //                 >
    //                   {plan.balance}
    //                 </Box>
    //                 <Box
    //                   as="td"
    //                   px="4"
    //                   py="4"
    //                   borderBottom="1px solid"
    //                   borderColor="green.100"
    //                 >
    //                   <PrimaryMdButton
    //                     minW="100px"
    //                     onClick={() => toggleContract(plan)}
    //                   >
    //                     {selectedPlans.some(
    //                       (selectedPlan) =>
    //                         selectedPlan.contractNo === plan.contractNo,
    //                     )
    //                       ? "REMOVE"
    //                       : "Add"}
    //                   </PrimaryMdButton>
    //                 </Box>
    //               </Box>
    //             ))}
    //           </Box>
    //         </Box>
    //       </Box> */}

    //       {/* <VStack
    //         display={{ base: "flex", lg: "none" }}
    //         align="stretch"
    //         gap="3"
    //       >
    //         {activePlans.map((plan) => {
    //           const isSelected = selectedPlans.some(
    //             (selectedPlan) => selectedPlan.contractNo === plan.contractNo,
    //           );

    //           return (
    //             <Box
    //               key={plan.contractNo}
    //               rounded="xl"
    //               border="1px solid"
    //               borderColor={isSelected ? "green.500" : "green.200"}
    //               bg={isSelected ? "green.50" : "white"}
    //               p="4"
    //               shadow={isSelected ? "sm" : "none"}
    //             >
    //               <Flex justify="space-between" align="start" gap="3">
    //                 <Box>
    //                   <Small color="green.700">{plan.contractNo}</Small>
    //                   <Text color="green.900" fontWeight="700" fontSize="lg">
    //                     {plan.plan}
    //                   </Text>
    //                   <Body color="green.700">{plan.mode}</Body>
    //                 </Box>
    //                 <Badge
    //                   bg="green.700"
    //                   color="white"
    //                   rounded="full"
    //                   px="3"
    //                   py="1"
    //                 >
    //                   Due: P {plan.amountDue}
    //                 </Badge>
    //               </Flex>

    //               <Separator my="3" borderColor="green.100" />

    //               <Grid templateColumns="repeat(2, 1fr)" gap="3">
    //                 <Box>
    //                   <Small color="green.600">Effective Date</Small>
    //                   <Body fontWeight="600" color="green.900">
    //                     {plan.effectiveDate}
    //                   </Body>
    //                 </Box>
    //                 <Box>
    //                   <Small color="green.600">Due Date</Small>
    //                   <Body fontWeight="600" color="green.900">
    //                     {plan.dueDate}
    //                   </Body>
    //                 </Box>
    //                 <Box gridColumn="1 / -1">
    //                   <Small color="green.600">Balance</Small>
    //                   <Body fontWeight="700" color="green.900">
    //                     P {plan.balance}
    //                   </Body>
    //                 </Box>
    //               </Grid>

    //               <Flex mt="4" gap="2" justify="end">
    //                 {isSelected ? (
    //                   <SecondaryMdButton onClick={() => toggleContract(plan)}>
    //                     Remove
    //                   </SecondaryMdButton>
    //                 ) : (
    //                   <PrimaryMdButton onClick={() => toggleContract(plan)}>
    //                     Add
    //                   </PrimaryMdButton>
    //                 )}
    //               </Flex>
    //             </Box>
    //           );
    //         })}
    //       </VStack> */}
    //     </VStack>
    //   </Flex>

    //   {/* PAYMENT SUMMARY */}
    //   <Box
    //     position="fixed"
    //     bottom={{ base: "calc(4.5rem + env(safe-area-inset-bottom))", md: "4" }}
    //     left={{ base: "0", md: "50%" }}
    //     transform={{ base: "none", md: "translateX(-50%)" }}
    //     w={{ base: "full", md: "min(720px, calc(100% - 2rem))" }}
    //     bg="white"
    //     borderTop="1px solid"
    //     borderColor="green.200"
    //     roundedTop={{ base: "2xl", md: "2xl" }}
    //     roundedBottom={{ base: "none", md: "2xl" }}
    //     px="4"
    //     py="3"
    //     shadow="xl"
    //     zIndex="20"
    //   >
    //     <Flex align="center" justify="space-between" gap="3" wrap="wrap">
    //       <Box>
    //         <Small color="green.700">Payment Summary</Small>
    //         <Text
    //           color="green.900"
    //           fontWeight="700"
    //           fontSize={{ base: "md", md: "lg" }}
    //         >
    //           {selectedPlans.length} plan(s) • P{" "}
    //           {totalSelectedAmount.toLocaleString("en-US", {
    //             minimumFractionDigits: 2,
    //           })}
    //         </Text>
    //       </Box>
    //       <PrimaryMdButton
    //         disabled={selectedPlans.length === 0 || isCheckingOut}
    //         minW="180px"
    //         onClick={handleCheckout}
    //       >
    //         {isCheckingOut ? "Processing..." : "Continue to Payment"}
    //       </PrimaryMdButton>
    //     </Flex>
    //   </Box>
    // </Box>
    <MessageDialogProvider>
      <Box
        mt={{ base: 32, md: 32 }}
        mb={{ base: 32, md: 32 }}
        px={{ base: 4, md: 8 }}
        maxW="7xl"
        mx="auto"
      >
        <Box
          p={{ base: "4", md: "6" }}
          rounded="2xl"
          border="1px solid"
          borderColor="gray.200"
          // bg="green.50"
        >
          <H4>Pay My Plan</H4>
          <Body fontWeight="700" color="green.800" mt="1">
            Account No.: SPLPI-22-000021
          </Body>
          <Body color="green.700" mt="2">
            Select one or more active plans to prepare your payment in one go.
          </Body>

          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap="3"
            mt="4"
          >
            <Box
              bg="white"
              rounded="xl"
              p="3"
              border="1px solid"
              borderColor="gray.200"
            >
              <Small color="green.700">Active Plans</Small>
              <Text color="green.900" fontWeight="700" fontSize="xl">
                {activePlans.length}
              </Text>
            </Box>
            <Box
              bg="white"
              rounded="xl"
              p="3"
              border="1px solid"
              borderColor="gray.200"
            >
              <Small color="green.700">Selected</Small>
              <Text color="green.900" fontWeight="700" fontSize="xl">
                {selectedPlans.length}
              </Text>
            </Box>
            <Box
              bg="white"
              rounded="xl"
              p="3"
              border="1px solid"
              borderColor="gray.200"
            >
              <Small color="green.700">Amount to Pay</Small>
              <Text color="green.900" fontWeight="700" fontSize="xl">
                P{" "}
                {totalSelectedAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </Box>
          </Grid>
        </Box>
        <Box>
          {/* <ListOfPlans
            plans={[
              {
                lpaNumber: "L25048596I",
                planDescription: "ST. GEORGE",
                mode: "ANNUAL",
                term: 5.0,
                planClass: "REGULAR ACCOUNT",
                accountClass: "REGULAR ACCOUNT",
                planCode: "LG5A10",
                contractPrice: 53000.0,
                installmentAmount: 10600.0,
                totalAmountPayable: 53000.0,
                effectivityDate: new Date("2025-04-05T00:00:00"),
                newEffectivityDate: new Date("2025-04-05T00:00:00"),
                branch: "ZAMBOANGA EAST",
                cfpNumber: null,
                cfpDate: null,
                isServiceOnly: false,
                isInsured: true,
                accountStatus: "ACTIVE",
                terminationStatus: "NOT YET TERMINATED",
                salesAgent1: "MARK KEVIN LEE",
                salesAgent2: "MARK KEVIN LEE",
                beneficiaries: [],
                statementOfAccount: {
                  lpaNumber: "L25048596I",
                  dueDate: new Date("2025-05-05T00:00:00"),
                  term: 5,
                  mode: "ANNUAL",
                  installmentNumber: 1,
                  installmentAmount: 10600.0,
                  totalAmountPayable: 53000.0,
                  totalPayments: 0,
                  balance: 53000.0,
                  terminationValue: 0,
                  paymentRecords: [],
                },
              },
            ]}
          /> */}
        </Box>
      </Box>
    </MessageDialogProvider>
  );
};

export default PayMyPlan;
