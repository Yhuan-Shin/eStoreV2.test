import { ITransactionData } from "@/types/planholder";

export const createEmptyApplicationData = (): ITransactionData => ({
  personalInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthDate: "",
    idType: "",
    idNumber: "",
    height: 0,
    weight: 0,
    gender: "",
    civilStatus: "",
    nationality: "",
    mobileNumber: "",
    emailAddress: "",
    mailingAddress: "",
    landLineNumber: "",
    // addressLine1: "",
  },
  employment: {
    occupation: "",
    employerName: "",
    employmentStatus: "",
    officeAddress: "",
    TIN: "",
    SSS: "",
    sourceOfIncome: "",
  },
  address: {
    lot: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
    // addressLine: "",
  },
  beneficiaries: [],
  principalBeneficiary: undefined,
  contingentBeneficiary: undefined,
  healthDeclaration: {
    healthDeclaration1: false,
    healthDeclaration2: false,
    healthDeclaration3: false,
    healthDeclaration4: false,
  },
});

export const logApplicationData = (data: ITransactionData): void => {
  console.group("Complete Application Data");
  
  console.group("Personal Information");
  console.table({
    firstName: data.personalInfo.firstName,
    middleName: data.personalInfo.middleName,
    lastName: data.personalInfo.lastName,
    suffix: data.personalInfo.suffix,
    birthDate: data.personalInfo.birthDate,
    idType: data.personalInfo.idType,
    idNumber: data.personalInfo.idNumber,
    height: data.personalInfo.height,
    weight: data.personalInfo.weight,
    gender: data.personalInfo.gender,
    civilStatus: data.personalInfo.civilStatus,
    nationality: data.personalInfo.nationality,
    mobileNumber: data.personalInfo.mobileNumber,
    emailAddress: data.personalInfo.emailAddress,
    mailingAddress: data.personalInfo.mailingAddress,
    landLineNumber: data.personalInfo.landLineNumber,
    // addressLine1: data.personalInfo.addressLine1,
  });
  console.groupEnd();

  console.group("Employment Information");
  console.table(data.employment);
  console.groupEnd();

  console.group("Address Information");
  console.table({
    // addressLine: data.address.addressLine,
  });
  console.groupEnd();

  console.group("Beneficiaries");
  if (data.principalBeneficiary) {
    console.group("Principal Beneficiary");
    console.table(data.principalBeneficiary);
    console.groupEnd();
  }
  if (data.contingentBeneficiary) {
    console.group("Contingent Beneficiary");
    console.table(data.contingentBeneficiary);
    console.groupEnd();
  }
  if (data.beneficiaries.length > 0) {
    console.group("All Beneficiaries");
    console.table(data.beneficiaries);
    console.groupEnd();
  }
  console.groupEnd();

  console.group("Health Declaration");
  console.table(data.healthDeclaration);
  console.groupEnd();

  console.groupEnd(); // End main group
};

export const exportApplicationDataAsJSON = (data: ITransactionData): string => {
  return JSON.stringify(data, null, 2);
};

const STORAGE_KEY = "LifePlanApplication";

export const saveApplicationDataToLocalStorage = (
  data: ITransactionData
): void => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, jsonData);
    console.log("Application data saved to localStorage");
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const loadApplicationDataFromLocalStorage = (): ITransactionData | null => {
  try {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    if (jsonData) {
      const data = JSON.parse(jsonData) as ITransactionData;
      console.log("Application data loaded from localStorage");
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

export const clearApplicationDataFromLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("Application data cleared from localStorage");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
