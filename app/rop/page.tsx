"use client";

import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "st-peter-ui";

import { RopPage } from "osp-chakra-reusable-components";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Container from "@/components/ui/container";

const page = () => {
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Return of Premium",
      href: "/rop",
    },
  ];
  const router = useRouter();
  return (
    // <Flex
    //   p={8}
    //   mt={{ base: 8, md: 24 }}
    //   alignItems="center"
    //   justifyContent="center"
    // >
    //   <RopPage onClick={() => router.push("/rop-payout")} />
    // </Flex>
    <Container>
      <Box maxW={"7xl"} mx={"auto"}>
        <Box
          display={{ base: "block", md: "none" }}
          px={{ base: 4, md: 0 }}
          mb={{ base: 4, md: 0 }}
        >
          <Button
            variant="ghost"
            size="md"
            onClick={() => router.back()}
            px={0}
          >
            <FaArrowLeft color="#177D54" />
            Back
          </Button>
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <Breadcrumb items={breadcrumbItems} />
        </Box>{" "}
        <Box px={{ base: 4, md: 0 }}>
          <RopPage onClick={() => router.push("/rop-payout")} />
        </Box>
      </Box>
    </Container>
  );
};

export default page;
