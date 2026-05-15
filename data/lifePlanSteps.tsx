import Beneficiary from "@/components/steps/beneficiary";
import Confirmation, {
  type ConfirmationProps,
} from "@/components/steps/confirmation";
import HealthDeclaration from "@/components/steps/HealthDeclaration";
import LifePlanApplicationWrapper from "@/components/steps/LifePlanApplicationFormWrapper";

export const createLifePlanSteps = (confirmationProps?: ConfirmationProps) => [
  {
    id: "1",
    header: "Life Plan Application",
    title: "Application",
    description: "Complete the application form",
    component: <LifePlanApplicationWrapper />,
  },

  {
    id: "2",
    header: "Beneficiary Details",
    title: "Beneficiary",
    description: "Add Beneficiary Details",
    component: <Beneficiary />,
  },
  {
    id: "3",
    header: "Health Declaration & Terms and Conditions",
    title: "Terms",
    description: "Health Declaration & Terms and Conditions",
    component: <HealthDeclaration />,
  },
  // {
  //   id: "4",
  //   header: "Upload Requirements",
  //   title: "Requirements",
  //   description: "Upload Requirements",
  //   component: <Requirements />,
  // },
  {
    id: "4",
    header: "Review Summary",
    title: "Summary",
    description: "Review and confirm your application",
    component: <Confirmation {...confirmationProps} />,
  },
  // {
  //   id: "5",
  //   header: "Payment",
  //   title: "Payment",
  //   description: "Review and confirm your application",
  //   component: <Payment />,
  // },
];
