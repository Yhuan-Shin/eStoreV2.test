import { PlanholderService } from "@/services/API/PlanholderService";
import { IPlanholderApiResponse, ISearchedPlanholder } from "@/types/planholder";
import { useState } from "react";

    

const toDateOnly = (value?: string) => {
    if (!value) {
        return "";
    }

    return value.split("T")[0] ?? value;
};

const mapPlanholderForDetails = (
    response: IPlanholderApiResponse,
): ISearchedPlanholder => ({
    contractNo: response.myPlan?.accountNo ?? response.myPlan?.lpaNo ?? "",
    planType: response.planDetails?.planType ?? "",
    personalInfo: {
        firstName: response.myPlan?.firstName ?? "",
        middleName: response.myPlan?.middleName ?? "",
        lastName: response.myPlan?.lastName ?? "",
        birthDate: toDateOnly(response.myPlan?.dateOfBirth),
        mobileNumber: response.myPlan?.mobileNo ?? "",
        emailAddress: response.myPlan?.emailAddress ?? "",
    },
    address: {
        lot: response.phAddress?.addno ?? "",
        street: response.phAddress?.street ?? "",
        barangay: response.phAddress?.barangay ?? "",
        district: response.phAddress?.district ?? "",
        city: response.phAddress?.city ?? "",
        province: response.phAddress?.province ?? "",
        zipCode:
            response.phAddress?.zipCode !== undefined && response.phAddress?.zipCode !== null
                ? String(response.phAddress.zipCode)
                : "",
    },
    installmentAmount: response.planDetails?.amount ?? 0,
    balance: response.planDetails?.balance ?? response.planDetails?.balance ?? 0,
});

export const useSearchPlanholder = () => {
    const [data, setData] = useState<ISearchedPlanholder | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (firstName: string, dateOfBirth: string, lastName: string) => {
        setLoading(true);
        setError(null);

        try {
            const result =
                (await PlanholderService.searchPlanholder(firstName, dateOfBirth, lastName)) as IPlanholderApiResponse | null;

            if (!result) {
                const message = "No planholder record found.";
                setError(message);
                return null;
            }

            const filteredResult = mapPlanholderForDetails(result);
            setData(filteredResult);
            return filteredResult;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to search planholder";
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, search };
};