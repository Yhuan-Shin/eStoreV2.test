"use client";
import { Box, Flex } from "@chakra-ui/react";
import { Carousel } from "@/components/ui/carousel";
import {
  BaseText,
  Body,
  DynamicButton,
  H2,
  PrimaryLgButton,
  PrimaryMdButton,
} from "st-peter-ui";

const Location = () => {
  const slideData = [
    {
      title: "Chapel 1",
      button: "Explore Component",
      src: "/images/chapels/Guiguinto.jpg",
    },
    {
      title: "Chapel 2",
      button: "Explore Component",
      src: "/images/chapels/Iloilo.jpg",
    },
    {
      title: "Chapel 3",
      button: "Explore Component",
      src: "/images/chapels/Masbate.jpg",
    },
    {
      title: "Chapel 4",
      button: "Explore Component",
      src: "/images/chapels/Surigao.jpg",
    },
  ];
  return (
    <Box
      as="section"
      mt={8}
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 8 }}
      bg="gray.50"
    >
      <Box maxW="7xl" w="full" m="auto">
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: 6, md: 8 }}
          align="center"
          w="full"
        >
          <Box
            position="relative"
            w={{ base: "100vw", sm: "100vw", md: "full" }}
            maxW={{ base: "100vw", md: "600px", lg: "700px" }}
            minW={0}
            mb={{ base: 6, lg: 0 }}
            overflowX={{ base: "auto", md: "hidden" }}
            overflowY="hidden"
            // sx={{
            //   WebkitOverflowScrolling: "touch",
            //   msOverflowStyle: "none",
            //   scrollbarWidth: "none",
            //   "&::-webkit-scrollbar": { display: "none" },
            // }}
          >
            <Carousel slides={slideData} />
          </Box>

          <Box
            p={{ base: 4, md: 6 }}
            display="flex"
            flexDir="column"
            justifyContent="center"
            w={{ base: "full", md: "lg" }}
          >
            <Flex
              flexDirection={{ base: "column", md: "column" }}
              w="full"
              m="auto"
            >
              <Box mb={4}>
                <BaseText
                  fontSize={{ base: "2xl", md: "4xl" }}
                  fontWeight="bold"
                >
                  We&apos;re Near{" "}
                  <Box as="span" color="green.600">
                    {" "}
                    You
                  </Box>
                </BaseText>
              </Box>

              <Box w={{ base: "100%", md: "md" }}>
                <Body>
                  Visit us at our convenient location, easily accessible for all
                  your needs. Our chapel is situated in the heart of the city,
                  providing a peaceful and welcoming environment for families
                  and guests. Whether you’re planning a visit or need
                  assistance, our friendly staff is always ready to help.
                </Body>
              </Box>
            </Flex>

            <Box mt={8} w="full">
              <PrimaryMdButton
                w={{ base: "full", md: "auto" }}
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/search/St+Peter+Chapels/@14.6564517,121.0245058,15z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
                    "_blank",
                  )
                }
              >
                GO TO MAP
              </PrimaryMdButton>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Location;
