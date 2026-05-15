"use client";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  Address,
  ListOfPlans,
  MessageDialogProvider,
  PlanDetailType,
  PlanholderInfoProps,
  PlanholderPageProps,
  PlanholderProfilePage,
} from "@splpi/plan-management";
import { useDemoAuth } from "@/components/ui/demo-auth";
import { BreadcrumbItemType } from "st-peter-ui";

const Account = () => {
  const { login } = useDemoAuth();
  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Account",
      href: "/account",
    },
  ];

  const planholderProfileData: PlanholderPageProps = {
    breadcrumbItems,
    hyperlinks: {
      payMyPlan: "/",
      returnedOfPremium: `/#`,
      claimApplication: "/claims",
      changeOfMode: `/#`,
      cashSurrenderedValue: "/",
      transferOfRights: `/#`,
      reinstement: `/#`,
    },
    planholderInfo: {
      personId: "PI12345",
      lastName: "DELA CRUZ",
      firstName: "JOHN",
      middleName: "OTAB",
      nationality: "FILIPINO",
      naturalizationDate: new Date("1900-01-01T00:00:00"),
      dateOfBirth: new Date("1962-01-21T00:00:00"),
      placeOfBirth: "SANTA CRUZ",
      gender: "MALE",
      civilStatus: "SINGLE",
      height: "66``",
      weight: 100.0,
      employerName: "ST. PETER LIFE PLAN, INC.",
      employmentStatus: "EMPLOYED",
      tin: "TIN-123-456-789-0000",
      securityNo: "SSS-123-456-7",
      sourceOfFund: "SALARY",
    } as PlanholderInfoProps,
    planholderAddress: [
      {
        id: "ADD-123",
        addressType: "RESIDENCE",
        addressNo: null,
        street: "LUMIYAP",
        barangay: "DIVISORIA",
        city: "ZAMBOANGA",
        province: "ZAMBOANGA DEL SUR",
        district: null,
        zipCode: 1700,
        isMailAddress: false,
      },
      {
        id: "ADD-124",
        addressType: "OFFICE",
        addressNo: "999",
        street: "EDSA",
        barangay: "VETERANCE VILLAGE",
        city: "QUEZON CITY",
        province: "METRO MANILA",
        district: null,
        zipCode: 1402,
        isMailAddress: true,
      },
    ] as Address[],
    planholderContact: [
      {
        personId: "1234",
        value: "+63-987-654-3210",
        type: "MobileNo",
      },
      {
        personId: "1234",
        value: "8-7000",
        type: "LandlineNo",
      },
    ],
    plans: [
      {
        lpaNumber: "L25048596I",
        planDescription: "ST. GEORGE",
        mode: "ANNUAL",
        term: 5.0,
        planClass: "REGULAR ACCOUNT",
        accountClass: "REGULAR ACCOUNT",
        planCode: "LG5A10",
        contractPrice: 53000.0,
        installmentAmount: 10600.0,
        totalAmountPayable: 53000.0,
        effectivityDate: new Date("2025-04-05T00:00:00"),
        newEffectivityDate: new Date("2025-04-05T00:00:00"),
        branch: "ZAMBOANGA EAST",
        cfpNumber: null,
        cfpDate: null,
        isServiceOnly: false,
        isInsured: true,
        accountStatus: "LAPSED",
        terminationStatus: "NOT YET TERMINATED",
        salesAgent1: "MARK KEVIN LEE",
        salesAgent2: "MARK KEVIN LEE",
      },
      {
        lpaNumber: "L25053102I",
        planDescription: "ST. GREGORY",
        mode: "MONTHLY",
        term: 5.0,
        planClass: "REGULAR ACCOUNT",
        accountClass: "REGULAR ACCOUNT",
        planCode: "G5M6",
        contractPrice: 57000.0,
        installmentAmount: 1100.0,
        totalAmountPayable: 66000.0,
        effectivityDate: new Date("2025-04-24T00:00:00"),
        newEffectivityDate: new Date("2025-04-24T00:00:00"),
        branch: "ZAMBOANGA WEST",
        cfpNumber: null,
        cfpDate: null,
        isServiceOnly: false,
        isInsured: true,
        accountStatus: "ACTIVE",
        terminationStatus: "NOT YET TERMINATED",
        salesAgent1: "MARK KEVIN LEE",
        salesAgent2: "MARK KEVIN LEE",
      },
    ] as PlanDetailType[],
  };

  useEffect(() => {
    // Demo behavior: treat visiting /account as an authenticated entry.
    login();
  }, [login]);

  return (
    <MessageDialogProvider>
      <Box
        mt={{ base: 32, md: 32 }}
        mb={{ base: 32, md: 32 }}
        px={{ base: 4, md: 8 }}
        maxW="7xl"
        mx="auto"
      >
        {/* <PlanholderProfilePage props={planholderProfileData} noLookup /> */}
      </Box>
    </MessageDialogProvider>
  );
};

export default Account;
