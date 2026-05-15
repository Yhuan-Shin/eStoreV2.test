import { useEffect, useState } from "react";


import { CartItem } from "@/types/cartItem";

export const addToCart = (
  planDesc: string,
  mode: string,
  planTerm: string,
  quantity: number,
  price: number,
  total: number,
  contractPrice: number,
) => {
  if (
    !planDesc ||
    !mode ||
    !planTerm ||
    !total ||
    !quantity ||
    !price ||
    !contractPrice
  )
    return;

  const stored = sessionStorage.getItem("Cart");
  const cart = stored ? JSON.parse(stored) : [];
  total = price * quantity;
  const exists = cart.some((c: any) => c.planDesc === planDesc);
  if (!exists) cart.push({ planDesc, mode, planTerm, quantity, price, total });


  // Check if exact item already exists (same planDesc, mode, planTerm)
  const itemExists = cart.some(
    (item: CartItem) =>
      item.planDesc === planDesc &&
      item.mode === mode &&
      item.planTerm === planTerm,
  );

  if (itemExists) {
    return; // Prevent adding duplicate exact items
  }

  const newItem: CartItem = {
    planDesc,
    mode,
    planTerm,
    quantity,
    price,
    total,
    contractPrice,
  };

  cart.push(newItem);
  sessionStorage.setItem("Cart", JSON.stringify(cart));
};

