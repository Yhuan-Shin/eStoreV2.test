"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CloseButton,
  Dialog,
  Flex,
  Grid,
  HStack,
  Icon,
  Portal,
  Separator,
  Span,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  H4,
  Small,
  Body,
  CancelButton,
  ConfirmButton,
  H3,
  EditButton,
} from "st-peter-ui";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkboxList } from "@/data/checkBoxList";
import { CartItem } from "@/types/cartItem";
import { ITransactionData } from "@/types/planholder";
import { LuPencil } from "react-icons/lu";

export type ConfirmationProps = {
  onAllAcceptedChange?: (allAccepted: boolean) => void;
};

const modeLabel = (mode?: string) => {
  switch (mode) {
    case "M":
      return "Monthly";
    case "Q":
      return "Quarterly";
    case "S":
      return "Semi-Annual";
    case "A":
      return "Annual";
    case "C":
      return "Cash";
    default:
      return mode || "-";
  }
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <VStack gap={1} align="start" minW={0}>
    <Small color="gray.500">{label}</Small>
    <Body>
      <Span fontWeight="semibold">{value}</Span>
    </Body>
  </VStack>
);

const InfoTile = ({
  // icon,
  label,
  value,
}: {
  // icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => {
  const isMissing = value === "-" || value === null || value === undefined;

  return (
    <Box
      p={4}
      rounded="lg"
      transition="all 0.15s ease"
      _hover={{ bg: "gray.100" }}
    >
      <HStack align="start" gap={3} minW={0}>
        {/* <Icon boxSize={4} color="gray.700" mt={0.5}>
          {icon}
        </Icon> */}
        <Box minW={0} flex="1">
          <Small color="gray.500">{label}</Small>
          <Body>
            <Span
              fontWeight="semibold"
              color={isMissing ? "gray.400" : "gray.900"}
            >
              {value}
            </Span>
          </Body>
        </Box>
      </HStack>
    </Box>
  );
};

const SectionCardHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <Flex align="center" gap={2}>
    <Icon boxSize={5}>{icon}</Icon>
    <H4>{title}</H4>
  </Flex>
);

