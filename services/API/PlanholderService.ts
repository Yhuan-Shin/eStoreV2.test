import { searchPlanholder } from "@/app/api/planholder/searchPlanholder";
export const PlanholderService = {
    async searchPlanholder(firstName: string, dateOfBirth: string, lastName: string) {
        try {
            return await searchPlanholder(firstName, dateOfBirth, lastName);
        } catch (error) {
            console.error("Error searching planholder:", error);
            throw error;
        }
    }

};