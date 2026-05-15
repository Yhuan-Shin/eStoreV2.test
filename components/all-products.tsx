"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { IPlans } from "@/types/product";
import Error from "@/components/ui/error";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Tabs,
} from "@chakra-ui/react";
import Section from "@/components/ui/section";
import ComparisonBanner from "@/components/ui/comparison-banner";
import { Body, H3 } from "st-peter-ui";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "st-peter-ui";
import { FaArrowLeft } from "react-icons/fa";
import Container from "./ui/container";

type GroupedPlan = {
  planDesc: string;
  casketDesc: string;
  img: string;
  contractPrice: string;
  terms: {
    mode: string;
    planTerm: number;
    price: string;
  }[];
};

type Props = {
  plans: IPlans[];
  traditionalGroups: GroupedPlan[];
  cremationGroups: GroupedPlan[];
};
const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value));

const groupPlansByProduct = (
  plans: IPlans[],
  productCode: string,
): GroupedPlan[] => {
  const filtered = plans.filter((p) => p.productCode === productCode);
  const map = new Map<string, GroupedPlan>();

  filtered.forEach((p) => {
    const key = p.planDesc;

    if (!map.has(key)) {
      map.set(key, {
        planDesc: p.planDesc,
        casketDesc: p.casketDesc,
        img: `/images/plan-images/${p.planDesc}.jpg`,
        contractPrice: formatCurrency(p.contractPrice),
        terms: [],
      });
    }

    const entry = map.get(key)!;

    const exists = entry.terms.some(
      (t) => t.planTerm === p.planTerm && t.mode === p.mode,
    );

    if (!exists) {
      entry.terms.push({
        mode: p.mode,
        planTerm: p.planTerm,
        price: formatCurrency(p.ipInstAmt),
      });
    }
  });

  return Array.from(map.values());
};

const AllProducts = ({ plans }: Props) => {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const alertRef = useRef<HTMLDivElement | null>(null);

  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    if (!showAlert) return;

    alertRef.current?.scrollIntoView({ behavior: "smooth" });

    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const traditionalGroups = useMemo(
    () => groupPlansByProduct(plans, "LP"),
    [plans],
  );

  const cremationGroups = useMemo(
    () => groupPlansByProduct(plans, "CP"),
    [plans],
  );

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((desc) => desc !== planDesc)
        : [...prev, planDesc],
    );
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Life Plans", href: "/plans" },
  ];

  return (
    <Container>
      <Flex direction="column" w="full">
        {showAlert && (
          <Box
            ref={alertRef}
            position="fixed"
            top={{ base: 20, md: 24 }}
            left="50%"
            transform="translateX(-50%)"
            zIndex={1000}
            w={{ base: "90%", md: "50%" }}
          >
            <Error title="Please select at least 2 plans to compare" />
          </Box>
        )}

        <Tabs.Root defaultValue="traditional" variant="enclosed">
          <Box mb={8}>
            <Box maxW="7xl" mx="auto">
              <Box
                display={{ base: "block", md: "none" }}
                px={{ base: 4, md: 0 }}
                mb={{ base: 4, md: 0 }}
              >
                <Button variant="ghost" onClick={() => router.back()} px={0}>
                  <FaArrowLeft color="#177D54" />
                  Back
                </Button>
              </Box>

              <Box display={{ base: "none", md: "block" }}>
                <Breadcrumb items={breadcrumbItems} />
              </Box>

              <Grid
                templateColumns={{ base: "1fr", md: "1fr auto" }}
                alignItems="center"
                gap={{ base: 8, md: 0 }}
              >
                <GridItem px={{ base: 4, md: 0 }}>
                  <H3>Our Life Plans</H3>
                  <Body>Secure your family's future with peace of mind</Body>
                </GridItem>

                <GridItem px={{ base: 4, md: 0 }} justifySelf="start">
                  <Tabs.List bg="gray.100" borderRadius="full" p={1}>
                    <Tabs.Trigger
                      value="traditional"
                      px={{ base: 4, md: 5 }}
                      py={{ base: 2 }}
                      fontWeight="semibold"
                      borderRadius="full"
                      color="gray.600"
                      fontSize={{ base: "sm", md: "md" }}
                      _selected={{ color: "white", bg: "#109447" }}
                    >
                      Traditional
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="cremation"
                      px={{ base: 4, md: 5 }}
                      py={{ base: 2 }}
                      fontWeight="semibold"
                      borderRadius="full"
                      color="gray.600"
                      fontSize={{ base: "sm", md: "md" }}
                      _selected={{ color: "white", bg: "#109447" }}
                    >
                      Cremation
                    </Tabs.Trigger>
                  </Tabs.List>
                </GridItem>
              </Grid>
            </Box>
          </Box>

          {/* CONTENT - SAME DESIGN */}
          <Tabs.Content value="traditional">
            <Box px={{ base: 4, md: 8 }} maxW="7xl" mx="auto">
              {traditionalGroups.map((g, i) => (
                <Section
                  key={g.planDesc}
                  compareList={compareList}
                  toggleCompare={toggleCompare}
                  image={g.img}
                  planDesc={g.planDesc}
                  description={g.casketDesc}
                  contractPrice={g.contractPrice}
                  planTerm={g.terms?.[0]?.planTerm ?? 0}
                  terms={g.terms}
                  reverse={i % 2 === 1}
                />
              ))}
            </Box>
          </Tabs.Content>

          <Tabs.Content value="cremation">
            <Box px={{ base: 4, md: 8 }} maxW="7xl" mx="auto">
              {cremationGroups.map((g, i) => (
                <Section
                  key={g.planDesc}
                  compareList={compareList}
                  toggleCompare={toggleCompare}
                  image={g.img}
                  planDesc={g.planDesc}
                  description={g.casketDesc}
                  contractPrice={g.contractPrice}
                  planTerm={g.terms?.[0]?.planTerm ?? 0}
                  terms={g.terms}
                  reverse={i % 2 === 1}
                />
              ))}
            </Box>
          </Tabs.Content>
        </Tabs.Root>

        <ComparisonBanner
          compareList={compareList}
          setCompareList={setCompareList}
          setShowAlert={setShowAlert}
        />
      </Flex>
    </Container>
  );
};

export default AllProducts;
