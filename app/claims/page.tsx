"use client";

import React from "react";
import { FileClaimPage } from "osp-chakra-reusable-components";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "st-peter-ui";
import { FaArrowLeft } from "react-icons/fa";
import Container from "@/components/ui/container";

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Claims",
    href: "/claims",
  },
];
const Claims = () => {
  const router = useRouter();
  return (
    <Container>
      <Box maxW={"7xl"} mx={"auto"}>
        <Box display={{ base: "block", md: "none" }} px={{ base: 4, md: 0 }}>
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
        <Box p={{ base: 4, md: 0 }}>
          <FileClaimPage
            onClickHome={function (): void {
              router.push("/");
            }}
            onClickTrack={() => {
              router.push("/transaction/PY-9183982");
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Claims;
