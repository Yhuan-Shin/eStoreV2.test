"use client";
import { useParams, useRouter } from "next/navigation";
import { IPlans } from "@/types/product";
import { useEffect, useState, useMemo } from "react";
import { ProductService } from "@/services/API/ProductService";
import Comparison from "@/components/comparison";

const PlanComparisonPage = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<IPlans[]>([]);
  const params = useParams();

  const compareListParam = decodeURIComponent(params.compareList as string);

  const compareList = useMemo(
    () => compareListParam.split(","),
    [compareListParam],
  );

  const removeItem = (itemToRemove: string) => {
    const newList = compareList.filter((item) => item !== itemToRemove);
    const newUrl =
      newList.length > 0 ? `/plan-comparison/${newList.join(",")}` : "/plans";
    router.push(newUrl);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans: IPlans[] = [];

        for (const planDesc of compareList) {
          const res = await ProductService.getProductByName(planDesc);
          fetchedPlans.push(res[0]);
        }

        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, [compareList]);

  return (
    <>
      <Comparison
        compareList={compareList}
        plans={plans}
        removeItem={removeItem}
      />
    </>
  );
};

export default PlanComparisonPage;
