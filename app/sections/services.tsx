"use client";

import { Box, Button, Grid, HStack, Image, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BaseText } from "st-peter-ui";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Apply for Claim Benefits",
    description:
      "Please check your policy details, contact a Sales Agent, or visit your branch of account for more information.",
    image: "/images/services/claim-benefits.jpg",
    href: "/claims",
    buttonText: "Apply Now",
    featured: true,
    dark: false,
  },
  {
    title: "Return of Premium",
    description:
      "Please check your policy details, contact a Sales Agent, or visit your branch of account for more information.",
    href: "/login",
    buttonText: "Start Request",
    featured: false,
    dark: true,
  },
  {
    title: "Track Your Request",
    description:
      "To track your request, please have your reference number ready.",
    href: "/transaction",
    buttonText: "Track Request",
    featured: false,
    dark: true,
  },
  {
    title: "Memorial Service Booking Assistance",
    description:
      "To proceed, please have your life plan contact details ready.",
    image: "/images/services/request-service.jpg",
    href: "/booking",
    buttonText: "Book Service",
    featured: true,
    dark: false,
  },
];

const Services = () => {
  const router = useRouter();

  return (
    <Box
      as="section"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 8 }}
      overflow="hidden"
    >
      <VStack gap={3} mb={{ base: 10, md: 14 }} textAlign="center">
        <BaseText
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          lineHeight="shorter"
          maxW="4xl"
        >
          Get instant access to online services{" "}
        </BaseText>
        <BaseText color="gray.600" fontSize={{ base: "sm", md: "md" }}>
          Access claims, requests, memorial services, and policy-related
          assistance with a fast and convenient digital experience.
        </BaseText>
      </VStack>

      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        gap={6}
        maxW="7xl"
        mx="auto"
      >
        {services.map((service, index) => {
          const isFeatured = service.featured;

          return (
            <Box
              key={index}
              position="relative"
              overflow="hidden"
              cursor="pointer"
              role="group"
              minH={{ base: "320px", md: "340px" }}
              gridColumn={{
                base: "span 1",
                lg: isFeatured ? "span 2" : "span 1",
              }}
              bg={
                service.dark
                  ? "linear-gradient(135deg, #177D54 0%, #116B47 100%)"
                  : "white"
              }
              color={service.dark ? "white" : "gray.900"}
              borderRadius="32px"
              border="1px solid"
              borderColor={service.dark ? "whiteAlpha.200" : "gray.200"}
              boxShadow="0 10px 40px rgba(0,0,0,0.06)"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              }}
              onClick={() => router.push(service.href)}
            >
              {/* Background Glow */}
              <Box
                position="absolute"
                top="-80px"
                right="-80px"
                w="220px"
                h="220px"
                bg={service.dark ? "whiteAlpha.100" : "rgba(23, 125, 84, 0.08)"}
                filter="blur(20px)"
                borderRadius="full"
              />

              <Box
                position="relative"
                zIndex={2}
                h="full"
                p={{ base: 6, md: 8 }}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box maxW={{ base: "full", lg: isFeatured ? "60%" : "full" }}>
                  <BaseText
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="bold"
                    lineHeight="shorter"
                    mb={4}
                    color={service.dark ? "white" : "gray.900"}
                  >
                    {service.title}
                  </BaseText>

                  <BaseText
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="tall"
                    color={service.dark ? "whiteAlpha.800" : "gray.600"}
                  >
                    {service.description}
                  </BaseText>
                </Box>

                <HStack mt={8}>
                  <Button
                    size="md"
                    rounded="full"
                    px={6}
                    bg={service.dark ? "white" : "#177D54"}
                    color={service.dark ? "#177D54" : "white"}
                    fontWeight="semibold"
                    transition="all 0.2s ease"
                    _hover={{
                      transform: "translateX(2px)",
                      opacity: 0.9,
                    }}
                  >
                    {service.buttonText}
                  </Button>

                  <Box
                    transition="transform 0.2s ease"
                    _groupHover={{
                      transform: "translateX(4px)",
                    }}
                  >
                    <ArrowRight size={18} />
                  </Box>
                </HStack>
              </Box>

              {service.image && (
                <Image
                  src={service.image}
                  alt={service.title}
                  position="absolute"
                  right={{ base: "-20px", lg: "20px" }}
                  bottom="0"
                  w={{ base: "160px", md: "240px", lg: "280px" }}
                  objectFit="contain"
                  opacity={0.95}
                  transition="all 0.35s ease"
                  _groupHover={{
                    transform: "scale(1.04) translateY(-4px)",
                  }}
                  pointerEvents="none"
                  display={{ base: "none", md: "block" }}
                />
              )}
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Services;
