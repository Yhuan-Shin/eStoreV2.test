// "use client";
import React, { use } from "react";
import ProductView from "@/components/product-view";
//import { getProductByName } from "@/lib/utils/plan";
import { useProductByName } from "@/hooks/products/useProduct";

interface PageProps {
  params: Promise<{ planDesc: string }>;
}

const Page = ({ params }: PageProps) => {
  const { planDesc } = use(params);
  const { data: plan } = useProductByName(planDesc);

  return <ProductView plans={plan} />;
};

export default Page;
