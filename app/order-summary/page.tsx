"use client";

import { useEffect, useState } from "react";
import OrderSummary from "@/components/order-summary";
import { Box, Flex, Spinner, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cartItem";

const OrderSummaryPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const checkoutStored = sessionStorage.getItem("CheckoutCart");
      const cartStored = sessionStorage.getItem("Cart");

      if (checkoutStored) {
        const parsedCheckout = JSON.parse(checkoutStored);
        setCartItems(
          Array.isArray(parsedCheckout) ? parsedCheckout : [parsedCheckout],
        );
        return;
      }

      if (cartStored) {
        const parsedCart = JSON.parse(cartStored);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } else {
        setCartItems([]);
      }
    } catch (e) {
      console.error("Failed to read Cart from sessionStorage", e);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <section className="h-screen flex items-center justify-center">
        <Spinner size="lg" color="#21bc27" />
      </section>
    );
  }

  return (
    <Flex
      w="full"
      justify={{ base: "flex-start", md: "center" }}
      align="center"
      h={{ base: "auto", md: "100vh" }}
      p={8}
    >
      <Box
        p={{ base: 0, md: 8 }}
        borderRadius="lg"
        shadow={{ base: "none", md: "md" }}
        bg="white"
        maxW={{ base: "full", md: "4xl" }}
        mx="auto"
        w={{ base: "full", md: "90%" }}
      >
        {cartItems && cartItems.length > 0 ? (
          <OrderSummary cartItems={cartItems} />
        ) : (
          <Box textAlign="center" py={12}>
            <Box mb={4}>Your cart is empty</Box>
            <Button onClick={() => router.push("/plans")}>Browse Plans</Button>
          </Box>
        )}

        <Box textAlign="end" w="full" mt={8}>
          <Button
            mt={8}
            w="full"
            onClick={() => {
              router.push("/get-started");
            }}
            disabled={!cartItems || cartItems.length === 0}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default OrderSummaryPage;
