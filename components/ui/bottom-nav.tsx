"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { BiSolidCoinStack } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";

import {
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import ShoppingCart from "./shopping-cart";
import { useDemoAuth } from "./demo-auth";

type BottomNavItem = {
  label: string;
  href?: string;
  icon: IconType;
  action?: "cart";
};

const guestBottomNavItems: BottomNavItem[] = [
  { label: "Home", href: "/", icon: HiOutlineHome },
  { label: "Products", href: "/plans", icon: HiOutlineUserGroup },
  { label: "File A Claim", href: "/claims", icon: FaRegFileAlt },
  { label: "Cart", icon: FiShoppingCart, action: "cart" },
];

const authedBottomNavItems: BottomNavItem[] = [
  { label: "Home", href: "/", icon: HiOutlineHome },
  { label: "Products", href: "/plans", icon: HiOutlineUserGroup },
  { label: "Pay My Plan", href: "/account/pay-my-plan", icon: FaRegCreditCard },
  { label: "File A Claim", href: "/claims", icon: FaRegFileAlt },
  { label: "Cart", icon: FiShoppingCart, action: "cart" },
  // { label: "Yhuan Shin", href: "/profile", icon: MdOutlineAccountCircle },
];

const sidePanelItems = [
  { label: "Home", href: "/", icon: HiOutlineHome },
  { label: "Products", href: "/plans", icon: HiOutlineUserGroup },
  { label: "Pay My Plan", href: "/pay-my-plan", icon: FaRegCreditCard },
  { label: "File A Claim", href: "/claims", icon: FaRegFileAlt },
  { label: "Return Of Premium", href: "/rop", icon: BiSolidCoinStack },
  { label: "Reinstatement", href: "/reinstatement", icon: GiReturnArrow },
  { label: "News & Blogs", href: "/news-updates", icon: IoNewspaperOutline },
  { label: "Contact Us", href: "/contact-us", icon: MdOutlineMessage },
];

const BottomNav = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const { isLoggedIn } = useDemoAuth();

  const bottomNavItems = isLoggedIn
    ? authedBottomNavItems
    : guestBottomNavItems;

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const disclosure = useDisclosure();
  const open = (disclosure as any).open ?? (disclosure as any).isOpen;
  const onOpen = disclosure.onOpen;
  const onClose = disclosure.onClose;
  const pathname = usePathname();
  const iconSize = useBreakpointValue({ base: 6, md: 7 });

  const isActive = (href: string) => href === pathname;

  return (
    <Box>
      <Box
        as="nav"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="white"
        borderTopWidth="1px"
        boxShadow="md"
        zIndex="overlay"
        display={{ base: "block", md: "block", lg: "none" }}
        px={2}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Flex justify="space-around" align="center" h={{ base: 16, md: 20 }}>
          {bottomNavItems.map((it) =>
            it.action === "cart" ? (
              <Button
                key={it.label}
                variant="ghost"
                onClick={() => {
                  onClose();
                  setCartOpen(true);
                }}
                display="flex"
                flexDir="column"
                color={cartOpen ? "green.600" : "gray.600"}
                alignItems="center"
                minW={16}
                textTransform="none"
                aria-label="Open cart"
              >
                <Icon as={it.icon} boxSize={iconSize} />
                <Text fontSize={{ base: "2xs", md: "xs" }} textTransform="none">
                  {it.label}
                </Text>
              </Button>
            ) : (
              <Link
                key={it.href}
                href={it.href!}
                onClick={onClose}
                aria-label={it.label}
              >
                <Flex
                  direction="column"
                  align="center"
                  gap={2}
                  color={isActive(it.href!) ? "green.600" : "gray.600"}
                  _hover={{ color: "green.600" }}
                  fontWeight={isActive(it.href!) ? "semibold" : "normal"}
                  minW={16}
                >
                  <Icon as={it.icon} boxSize={iconSize} />
                  <Text fontSize={{ base: "2xs", md: "xs" }}>{it.label}</Text>
                </Flex>
              </Link>
            ),
          )}
          {!isLoggedIn && (
            <Button
              variant="ghost"
              onClick={onOpen}
              display="flex"
              flexDir="column"
              color={open ? "green.600" : "gray.600"}
              alignItems="center"
              minW={16}
              textTransform="none"
              aria-label="Open menu"
            >
              <Icon as={IoMenuOutline} boxSize={iconSize} />
              <Text fontSize={{ base: "2xs", md: "xs" }} textTransform="none">
                Menu
              </Text>
            </Button>
          )}
        </Flex>
      </Box>

      {/* Lightweight slide-in panel (avoids Drawer type mismatches) */}
      {!isLoggedIn && open && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex="overlay"
          display={{ base: "block", md: "block", lg: "none" }}
          onClick={onClose}
        />
      )}

      <Box
        display={
          !isLoggedIn ? { base: "block", md: "block", lg: "none" } : "none"
        }
        position="fixed"
        top={0}
        left={0}
        h="100%"
        w={{ base: 64, sm: 72, md: 80 }}
        bg="white"
        boxShadow="lg"
        zIndex="overlay"
        transform={open ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.25s ease"
        overflowY="auto"
        aria-hidden={open ? "false" : "true"}
        aria-label="Site menu"
      >
        <Flex
          p={4}
          justify="space-between"
          align="center"
          borderBottomWidth="1px"
        >
          <Text
            fontWeight="semibold"
            // textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
          >
            Menu
          </Text>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </Flex>

        <Box p={4} borderBottomWidth="1px">
          <Box as="nav" display="flex" flexDirection="column" gap={1}>
            {sidePanelItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={onClose}
                aria-label={it.label}
              >
                <Flex
                  align="center"
                  gap={3}
                  px={3}
                  py={2.5}
                  borderRadius="md"
                  bg={isActive(it.href) ? "green.50" : "transparent"}
                  borderWidth={isActive(it.href) ? "1px" : "0"}
                  borderColor={isActive(it.href) ? "green.200" : "transparent"}
                  color={isActive(it.href) ? "green.700" : "gray.700"}
                  _hover={{ bg: "gray.50" }}
                  fontWeight={isActive(it.href) ? "semibold" : "normal"}
                >
                  <Icon as={it.icon} boxSize={5} />
                  <Text fontSize="sm">{it.label}</Text>
                </Flex>
              </Link>
            ))}
          </Box>
        </Box>

        {/* <Box p={4} w="full">
          <LoginButton w="full" />
        </Box> */}
      </Box>

      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
};

export default BottomNav;
