"use client";

import { Box, VStack, HStack, Text, Icon } from "@chakra-ui/react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "@chakra-ui/react";
import { useState } from "react";
import {
  FaUser,
  FaFileAlt,
  FaCreditCard,
  FaClipboard,
  FaFolder,
  FaCheckCircle,
  FaFile,
  FaClock,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const [showLabels, setShowLabels] = useState(false);

  const sidebarItems = [
    { icon: FaUser, label: "My Account", href: "/account" },
    {
      icon: FaFileAlt,
      label: "Account Details",
      submenu: [
        { label: "Profile", href: "/account/details/personal" },
        { label: "Account Summary ", href: "/account/details/contact" },
        {
          label: "Certificate of Full Payment ",
          href: "/account/details/contact",
        },
      ],
    },
    { icon: FaCreditCard, label: "Pay My Plan", href: "/account/pay-my-plan" },
    {
      icon: FaClipboard,
      label: "Auto-Payment Enrollment",
      href: "/account/auto-payment",
    },
    {
      icon: FaFolder,
      label: "Request Plan Documents",
      href: "/account/request-documents",
    },
    {
      icon: FaFolder,
      label: "Manage My Plan",
      submenu: [
        {
          label: "Update My Information",
          href: "/account/manage-plan/update-info",
        },
        { label: "Reinstate My Plan", href: "/reinstatement" },
        {
          label: "Plan Termination Value",
          href: "/account/manage-plan/termination-value",
        },
        { label: "Assign My Plan", href: "/account/manage-plan/assign" },
        { label: "Cancel My Plan", href: "/account/manage-plan/cancel" },
        { label: "Change of Mode", href: "/change-mode" },
        { label: "Transfer My Plan", href: "/account/manage-plan/transfer" },
        {
          label: "Update My Beneficiary",
          href: "/account/manage-plan/update-beneficiary",
        },
      ],
    },
    {
      icon: FaCheckCircle,
      label: "Claim Applications",
      submenu: [
        // { label: "Dismemberment", href: "/account/claims/file" },
        { label: "File A Claim", href: "/claims" },
      ],
    },
    { icon: FaFile, label: "ROP Application", href: "/rop" },
    {
      icon: FaClipboard,
      label: "Application Status",
      href: "/account/status",
    },
    {
      icon: FaClock,
      label: "Transaction History",
      href: "/account/transactions",
    },
    { icon: FaSignOutAlt, label: "Sign Out", href: "/logout" },
  ];

  return (
    <Box
      as="aside"
      boxShadow="md"
      w="16"
      _hover={{ w: "64" }}
      transition="all 0.3s"
      overflow="hidden"
      rounded="xl"
      paddingY={4}
      onMouseEnter={() => setShowLabels(true)}
      onMouseLeave={() => setShowLabels(false)}
    >
      <VStack align="stretch" gap={1} mt={2}>
        {sidebarItems.map((item, idx) =>
          item.submenu ? (
            // Dropdown Menu Item
            <MenuRoot key={idx}>
              <MenuTrigger asChild>
                <HStack
                  px={4}
                  py={3}
                  cursor="pointer"
                  _hover={{ bg: "gray.300" }}
                  gap={4}
                  w="full"
                >
                  <Icon as={item.icon} boxSize={5} color="green.600" />
                  <HStack gap={2} flex={1}>
                    <Text
                      color="black"
                      fontWeight="medium"
                      opacity={showLabels ? 1 : 0}
                      transition="all 0.3s"
                      whiteSpace="nowrap"
                    >
                      {item.label}
                    </Text>
                    <Icon
                      as={FaChevronDown}
                      boxSize={3}
                      color="green.600"
                      opacity={showLabels ? 1 : 0}
                      transition="all 0.3s"
                    />
                  </HStack>
                </HStack>
              </MenuTrigger>
              <MenuContent>
                {item.submenu.map((submenuItem, submenuIdx) => (
                  <MenuItem
                    key={submenuIdx}
                    value={submenuItem.label}
                    onClick={() => router.push(submenuItem.href)}
                  >
                    {submenuItem.label}
                  </MenuItem>
                ))}
              </MenuContent>
            </MenuRoot>
          ) : (
            // Regular Menu Item
            <HStack
              key={idx}
              px={4}
              py={3}
              cursor="pointer"
              _hover={{ bg: "gray.300" }}
              onClick={() => router.push(item.href)}
              gap={4}
            >
              <Icon as={item.icon} boxSize={5} color="green.600" />

              <Text
                color="black"
                fontWeight="medium"
                opacity={showLabels ? 1 : 0}
                transition="all 0.3s"
                whiteSpace="nowrap"
              >
                {item.label}
              </Text>
            </HStack>
          ),
        )}
      </VStack>
    </Box>
  );
};

export default SideBar;
