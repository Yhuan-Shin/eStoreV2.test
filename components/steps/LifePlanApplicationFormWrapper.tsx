// components/steps/LifePlanApplicationWrapper.tsx
"use client";

import LifePlanApplication1 from "./LifePlanApplication1";
import LifePlanApplication2 from "./LifePlanApplication2";
import LifePlanApplication3 from "./LifePlanApplication3";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { Tabs } from "@chakra-ui/react";
import { IoHomeOutline } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { useState, useEffect, useCallback } from "react";
import {
  IApplicationData,
  IAddress,
  IPersonalInfo,
  IEmployment,
} from "@/types/planholder";
import {
  createEmptyApplicationData,
  saveApplicationDataToLocalStorage,
  loadApplicationDataFromLocalStorage,
} from "@/lib/utils/applicationDataFactory";

const LifePlanApplicationFormWrapper = () => {
  const [applicationData, setApplicationData] = useState<IApplicationData>(
    createEmptyApplicationData(),
  );
  const [activeTab, setActiveTab] = useState("step1");

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadApplicationDataFromLocalStorage();
    if (savedData) {
      setApplicationData(savedData);
    }
  }, []);

  // Save to localStorage only when tab changes
  const handleTabChange = (details: any) => {
    // Save current data before switching tabs
    saveApplicationDataToLocalStorage(applicationData);
    console.log("Data saved to localStorage on tab change", applicationData);
    setActiveTab(details.value);
  };

  const handlePersonalInfoUpdate = useCallback(
    (personalInfo: IPersonalInfo) => {
      setApplicationData((prev) => ({
        ...prev,
        personalInfo,
      }));
    },
    [],
  );

  const handleAddressUpdate = useCallback((address: IAddress) => {
    setApplicationData((prev) => ({
      ...prev,
      address,
    }));
  }, []);

  const handleEmploymentUpdate = useCallback((employment: IEmployment) => {
    setApplicationData((prev) => ({
      ...prev,
      employment,
    }));
  }, []);
  return (
    <Tabs.Root value={activeTab} onValueChange={handleTabChange} variant="line">
      <Tabs.List>
        <Tabs.Trigger value="step1">
          <Flex align="center" gap={2}>
            <FaRegUser fontSize={24} />
            <Text>Personal Info</Text>
          </Flex>
        </Tabs.Trigger>

        <Tabs.Trigger value="step2">
          <Flex align="center" gap={2}>
            <IoHomeOutline />
            <Text>Residential Address</Text>
          </Flex>
        </Tabs.Trigger>
        <Tabs.Trigger value="step3">
          <Flex align="center" gap={2}>
            <BsPersonWorkspace />
            <Text>Employment</Text>
          </Flex>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="step1">
        <LifePlanApplication1 onUpdate={handlePersonalInfoUpdate} />
      </Tabs.Content>

      <Tabs.Content value="step2">
        <LifePlanApplication2 onAddressUpdate={handleAddressUpdate} />
      </Tabs.Content>

      <Tabs.Content value="step3">
        <LifePlanApplication3 onUpdate={handleEmploymentUpdate} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default LifePlanApplicationFormWrapper;