const Confirmation = ({ onAllAcceptedChange }: ConfirmationProps) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [lifePlanApplication, setLifePlanApplication] =
    useState<ITransactionData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingCheck, setPendingCheck] = useState<number | null>(null);
  const [acceptedAgreements, setAcceptedAgreements] = useState<boolean[]>(() =>
    checkboxList.map(() => false),
  );

  useEffect(() => {
    try {
      const checkoutStored = sessionStorage.getItem("CheckoutCart");
      const cartStored = sessionStorage.getItem("Cart");

      const lifePlanApplicationStored = localStorage.getItem(
        "LifePlanApplication",
      );
      console.log(
        "Raw LifePlanApplication from localStorage:",
        lifePlanApplicationStored,
      );

      const parsedApplicationData = lifePlanApplicationStored
        ? (JSON.parse(lifePlanApplicationStored) as ITransactionData)
        : null;

      console.log("Parsed LifePlanApplication data:", parsedApplicationData);
      setLifePlanApplication(parsedApplicationData);

      if (checkoutStored) {
        const parsedCheckout = JSON.parse(checkoutStored);
        setCartItems(
          Array.isArray(parsedCheckout) ? parsedCheckout : [parsedCheckout],
        );
        return;
      }

      if (cartStored) {
        const parsedCart = JSON.parse(cartStored);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } else {
        setCartItems([]);
      }
    } catch (e) {
      console.error("Failed to read Cart from sessionStorage", e);
      setCartItems([]);
    }
  }, []);

  const selectedPlan = cartItems && cartItems.length > 0 ? cartItems[0] : null;

  const acceptedCount = acceptedAgreements.filter(Boolean).length;
  const allAccepted =
    checkboxList.length > 0 && acceptedCount === checkboxList.length;

  const pendingAgreement =
    pendingCheck !== null ? checkboxList[pendingCheck] : null;

  useEffect(() => {
    onAllAcceptedChange?.(allAccepted);
  }, [allAccepted, onAllAcceptedChange]);

  const beneficiaries = [
    {
      name: "John Doe",
      relationship: "Relative",
      dob: "1990-11-02",
      address: "Sample Street, Sample Barangay, Sample City",
    },
    {
      name: "Jane Smith",
      relationship: "Relative",
      dob: "1992-04-15",
      address: "Sample Avenue, Sample District, Sample City",
    },
  ];

  const confirmAgreement = () => {
    if (pendingCheck === null) return;
    setAcceptedAgreements((prev) => {
      const copy = [...prev];
      copy[pendingCheck] = true;
      return copy;
    });
    setOpenDialog(false);
    setPendingCheck(null);
  };

  return (
    <Box minH="100vh">
      {/* <Box
        px={{ base: 4, md: 6 }}
        pt={{ base: 6, md: 8 }}
        pb={{ base: 3, md: 4 }}
      >
        <H3>Review &amp; Confirmation</H3>
        <Small color="gray.600">f
          Review your details carefully before proceeding to payment.
        </Small>
      </Box> */}

      <Box px={{ base: 2, md: 8 }} pb={{ base: 4, md: 8 }}>
        <VStack align="stretch" gap={{ base: 4, md: 8 }}>
          {/* Order Summary */}
          <Card.Root
            bg="white"
            shadow="sm"
            borderWidth="1px"
            rounded="xl"
            overflow="hidden"
          >
            <Card.Header py={4} px={{ base: 4, md: 8 }} borderBottomWidth="1px">
              <Flex justify="space-between" align="center" gap={4} wrap="wrap">
                <SectionCardHeader
                  icon={<FaRegAddressCard />}
                  title="Order Summary"
                />
                <Badge
                  variant="subtle"
                  colorPalette={selectedPlan?.mode === "C" ? "green" : "green"}
                >
                  {modeLabel(selectedPlan?.mode)}
                </Badge>
              </Flex>
            </Card.Header>
            <Card.Body px={{ base: 4, md: 8 }} py={{ base: 4, md: 8 }}>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                }}
                gap={4}
              >
                <Box
                  p={4}
                  rounded="lg"
                  transition="all 0.15s ease"
                  _hover={{ bg: "gray.100" }}
                >
                  <Small color="gray.500">Selected Plan</Small>
                  <Body>
                    <Span fontWeight="semibold">
                      {selectedPlan ? selectedPlan.planDesc : "-"}
                    </Span>
                  </Body>
                </Box>
                <Box
                  p={4}
                  rounded="lg"
                  transition="all 0.15s ease"
                  _hover={{ bg: "gray.100" }}
                >
                  <Small color="gray.500">Quantity</Small>
                  <Body>
                    <Span fontWeight="semibold">
                      {selectedPlan ? selectedPlan.quantity : "-"}
                    </Span>
                  </Body>
                </Box>
                <Box
                  p={4}
                  rounded="lg"
                  transition="all 0.15s ease"
                  _hover={{ bg: "gray.100" }}
                >
                  <Small color="gray.500">Total Amount Payable</Small>
                  <Text fontWeight="semibold" color="gray.900">
                    {selectedPlan ? `₱ ${selectedPlan.total}` : "-"}
                  </Text>
                  {/* <Text fontSize="sm" color="gray.600">
                    Taxes and fees may apply.
                  </Text> */}
                </Box>
              </Grid>
            </Card.Body>
          </Card.Root>

          {/* Life Plan Application */}
          <Card.Root
            bg="white"
            shadow="sm"
            borderWidth="1px"
            rounded="xl"
            overflow="hidden"
          >
            <Card.Header py={4} px={{ base: 4, md: 6 }} borderBottomWidth="1px">
              <Flex justify="space-between" align="center" gap={4} wrap="wrap">
                <SectionCardHeader
                  icon={<FaRegUser />}
                  title="Life Plan Application"
                />
                <Box display={{ base: "none", md: "block" }}>
                  <EditButton
                    onClick={() => router.push("/lifeplan-application")}
                  />
                </Box>
                <Button
                  display={{ base: "inline-flex", md: "none" }}
                  variant="ghost"
                  p={0}
                  minW="auto"
                  h="auto"
                  borderRadius="full"
                  aria-label="Edit email"
                  onClick={() => router.push("/lifeplan-application")}
                >
                  <Icon as={LuPencil} boxSize={4} />
                </Button>

                {/* <Button
                  variant="outline"
                  size="sm"
                  rounded="full"
                  onClick={() => router.push("/lifeplan-application")}
                >
                  EDIT
                </Button> */}
              </Flex>
            </Card.Header>
            <Card.Body px={{ base: 4, md: 6 }} py={{ base: 5, md: 6 }}>
              <Tabs.Root defaultValue="personal" variant="line">
                <Tabs.List
                  // flexDirection={{ base: "row" }}
                  // overflowY={{ base: "hidden", md: "hidden" }}
                  // maxH={{ base: "40vh", md: "none" }}
                  // maxW="full"
                  gap={{ base: 1, md: 2 }}
                >
                  <Tabs.Trigger
                    value="personal"
                    flexShrink={0}
                    minW="max-content"
                    px={{ base: 4, md: 4 }}
                    // py={2}
                  >
                    <Flex align="center" gap={2}>
                      <Icon
                        boxSize={4}
                        color="gray.700"
                        display={{ base: "none", sm: "inline-flex" }}
                      >
                        <FaRegUser />
                      </Icon>
                      <Text
                        whiteSpace="nowrap"
                        fontSize={{ base: "xs", md: "md" }}
                      >
                        Personal Info
                      </Text>
                    </Flex>
                  </Tabs.Trigger>

                  <Tabs.Trigger
                    value="residential"
                    flexShrink={0}
                    minW="max-content"
                    px={{ base: 3, md: 4 }}
                    // py={2}
                  >
                    <Flex align="center" gap={2}>
                      <Icon
                        boxSize={4}
                        color="gray.700"
                        display={{ base: "none", sm: "inline-flex" }}
                      >
                        <FaRegAddressCard />
                      </Icon>
                      <Text
                        whiteSpace="nowrap"
                        fontSize={{ base: "xs", md: "md" }}
                      >
                        Residential Address
                      </Text>
                    </Flex>
                  </Tabs.Trigger>

                  <Tabs.Trigger
                    value="employment"
                    flexShrink={0}
                    minW="max-content"
                    px={{ base: 3, md: 4 }}
                    py={2}
                  >
                    <Flex align="center" gap={2}>
                      <Icon
                        boxSize={4}
                        color="gray.700"
                        display={{ base: "none", sm: "inline-flex" }}
                      >
                        <IoIosInformationCircleOutline />
                      </Icon>
                      <Text
                        whiteSpace="nowrap"
                        fontSize={{ base: "xs", md: "md" }}
                      >
                        Employment
                      </Text>
                    </Flex>
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="personal">
                  <Box py={8}>
                    <Grid
                      templateColumns={{
                        base: "repeat(2,1fr)",
                        md: "repeat(3,1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                      gap={4}
                    >
                      <InfoTile
                        // icon={<FaRegAddressCard />}
                        label="Uploaded ID"
                        value={lifePlanApplication?.personalInfo.idType || "-"}
                      />
                      <InfoTile
                        // icon={<FaRegUser />}
                        label="Last Name"
                        value={
                          lifePlanApplication?.personalInfo.lastName || "-"
                        }
                      />
                      <InfoTile
                        // icon={<FaRegUser />}
                        label="First Name"
                        value={
                          lifePlanApplication?.personalInfo.firstName || "-"
                        }
                      />
                      <InfoTile
                        // icon={<FaRegUser />}
                        label="Middle Name"
                        value={
                          lifePlanApplication?.personalInfo.middleName || "-"
                        }
                      />
                      <InfoTile
                        // icon={<FaRegUser />}
                        label="Suffix"
                        value={lifePlanApplication?.personalInfo.suffix || "-"}
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Date of Birth"
                        value={
                          lifePlanApplication?.personalInfo.birthDate || "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Gender"
                        value={lifePlanApplication?.personalInfo.gender || "-"}
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Contact Number"
                        value={
                          lifePlanApplication?.personalInfo.mobileNumber || "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Email"
                        value={
                          lifePlanApplication?.personalInfo.emailAddress || "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Landline Number"
                        value={
                          lifePlanApplication?.personalInfo.landLineNumber ||
                          "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Mailing Address"
                        value={
                          lifePlanApplication?.personalInfo.mailingAddress ||
                          "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Civil Status"
                        value={
                          lifePlanApplication?.personalInfo.civilStatus || "-"
                        }
                      />
                    </Grid>
                  </Box>
                </Tabs.Content>

                <Tabs.Content value="residential">
                  <Box py={8}>
                    <Grid
                      templateColumns={{
                        base: "repeat(2,1fr)",
                        md: "repeat(3,1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                      gap={4}
                    >
                      <InfoTile
                        // icon={<FaRegAddressCard />}
                        label="Lot #"
                        value={lifePlanApplication?.address.lot || "-"}
                      />
                      <InfoTile
                        // icon={<FaRegAddressCard />}
                        label="Street"
                        value={lifePlanApplication?.address.street || "-"}
                      />
                      <InfoTile
                        // icon={<FaRegAddressCard />}
                        label="Barangay"
                        value={lifePlanApplication?.address.barangay || "-"}
                      />
                      <InfoTile
                        // icon={<FaRegAddressCard />}
                        label="City"
                        value={lifePlanApplication?.address.city || "-"}
                      />
                      <InfoTile
                        // icon={<FaRegAddressCard />}
                        label="Province"
                        value={lifePlanApplication?.address.province || "-"}
                      />
                    </Grid>
                  </Box>
                </Tabs.Content>

                <Tabs.Content value="employment">
                  <Box py={8}>
                    <Grid
                      templateColumns={{
                        base: "repeat(2,1fr)",
                        md: "repeat(3,1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                      gap={4}
                    >
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Occupation"
                        value={
                          lifePlanApplication?.employment.occupation || "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Employer Name"
                        value={
                          lifePlanApplication?.employment.employerName || "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Employment Status"
                        value={
                          lifePlanApplication?.employment.employmentStatus ||
                          "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Office Address"
                        value={
                          lifePlanApplication?.employment.officeAddress || "-"
                        }
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="TIN"
                        value={lifePlanApplication?.employment.TIN || "-"}
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="SSS/GSIS"
                        value={lifePlanApplication?.employment.SSS || "-"}
                      />
                      <InfoTile
                        // icon={<IoIosInformationCircleOutline />}
                        label="Source of Income"
                        value={
                          lifePlanApplication?.employment.sourceOfIncome || "-"
                        }
                      />
                    </Grid>
                  </Box>
                </Tabs.Content>
              </Tabs.Root>
            </Card.Body>
          </Card.Root>

          {/* Beneficiaries */}
          <Card.Root
            bg="white"
            shadow="sm"
            borderWidth="1px"
            rounded="xl"
            overflow="hidden"
          >
            <Card.Header py={4} px={{ base: 4, md: 6 }} borderBottomWidth="1px">
              <SectionCardHeader
                icon={<FaRegAddressCard />}
                title="Beneficiaries"
              />
            </Card.Header>
            <Card.Body px={{ base: 4, md: 6 }} py={{ base: 5, md: 6 }}>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                {beneficiaries.map((b, idx) => (
                  <Card.Root
                    key={`${b.name}-${idx}`}
                    bg="white"
                    borderWidth="1px"
                    rounded="xl"
                    overflow="hidden"
                    transition="all 0.15s ease"
                    _hover={{ shadow: "sm" }}
                  >
                    <Card.Body p={5}>
                      <Flex justify="space-between" align="start" gap={4}>
                        <HStack gap={3} minW={0}>
                          <Avatar.Root size="sm">
                            <Avatar.Fallback name={b.name} />
                          </Avatar.Root>
                          <Box minW={0}>
                            <Text fontWeight="semibold" lineClamp={1}>
                              {b.name}
                            </Text>
                            <HStack gap={2} mt={1} wrap="wrap">
                              <Badge variant="subtle" colorPalette="green">
                                {b.relationship}
                              </Badge>
                              <Text fontSize="sm" color="gray.600">
                                {b.dob}
                              </Text>
                            </HStack>
                          </Box>
                        </HStack>
                      </Flex>

                      <Box
                        mt={4}
                        p={4}
                        borderWidth="1px"
                        rounded="lg"
                        bg="gray.50"
                      >
                        <Small color="gray.500">Address</Small>
                        <Text
                          fontSize="sm"
                          color="gray.800"
                          mt={1}
                          lineClamp={3}
                        >
                          {b.address}
                        </Text>
                      </Box>
                    </Card.Body>
                  </Card.Root>
                ))}
              </Grid>
            </Card.Body>
          </Card.Root>

          {/* Confirmation Agreements */}
          <Card.Root
            bg="white"
            shadow="sm"
            borderWidth="1px"
            rounded="xl"
            overflow="hidden"
          >
            <Card.Header py={4} px={{ base: 4, md: 6 }} borderBottomWidth="1px">
              <Flex justify="space-between" align="center" gap={4} wrap="wrap">
                <SectionCardHeader
                  icon={<IoIosInformationCircleOutline />}
                  title="Agreements"
                />
                <Badge
                  variant="solid"
                  backgroundColor="green.100"
                  color="black"
                  colorPalette={allAccepted ? "green" : "gray"}
                >
                  {acceptedCount}/{checkboxList.length} accepted
                </Badge>
              </Flex>
            </Card.Header>
            <Card.Body px={{ base: 4, md: 6 }} py={{ base: 5, md: 6 }}>
              <VStack align="stretch" gap={3}>
                {checkboxList.map((item, index) => {
                  const isAccepted = acceptedAgreements[index];
                  return (
                    <Box
                      key={index}
                      role="button"
                      tabIndex={0}
                      p={4}
                      borderWidth="1px"
                      rounded="xl"
                      bg={isAccepted ? "green.50" : "gray.50"}
                      transition="all 0.15s ease"
                      _hover={{ bg: isAccepted ? "green.100" : "gray.100" }}
                      onClick={() => {
                        setPendingCheck(index);
                        setOpenDialog(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPendingCheck(index);
                          setOpenDialog(true);
                        }
                      }}
                    >
                      <Flex justify="space-between" align="start" gap={4}>
                        <Box flex="1" minW={0}>
                          <Text fontWeight="semibold" lineClamp={2}>
                            {item.checkBoxTitle}.
                          </Text>
                          <Text
                            fontSize="sm"
                            color="gray.600"
                            mt={1}
                            lineClamp={1}
                          >
                            Tap to review details.
                          </Text>
                        </Box>
                        <Badge
                          variant="subtle"
                          colorPalette={isAccepted ? "green" : "gray"}
                        >
                          {isAccepted ? "Accepted" : "Review"}
                        </Badge>
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Agreement Dialog */}
          <Dialog.Root
            open={openDialog}
            onOpenChange={(details) => setOpenDialog(details.open)}
            size={{ mdDown: "full", md: "xl" }}
            scrollBehavior="inside"
          >
            <Portal>
              <Dialog.Backdrop backdropFilter="blur(6px)" />
              <Dialog.Positioner>
                <Dialog.Content
                  bg="white"
                  rounded="xl"
                  shadow="lg"
                  overflow="hidden"
                >
                  <Dialog.CloseTrigger asChild>
                    <CloseButton position="absolute" top={3} right={3} />
                  </Dialog.CloseTrigger>

                  <Dialog.Header
                    px={{ base: 4, md: 6 }}
                    pt={{ base: 5, md: 6 }}
                  >
                    <H3>
                      {pendingCheck !== null
                        ? pendingAgreement?.title || "Agreement"
                        : "Agreement"}
                    </H3>
                    <Text fontSize="sm" color="gray.600" mt={2}>
                      Please read carefully. Confirm to accept this agreement.
                    </Text>
                  </Dialog.Header>

                  <Dialog.Body px={{ base: 4, md: 6 }} pb={{ base: 5, md: 6 }}>
                    <Box p={4} borderWidth="1px" rounded="lg" bg="gray.50">
                      <Text
                        whiteSpace="pre-wrap"
                        fontSize="sm"
                        color="gray.800"
                      >
                        {pendingCheck !== null
                          ? pendingAgreement?.description ||
                            "Please review and confirm before proceeding."
                          : "Please review and confirm before proceeding."}
                      </Text>
                    </Box>
                  </Dialog.Body>

                  <Dialog.Footer
                    px={{ base: 4, md: 6 }}
                    pb={{ base: 5, md: 6 }}
                  >
                    <HStack justify="flex-end" gap={3} w="full">
                      <CancelButton
                        onClick={() => {
                          setOpenDialog(false);
                          setPendingCheck(null);
                        }}
                      />
                      <ConfirmButton onClick={confirmAgreement} />
                    </HStack>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </VStack>
      </Box>
    </Box>
  );
};

export default Confirmation;
