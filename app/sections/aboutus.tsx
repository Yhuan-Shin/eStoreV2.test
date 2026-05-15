"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Testimonials, { TestimonialItem } from "@/components/ui/testimonials";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
// import { base } from "motion/react-client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { BaseText, Body, H2, H3 } from "st-peter-ui";

const testimonials: TestimonialItem[] = [
  {
    quote:
      "I believe that St. Peter is a good and credible company that delivers their services with excellence...",
    name: "Mrs. Anadina C. Felomino",
    branch: "Koronadal Branch",
    planholderSince: "St. Peter Planholder since 1995",
  },
  {
    quote:
      "I decided to buy a policy for me and my husband because ever since I was always interested in insurance...",
    name: "Mila T. Garcia",
    branch: "Butuan East and Butuan West Branches",
    planholderSince: "St. Peter Planholder since 1999",
  },
  {
    quote:
      "Ako po si Yolanda Laberon Eclipse... Being a planholder feels good! Now, I got 3 St. Peter Life Plans...",
    name: "Yolanda L. Eclipse",
    branch: "Catbalogan Branch",
    planholderSince: "St. Peter Planholder since 2005",
  },
  {
    quote:
      "I’ve been a member for almost 12 years and I already started to receive my Return of Premium...",
    name: "Juanita C. Intong",
    branch: "Mandaue Branch",
    planholderSince: "St. Peter Planholder since 2007",
  },
  {
    quote:
      "Back then, I was not a believer in pre-need plans... Being a planholder of St. Peter Life Plan gives me security...",
    name: "Jocelyn S. Ongdico",
    branch: "Meycauayan Branch",
    planholderSince: "St. Peter Planholder since 2010",
  },
  {
    quote:
      "I decided to buy a plan because nowadays, it is very expensive to die... I even bought 2 more life plans...",
    name: "Cristina Jumawan",
    branch: "Dumaguete Branch",
    planholderSince: "St. Peter Planholder since 2017",
  },
];

const AboutUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section className="overflow-hidden">
      <Box w="full">
        <Flex
          ref={ref}
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          gap={{ base: 8, md: 32 }}
          mb={16}
          px={{ base: 4, md: 8 }}
          py={{ base: 8, md: 12 }}
        >
          {/* Left Text */}
          <Flex
            p={4}
            textAlign={{ base: "center", md: "left" }}
            flexDirection="column"
            gap={4}
          >
            <BaseText fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
              Serving the Filipino
            </BaseText>
            <BaseText
              fontSize={{ base: "2xl", md: "4xl" }}
              color="#177D54"
              fontWeight="bold"
            >
              Since 1980
            </BaseText>
            <Box mx="auto" maxW={{ base: "90%", md: "400px" }}>
              <Body>
                We are a trusted Pre-Need DeathCare company, serving the
                Filipino public for over 30 years with professional and
                traditional memorial services and affordable life plans for
                every family.
              </Body>
            </Box>
          </Flex>

          {/* Right Stats */}
          <Flex
            direction={{ base: "row", md: "column" }}
            gap={{ base: 8, md: 4 }}
            justify="center"
            mt={{ base: 4, md: 0 }}
          >
            <Flex direction="column" align="center">
              <Text fontSize="3xl" color="#177D54" fontWeight="bold">
                {inView && <CountUp start={0} end={280} duration={2.5} />}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                Chapels
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Text fontSize="3xl" color="#177D54" fontWeight="bold">
                {inView && <CountUp start={0} end={200} duration={2.5} />}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                Branches
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Testimonials */}
        <Box p={8}>
          <Flex direction="column" align="center" textAlign="center" mb={8}>
            <BaseText fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
              Testimonials
            </BaseText>
            <Box
              h="5px"
              w="100px"
              bg="green.700"
              borderRadius="full"
              mt={2}
              mb={4}
            />
          </Flex>

          <Flex justify="center" align="center" mb={16}>
            {/* <InfiniteMovingCards
              items={testimonials}
              direction="left"
              speed="slow"
            /> */}
            <Testimonials testimonials={testimonials} />
          </Flex>
        </Box>
      </Box>
    </section>
  );
};

export default AboutUs;
