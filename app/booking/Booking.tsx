import React from "react";
import { BookingForm } from "osp.cis.nextjs.components";
import { Box, Flex } from "@chakra-ui/react/";
import { RopPage } from "osp-chakra-reusable-components";

const Booking = () => {
  return (
    <Flex
      p={8}
      mt={24}
      alignItems="center"
      justifyContent="center"
      maxW="7xl"
      mx="auto"
    >
      <BookingForm />
    </Flex>
  );
};

export default Booking;
