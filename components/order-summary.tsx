// OrderSummary component - updated to handle single or multiple items
"use client";
import React from "react";
import { IPlans } from "@/types/product";
import { Text, Grid, GridItem, Image, Flex, Box } from "@chakra-ui/react";
import { Body, H3, H4 } from "st-peter-ui";
import { CartItem } from "@/types/cartItem";
import { Heading, HStack, VStack } from "@chakra-ui/react";

const getModeLabel = (mode: string) => {
  const modeMap: Record<string, string> = {
    M: "Monthly",
    Q: "Quarterly",
    S: "Semi-Annual",
    A: "Annual",
    C: "Cash",
  };
  return modeMap[mode] || mode;
};

const OrderSummary: React.FC<{ cartItems?: CartItem[] }> = ({ cartItems }) => {
  if (!cartItems || cartItems.length === 0) return null;

  const bg = "white";
  const muted = "gray.600";

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total),
    0,
  );

  return (
    <Box>
      <Text fontWeight="semibold" fontSize="2xl" mb={4}>
        Order Summary
      </Text>

      <VStack gap={6} align="stretch">
        {cartItems.map((item, idx) => (
          <Box key={idx} bg={bg} borderRadius="md" p={4}>
            <Grid
              templateColumns={{ base: "1fr", md: "280px 1fr" }}
              gap={8}
              alignItems="center"
            >
              <GridItem w="full" maxW={{ md: "280px" }}>
                <Image
                  src={`/images/plan-images/${item.planDesc}.jpg`}
                  alt={item.planDesc}
                  borderRadius="md"
                  objectFit="cover"
                  w="100%"
                  h={{ base: "220px", md: "260px" }}
                />
              </GridItem>

              <GridItem>
                <HStack justify="space-between" align="start" mb={4}>
                  <VStack align="start" gap={4}>
                    <Heading as="h3" size="md" color={muted}>
                      {item.planDesc}
                    </Heading>
                    <Text color={muted}>Mode</Text>
                  </VStack>

                  <VStack align="end" gap={4}>
                    <Text fontWeight="semibold">
                      ₱
                      {Number(item.price ?? item.ipInstAmt ?? 0).toLocaleString(
                        "en-PH",
                        {
                          minimumFractionDigits: 2,
                        },
                      )}
                    </Text>
                    <Text color={muted}>{getModeLabel(item.mode)}</Text>
                  </VStack>
                </HStack>

                {/* <Box h="1px" bg="gray.200" my={3} /> */}

                <HStack justify="space-between">
                  <Text color={muted}>Quantity</Text>
                  <Text color={muted}>{item.quantity}</Text>
                </HStack>

                <HStack justify="space-between" pt={3}>
                  <Text fontWeight="semibold">Subtotal</Text>
                  <Text fontWeight="semibold">
                    ₱
                    {Number(item.total).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </HStack>
              </GridItem>
            </Grid>
          </Box>
        ))}

        <Box p={4} bg={bg} borderTop="2px solid black">
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">
              Grand Total
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              ₱
              {grandTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OrderSummary;
