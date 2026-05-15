"use client";

import ProductCard from "@/components/ui/card";
import ComparisonBanner from "@/components/ui/comparison-banner";
import Error from "@/components/ui/error";

import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BaseText, Body, H2 } from "st-peter-ui";

export default function ProductLandingPage({
  groupedPlans,
}: {
  groupedPlans: any[];
}) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const alertRef = useRef<HTMLDivElement>(null);

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((p) => p !== planDesc)
        : [...prev, planDesc],
    );
  };

  useEffect(() => {
    if (!showAlert) return;

    alertRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <section>
      {showAlert && (
        <Box
          ref={alertRef}
          position="fixed"
          top={4}
          left="50%"
          transform="translateX(-50%)"
          zIndex={1000}
          w={{ base: "90%", md: "50%" }}
        >
          <Error title="Please select at least 2 plans to compare" />
        </Box>
      )}

      <Box bg="gray.50" p="8">
        <Flex textAlign="center" flexDirection="column" gap={4}>
          <BaseText fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            Popular Plans
          </BaseText>

          <Body>
            Choose a plan that fits your needs. Flexible terms and affordable
            prices.
          </Body>
        </Flex>

        <Flex
          mt="8"
          gap={{ base: 8, lg: 16 }}
          w="full"
          overflowX={{ base: "auto", lg: "visible" }}
          justifyContent={{ base: "start", lg: "center" }}
        >
          {groupedPlans.map((g, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:-translate-y-2"
            >
              <ProductCard
                compareList={compareList}
                toggleCompare={toggleCompare}
                variant="plan"
                image={g.img}
                title={g.planDesc}
                description={g.casketDesc}
                terms={g.terms}
                onCompare={() => toggleCompare(g.planDesc)}
              />
            </div>
          ))}
        </Flex>
      </Box>

      <Box p="8" mt={8}>
        <Flex textAlign="center" flexDirection="column" gap={4}>
          <BaseText fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            Memorial Parks
          </BaseText>

          <Body>Beautiful locations for lasting memories.</Body>
        </Flex>

        <Flex
          mt="8"
          gap={{ base: 8, lg: 16 }}
          overflowX={{ base: "auto", lg: "visible" }}
          justifyContent={{ base: "start", lg: "center" }}
        >
          <ProductCard
            variant="memorial"
            title="Guiguinto, Bulacan"
            image="/images/memorial-park/memorial-park-1.jpg"
            address="Guiguinto Memorial Gardens - St. Peter Memorial Gardens"
          />

          <ProductCard
            variant="memorial"
            title="Legaspi City, Albay"
            image="/images/memorial-park/memorial-park-2.jpg"
            address="Taysan Hills, Brgy. 56-Taysan, Legaspi City"
          />
        </Flex>
      </Box>

      <ComparisonBanner
        compareList={compareList}
        setCompareList={setCompareList}
        setShowAlert={setShowAlert}
      />
    </section>
  );
}
