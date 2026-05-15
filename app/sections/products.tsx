import ProductLandingPage from "@/components/products-landing-page";
import { IPlans } from "@/types/product";
import { ProductService } from "@/services/API/ProductService";

async function getPlans(): Promise<IPlans[]> {
  //ADD THIS TO HOOKS
  const res = await ProductService.getPlansCard();
  return res;
}

function groupPlans(plans: IPlans[]) {
  const map = new Map();

  plans.forEach((p) => {
    const key = p.planDesc;

    if (!map.has(key)) {
      map.set(key, {
        planDesc: p.planDesc,
        casketDesc: p.casketDesc,
        img: `/images/plan-images/${p.planDesc}.jpg`,
        terms: [{ planTerm: p.planTerm, price: p.ipInstAmt }],
      });
    } else {
      const entry = map.get(key);

      const exists = entry.terms.some(
        (t: any) => t.planTerm === p.planTerm && t.price === p.ipInstAmt,
      );

      if (!exists) {
        entry.terms.push({
          planTerm: p.planTerm,
          price: p.ipInstAmt,
        });
      }
    }
  });

  return Array.from(map.values()).slice(0, 3);
}

export default async function Products() {
  const plans = await getPlans();

  const groupedPlans = groupPlans(plans);

  return <ProductLandingPage groupedPlans={groupedPlans} />;
}
