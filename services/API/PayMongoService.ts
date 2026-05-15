// services/paymongoService.ts
import { createCheckout } from "@/app/api/paymongo/paymongo";
import { ITransactionData } from "@/types/planholder";
import { insertTransactionApi } from "@/app/api/insert-transaction/insertTransaction";

export const PayMongoService = {
  async createCheckout(payload: any) {
    try {
      const res = await createCheckout(payload);

      return {
        checkoutUrl:
          res.checkoutUrl || res.data?.attributes?.checkout_url,
      };
    } catch (error) {
      console.error("Error creating checkout:", error);
      throw error;
    }
  },
};

export const TransactionService = {
  async insert(data: ITransactionData) {
    return await insertTransactionApi(data);
  },
};