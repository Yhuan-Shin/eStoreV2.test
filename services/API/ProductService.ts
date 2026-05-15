import {getModeAndName,getPlansCard, getPlansSection, getProductByName} from '@/app/api/products/plan';

export const ProductService = {
  async getModeAndName(planDesc: string, selectedPlan: string) {
    try {
      return await getModeAndName(planDesc, selectedPlan);
    } catch (error) {
      console.error("Error fetching mode and name:", error);
      throw error;
    }
    },
    async getProductByName(planDesc: string) {
        try {
            return await getProductByName(planDesc);
        } catch (error) {
            console.error("Error fetching product by name:", error);
            throw error;
        }
    },
    async getPlansCard() {
        try {
            return await getPlansCard();
            
        } catch (error) {
            console.error("Error fetching plans card:", error);
            throw error;
        }
    },
    async getPlansSection() {
        try {
            return await getPlansSection();
        } catch (error) {
            console.error("Error fetching plans section:", error);
            throw error;
        }
    }
}