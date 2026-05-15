"use client";
import {
  Badge,
  Box,
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PrimaryMdButton } from "st-peter-ui";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaCircleMinus } from "react-icons/fa6";
import { CartItem } from "@/types/cartItem";
import { FaTrashAlt } from "react-icons/fa";

interface ShoppingCartProps {
  open: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ open, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [removeIdx, setRemoveIdx] = useState<number | null>(null);

  const maxWidth = useBreakpointValue({ base: "100%", md: "md" }) ?? "100%";
  const imageSize =
    useBreakpointValue({ base: "118px", md: "128px" }) ?? "128px";
  const padding = useBreakpointValue({ base: 4, md: 6 }) ?? 4;
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  useEffect(() => {
    if (open) {
      const stored = sessionStorage.getItem("Cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }
    }
  }, [open]);

  const handleRemove = (idx: number) => {
    setRemoveIdx(idx);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (removeIdx !== null) {
      setCartItems((items) => {
        const updated = items.filter((_, idx) => idx !== removeIdx);
        sessionStorage.setItem("Cart", JSON.stringify(updated));
        return updated;
      });
      setShowModal(false);
      setRemoveIdx(null);
    }
  };

  const cancelRemove = () => {
    setShowModal(false);
    setRemoveIdx(null);
  };

  const updateQuantity = (idx: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) => {
      const updated = [...items];
      updated[idx].quantity = newQuantity;
      updated[idx].total = updated[idx].price * newQuantity;
      sessionStorage.setItem("Cart", JSON.stringify(updated));
      return updated;
    });
  };

  const router = useRouter();
  const grandTotal = cartItems.reduce(
    (s, item) => s + Number(item.total || 0),
    0,
  );
  const getModeLabel = (mode?: string) => {
    if (mode == null) return "";

    return mode == "C"
      ? "Cash"
      : mode == "M"
        ? "Monthly"
        : mode == "Q"
          ? "Quarterly"
          : mode == "S"
            ? "Semi-Annual"
            : mode == "A"
              ? "Annual"
              : "";
  };

  const getModeBadgeStyles = (mode?: string) => {
    switch (mode) {
      case "C":
        return { bg: "green.600", color: "white" };
      case "M":
        return { bg: "green.600", color: "white" };
      case "Q":
        return { bg: "green.600", color: "white" };
      case "S":
        return { bg: "green.600", color: "white" };
      case "A":
        return { bg: "green.600", color: "white" };
      default:
        return { bg: "gray.600", color: "white" };
    }
  };

  const formatPeso = (value: number) =>
    `₱ ${Number(value)
      .toLocaleString("en-PH", { minimumFractionDigits: 2 })
      .replace(/\.00$/, "")}`;

  return (
    <Box
      display={open ? "flex" : "none"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.600"
      justifyContent={{ base: "center", md: "end" }}
      alignItems={{ base: "end", md: "stretch" }}
      zIndex="modal"
      opacity={open ? 1 : 0}
      pointerEvents={open ? "auto" : "none"}
      transition="opacity 0.3s"
      onClick={onClose}
    >
      <Box
        w={maxWidth}
        maxH={{ base: "100dvh", md: "100vh" }}
        h={{ base: "100dvh", md: "100vh" }}
        bg={{ base: "gray.50", md: "white" }}
        shadow={{ base: "2xl", md: "lg" }}
        borderTopWidth={{ base: "1px", md: 0 }}
        borderColor="blackAlpha.100"
        borderTopLeftRadius={{ base: "2xl", md: "lg" }}
        borderTopRightRadius={{ base: "2xl", md: "0" }}
        borderBottomLeftRadius={{ base: 0, md: "lg" }}
        borderBottomRightRadius={{ base: 0, md: 0 }}
        p={padding}
        pb={{ base: 5, md: 6 }}
        position="relative"
        transform={
          open
            ? "translateX(0)"
            : isMobile
              ? "translateY(100%)"
              : "translateX(100%)"
        }
        transition="transform 0.3s"
        onClick={(e) => e.stopPropagation()}
        display="flex"
        flexDirection="column"
        overflowY="auto"
      >
        <DialogRoot
          open={showModal}
          onOpenChange={(details) => setShowModal(details.open)}
        >
          <DialogContent>
            <DialogHeader>Remove item from cart?</DialogHeader>
            <DialogBody>
              Are you sure you want to remove this item from your cart?
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={cancelRemove}>
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button colorScheme="red" onClick={confirmRemove}>
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>

        <Flex align="start" justify="space-between" gap={4} mb={4}>
          <Box>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              letterSpacing="-0.03em"
            >
              Shopping Cart
            </Heading>
            <Text color="gray.500" fontSize="sm" mt={1}>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Text>
          </Box>

          <IconButton
            aria-label="Close shopping cart"
            variant="ghost"
            rounded="full"
            size="sm"
            color="gray.500"
            _hover={{ color: "black", bg: "gray.100" }}
            onClick={onClose}
          >
            <IoClose size={22} />
          </IconButton>
        </Flex>

        {/* Cart Items */}
        <Flex direction="column" flex={1} gap={4} mt={2}>
          {cartItems.length === 0 ? (
            <Box
              py={10}
              px={6}
              textAlign="center"
              color="gray.500"
              bg="white"
              borderWidth="1px"
              borderColor="gray.100"
              rounded="lg"
              shadow="xs"
            >
              Your cart is empty.
            </Box>
          ) : (
            cartItems.map((item, idx) => (
              <Box
                key={idx}
                bg="white"
                borderWidth="1px"
                borderColor="gray.100"
                rounded="lg"
                shadow="xs"
                overflow="hidden"
                p={{ base: 3, md: 4 }}
              >
                <Stack
                  direction={{ base: "row", md: "row" }}
                  gap={3}
                  align="stretch"
                >
                  <Box
                    position="relative"
                    w={{ base: "118px", md: imageSize }}
                    minW={{ base: "118px", md: imageSize }}
                    h={{ base: "140px", md: imageSize }}
                    flexShrink={0}
                    overflow="hidden"
                    rounded="xl"
                  >
                    <Image
                      src={`/images/plan-images/${item.planDesc}.jpg`}
                      alt={item.planDesc}
                      boxSize="full"
                      objectFit="cover"
                    />

                    <Badge
                      position="absolute"
                      top={2}
                      left={2}
                      rounded="full"
                      px={2.5}
                      py={1}
                      fontSize="xs"
                      fontWeight="semibold"
                      textTransform="none"
                      bg={getModeBadgeStyles(item.mode).bg}
                      color={getModeBadgeStyles(item.mode).color}
                      boxShadow="sm"
                    >
                      {getModeLabel(item.mode)}
                    </Badge>
                  </Box>

                  <VStack flex={1} align="stretch" gap={3} minW={0}>
                    <Flex justify="space-between" align="start" gap={3}>
                      <Box minW={0}>
                        <Text
                          fontWeight="semibold"
                          fontSize={{ base: "md", md: "lg" }}
                          lineHeight="short"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          display="-webkit-box"
                          style={{
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.planDesc}
                        </Text>
                        <Text color="gray.500" fontSize="sm" mt={1}>
                          Plan included in your cart
                        </Text>
                      </Box>

                      <IconButton
                        aria-label={`Remove ${item.planDesc} from cart`}
                        variant="ghost"
                        rounded="full"
                        size="sm"
                        color="gray.500"
                        flexShrink={0}
                        _hover={{ color: "red.600", bg: "red.50" }}
                        onClick={() => handleRemove(idx)}
                      >
                        <FaTrashAlt />
                      </IconButton>
                    </Flex>

                    <Box
                      bg="gray.50"
                      rounded="xl"
                      p={3}
                      borderWidth="1px"
                      borderColor="gray.100"
                    >
                      <Flex justify="space-between" align="center" gap={3}>
                        <Text fontSize="sm" color="gray.500">
                          Unit Price
                        </Text>
                        <Text fontWeight="semibold">
                          {formatPeso(item.price ?? 0)}
                        </Text>
                      </Flex>

                      <Flex
                        justify="space-between"
                        align="center"
                        gap={3}
                        mt={3}
                      >
                        <Text fontSize="sm" color="gray.500">
                          Quantity
                        </Text>
                        <HStack
                          gap={1}
                          bg="white"
                          borderWidth="1px"
                          borderColor="gray.200"
                          rounded="full"
                          px={1}
                          py={1}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            rounded="full"
                            w={8}
                            h={8}
                            minW={8}
                            p={0}
                            onClick={() =>
                              updateQuantity(idx, item.quantity - 1)
                            }
                            _hover={{ bg: "gray.100" }}
                          >
                            <FaCircleMinus size={15} />
                          </Button>

                          <Text
                            fontWeight="semibold"
                            minW="2rem"
                            textAlign="center"
                          >
                            {item.quantity}
                          </Text>

                          <Button
                            size="sm"
                            variant="ghost"
                            rounded="full"
                            w={8}
                            h={8}
                            minW={8}
                            p={0}
                            onClick={() =>
                              updateQuantity(idx, item.quantity + 1)
                            }
                            _hover={{ bg: "gray.100" }}
                          >
                            <MdOutlineAddCircle size={18} />
                          </Button>
                        </HStack>
                      </Flex>

                      <Box borderTopWidth="1px" borderColor="gray.200" my={3} />

                      <Flex justify="space-between" align="center" gap={3}>
                        <Text fontSize="sm" color="gray.500">
                          Subtotal
                        </Text>
                        <Text
                          fontSize={{ base: "lg", md: "xl" }}
                          fontWeight="bold"
                          // color="#3056ff"
                        >
                          {formatPeso(Number(item.total))}
                        </Text>
                      </Flex>
                    </Box>
                  </VStack>
                </Stack>
              </Box>
            ))
          )}
        </Flex>

        {/* Summary and Button */}
        <VStack
          gap={4}
          mt={5}
          pt={4}
          w="full"
          position={{ base: "sticky", md: "static" }}
          bottom={0}
          bg={{ base: "gray.50", md: "transparent" }}
          borderTopWidth="1px"
          borderColor="gray.200"
          pb={{ base: "env(safe-area-inset-bottom)", md: 0 }}
        >
          <HStack justifyContent="space-between" w="full" px={1}>
            <Text fontSize={{ base: "base", md: "lg" }} fontWeight="semibold">
              Total
            </Text>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="#109448"
            >
              {formatPeso(grandTotal)}
            </Text>
          </HStack>
          <PrimaryMdButton
            w="full"
            disabled={cartItems.length === 0}
            onClick={() => {
              onClose();

              setTimeout(() => {
                router.push("/order-summary/");
              }, 100);
            }}
          >
            Proceed
          </PrimaryMdButton>
        </VStack>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
