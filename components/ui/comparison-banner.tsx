import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { PrimaryMdButton } from "st-peter-ui";

interface ComparisonBannerProps {
  compareList: string[];
  setShowAlert: (show: boolean) => void;
  setCompareList: (list: string[]) => void;
}
const ComparisonBanner = ({
  compareList,
  setShowAlert,
  setCompareList,
}: ComparisonBannerProps) => {
  const router = useRouter();
  return (
    <>
      {compareList.length > 0 && (
        <Box
          position="fixed"
          bottom={{ base: 8, md: 16, lg: 0 }}
          left={0}
          right={0}
          height={{ base: 150, md: "auto" }}
          color="white"
          bg="green.700"
          py={5}
          px={6}
          shadow="2xl"
          zIndex={50}
        >
          <Flex
            maxW="7xl"
            mx="auto"
            flexDirection={{ base: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            gap={4}
          >
            <Flex alignItems="center" gap={4} w="100%">
              {/*  */}
              <Box w="100%">
                <Text fontWeight="medium">
                  {compareList.length}{" "}
                  {compareList.length === 1 ? "plan" : "plans"} selected for
                  comparison
                </Text>
                <Flex justifyContent="space-between" gap={4} w="100%" mt={2}>
                  <PrimaryMdButton onClick={() => setCompareList([])}>
                    Clear all
                  </PrimaryMdButton>
                  <PrimaryMdButton
                    disabled={compareList.length > 3}
                    onClick={() => {
                      if (compareList.length < 2) {
                        setShowAlert(true);
                      } else if (compareList.length > 1) {
                        setShowAlert(false);
                        router.push(
                          `/plan-comparison/${compareList.join(",")}`,
                        );
                      }
                    }}
                  >
                    Compare plan
                  </PrimaryMdButton>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default ComparisonBanner;
