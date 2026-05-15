"use client";
import {
  HStack,
  Menu,
  Portal,
  Image,
  IconButton,
  Box,
  Avatar,
  AvatarGroup,
  Dialog,
  VStack,
  Text,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdArrowDropDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartCount } from "@/hooks/useCartCount";
import {
  BaseButton,
  ContactUsButton,
  LoginButton,
  PrimaryMdButton,
} from "st-peter-ui";
import Link from "next/link";
import { useDemoAuth } from "@/components/ui/demo-auth";
import { MdOutlineAccountCircle } from "react-icons/md";
import ShoppingCart from "@/components/ui/shopping-cart";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const count = useCartCount();
  const { isLoggedIn, logout } = useDemoAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HStack
        display={{ base: "flex", md: "none" }}
        position="fixed"
        top={scrolled ? 0 : 4}
        left={scrolled ? 0 : 3}
        right={scrolled ? 0 : 3}
        zIndex={50}
        px={4}
        py={3}
        justify="space-between"
        align="center"
        bg={scrolled ? "whiteAlpha.900" : "whiteAlpha.800"}
        backdropFilter="blur(12px)"
        transition="all 0.3s ease"
        borderRadius={scrolled ? "0" : "full"}
        shadow={scrolled ? "md" : "sm"}
      >
        <Image
          src="https://www.stpeter.com.ph/images/logo2gold.png"
          alt="E-Store Logo"
          cursor="pointer"
          onClick={() => router.push("/")}
          w={{ base: "140px", sm: "160px" }}
          h="auto"
          maxW="100%"
          objectFit="contain"
        />

        {isLoggedIn ? (
          <Box cursor="pointer" onClick={() => setProfileOpen(true)}>
            <AvatarGroup>
              <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image src="/images/profile.jpg" />
              </Avatar.Root>
            </AvatarGroup>
          </Box>
        ) : (
          <LoginButton onClick={() => router.push("/login")} />
        )}
      </HStack>

      <HStack
        display={{ base: "none", md: "inline-flex" }}
        padding={10}
        height="30px"
        insetX={0}
        justify="center"
        alignItems="center"
        position="fixed"
        zIndex={50}
        bg={scrolled ? "whiteAlpha.900" : "whiteAlpha.800"}
        backdropFilter="blur(12px)"
        gap={8}
        transition="all 0.3s ease"
        maxWidth={scrolled ? "100%" : "7xl"}
        top={scrolled ? 0 : 5}
        left={scrolled ? 0 : 2}
        right={scrolled ? 0 : 2}
        borderRadius={scrolled ? "0" : "full"}
        shadow={scrolled ? "md" : "sm"}
        margin="auto"
        // border="1px solid"
      >
        <Box
          maxW="7xl"
          w="full"
          px={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            src="https://www.stpeter.com.ph/images/logo2gold.png"
            alt="E-Store Logo"
            cursor="pointer"
            onClick={() => router.push("/")}
            w={{ base: "120px", sm: "160px", md: "180px", lg: "190px" }}
            h="auto"
            maxW="100%"
            objectFit="contain"
          />
          <HStack
            w="7xl"
            as="nav"
            gap={4}
            justify="center"
            flex="1"
            display={{ base: "none", lg: "flex" }}
          >
            <Menu.Root>
              <Menu.Trigger asChild>
                <BaseButton
                  backgroundColor="transparent"
                  textDecoration="none"
                  variant="ghost"
                  fontWeight="semibold"
                  gap={1}
                  _active={{ bg: "transparent" }}
                  _focusVisible={{ boxShadow: "none", bg: "transparent" }}
                >
                  Products <MdArrowDropDown />
                </BaseButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="life-plan"
                      textDecoration="none"
                      fontWeight="semibold"
                    >
                      <Link href="/plans">Life Plan</Link>
                    </Menu.Item>
                    <Menu.Item value="memorial-park" fontWeight="semibold">
                      Memorial Park
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <Menu.Root>
              <Menu.Trigger asChild>
                <BaseButton
                  fontWeight="semibold"
                  variant="ghost"
                  textDecoration="none"
                  gap={1}
                  backgroundColor="transparent"
                  _active={{ bg: "transparent" }}
                  _focusVisible={{ boxShadow: "none", bg: "transparent" }}
                >
                  E-Services <MdArrowDropDown />
                </BaseButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="pay-my-plan"
                      fontWeight="semibold"
                      textDecoration="none"
                    >
                      <Link href="/pay-my-plan">Pay My Plan</Link>
                    </Menu.Item>
                    <Menu.Item
                      value="file-a-claim"
                      fontWeight="semibold"
                      textDecoration="none"
                    >
                      <Link href="/claims">File a Claim</Link>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => router.push("/reinstatement")}
                      value="reinstatement"
                      fontWeight="semibold"
                      textDecoration="none"
                    >
                      Reinstatement
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => router.push("/login")}
                      value="return-of-premium"
                      fontWeight="semibold"
                      textDecoration="none"
                    >
                      <Link href="/login">Return of Premium</Link>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <BaseButton
              variant="ghost"
              fontWeight="semibold"
              textDecoration="none"
              onClick={() => router.push("/news-updates")}
            >
              News & Blog
            </BaseButton>

            <BaseButton
              variant="ghost"
              textDecoration="none"
              fontWeight="semibold"
              onClick={() => router.push("/about-us")}
            >
              About Us
            </BaseButton>
          </HStack>

          <HStack gap={4}>
            <IconButton aria-label="Search" variant="ghost">
              <IoSearchOutline />
            </IconButton>

            <Box position="relative">
              <IconButton
                aria-label="Shopping Cart"
                variant="ghost"
                aria-expanded={cartOpen}
                aria-haspopup="dialog"
                onClick={() => setCartOpen((open) => !open)}
              >
                <MdOutlineShoppingCart />
              </IconButton>

              {count > 0 && (
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  transform="translate(30%, -30%)"
                  bg="red.500"
                  color="white"
                  w="16px"
                  h="16px"
                  borderRadius="full"
                  fontSize="xs"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {count}
                </Box>
              )}
            </Box>

            <ContactUsButton onClick={() => router.push("/contact-us")} />

            {isLoggedIn ? (
              <Box cursor="pointer" onClick={() => setProfileOpen(true)}>
                <AvatarGroup>
                  <Avatar.Root>
                    <Avatar.Fallback />
                    <Avatar.Image src="/images/profile.jpg" />
                  </Avatar.Root>
                </AvatarGroup>
              </Box>
            ) : (
              <LoginButton onClick={() => router.push("/login")} />
            )}
            {/* <PrimarySmButton
              textDecoration="none"
              display={{ base: "none", md: "inline-flex" }}
              onClick={() => router.push("/login")}
            >
              LOG IN
            </PrimarySmButton> */}
          </HStack>
        </Box>
      </HStack>
      {/* Floating Cart Button */}
      {/* <Button
        position="fixed"
        top={{ base: 10, md: 24 }}
        right={6}
        zIndex="sticky"
        borderRadius="full"
        bg="green.600"
        _hover={{ bg: "green.700" }}
        w={16}
        h={16}
        display={{ base: "flex", md: "flex", lg: "none" }}
        alignItems="center"
        justifyContent="center"
        boxShadow="lg"
        onClick={() => setCartOpen(true)}
        aria-label="Shopping Cart"
      >
        <Flex direction="column" align="center" gap={0.5}>
          <Icon as={MdOutlineShoppingCart} boxSize={6} color="white" />
        </Flex>
      </Button> */}
      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Profile Modal */}
      <Dialog.Root
        open={profileOpen}
        onOpenChange={(e) => setProfileOpen(e.open)}
        size="md"
        placement="top"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title display="none" />
            </Dialog.Header>
            <Dialog.Body as={VStack} gap={8} py={8}>
              {/* Profile Picture */}
              <Avatar.Root size="xl">
                <Avatar.Image src="/images/profile.jpg" alt="Profile" />
                <Avatar.Fallback />
              </Avatar.Root>

              {/* User Name */}
              <VStack gap={1}>
                <Text fontSize="lg" fontWeight="bold">
                  Yhuan Shin Tejima
                </Text>
                <Text fontSize="sm" color="gray.600">
                  SPLPI-01-123456789
                </Text>
              </VStack>

              {/* Action Buttons */}
              <VStack gap={3} w="full" pt={4}>
                <PrimaryMdButton
                  w="full"
                  onClick={() => {
                    router.push("/account/profile");
                    setProfileOpen(false);
                  }}
                >
                  Manage Account
                </PrimaryMdButton>
                <Button
                  w="full"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => {
                    logout?.();
                    setProfileOpen(false);
                    router.push("/");
                  }}
                >
                  Sign Out
                </Button>
              </VStack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="md" />
            </Dialog.CloseTrigger>{" "}
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default Navbar;
