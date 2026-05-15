"use client";

import Search from "@/components/ui/search";
import { Box, Flex, Span, Stack, VStack, chakra } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  H1,
  H3,
  Body,
  DynamicButton,
  BuyNowButton,
  BaseText,
} from "st-peter-ui";
import { useDemoAuth } from "@/components/ui/demo-auth";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";

const Hero = () => {
  const { logout } = useDemoAuth();
  useEffect(() => {
    logout();
  }, [logout]);

  const router = useRouter();
  const planFeatures = [
    // "Lifetime Coverage",
    "Flexible Maturity",
    "Guaranteed Returns",
    "Family Protection",
  ];

  return (
    <Box
      position="relative"
      h={{ base: "100vh", md: "100vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <chakra.video
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="center"
        autoPlay
        loop
        muted
        playsInline
        pointerEvents="none"
      >
        <source src="/video/hero-bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </chakra.video>

      <Box position="absolute" inset={0} bg="blackAlpha.600" h="100%" />
      <Box zIndex={2} maxW={{ base: "full", md: "7xl" }} w={{ base: "100%" }}>
        <VStack
          alignItems="start"
          gap={{ base: 8 }}
          py={{ base: 0, md: 0 }}
          px={{ base: 4, md: 0 }}
          color="white"
        >
          <BaseText
            fontSize={{ base: "3xl", md: "5xl" }}
            color="white"
            fontWeight="bold"
          >
            Para sa Magandang Kinabukasan: Bawat Pilipino, Dapat may
            <Span className="text-[#177D54]">St. Peter Life Plan</Span>.
          </BaseText>
          <BaseText
            fontSize={{ base: "3xl", md: "5xl" }}
            color="white"
            fontWeight="bold"
          >
            Protect your loved ones with a plan that cares.
          </BaseText>
          <Box mt={4} w="full" maxW={{ md: "2xl" }}>
            <Search />
          </Box>

          <Stack
            alignItems={{ base: "center", md: "center" }}
            direction={{ base: "row", md: "row" }}
            w={{ base: "full" }}
          >
            {/* <Body color="white">Plan Features:</Body> */}
            {planFeatures.map((feature, i) => (
              <Box
                key={i}
                as="button"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={{ base: 2, md: 4 }}
                py={{ base: 2, md: 3 }}
                m={{ base: "auto", md: 0 }}
                maxW={{ base: "full", md: "240px" }}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                layerStyle="outline.solid"
                color="white"
                borderRadius="xl"
                borderColor="white"
                cursor="pointer"
                fontSize={{ base: "sm", md: "md" }}
                _hover={{ bg: "whiteAlpha.200" }}
                aria-label={`${feature}`}
              >
                <BaseText color="white" fontSize={{ base: "xs", md: "md" }}>
                  {feature}
                </BaseText>
              </Box>
            ))}
          </Stack>

          <Flex
            // direction={{ base: "row", md: "row" }}
            justify={{ base: "space-between", md: "flex-start" }}
            gap={4}
            w={{ base: "full" }}
          >
            {/* <DynamicButton label="PAY MY PLAN" /> */}

            <DynamicButton
              label="PAY MY PLAN"
              onClick={() => router.push("/pay-my-plan")}
            />
            <BuyNowButton onClick={() => router.push("/plans")} />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default Hero;
