import AllProducts from "@/components/all-products";
import { ProductService } from "@/services/API/ProductService";
import { IPlans } from "@/types/product";

function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function groupPlansByProduct(plans: IPlans[], productCode: string) {
  const filtered = plans.filter((p) => p.productCode === productCode);
  const map = new Map();

  filtered.forEach((p) => {
    const key = p.planDesc;

    if (!map.has(key)) {
      map.set(key, {
        planDesc: p.planDesc,
        casketDesc: p.casketDesc,
        img: `/images/plan-images/${p.planDesc}.jpg`,
        contractPrice: formatCurrency(p.contractPrice),
        terms: [],
      });
    }

    const entry = map.get(key);

    const exists = entry.terms.some(
      (t: any) => t.planTerm === p.planTerm && t.mode === p.mode,
    );

    if (!exists) {
      entry.terms.push({
        mode: p.mode,
        planTerm: p.planTerm,
        price: formatCurrency(p.ipInstAmt),
      });
    }
  });

  return Array.from(map.values());
}

export default async function Products() {
  const plans = await ProductService.getPlansSection();

  const traditionalGroups = groupPlansByProduct(plans, "LP");
  const cremationGroups = groupPlansByProduct(plans, "CP");

  return (
    <AllProducts
      plans={plans}
      traditionalGroups={traditionalGroups}
      cremationGroups={cremationGroups}
    />
  );
}
