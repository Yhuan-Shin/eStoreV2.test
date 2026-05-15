"use client";

import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CloseButton,
  Dialog,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  FiCopy,
  FiInfo,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
} from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import {
  AddButton,
  EditButton,
  H4,
  PrimaryMdButton,
  SecondaryMdButton,
} from "st-peter-ui";

type ProfileSummary = {
  accountNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

type ReferralData = {
  code: string;
  link: string;
  totalRewards: string;
  qrImageSrc?: string;
};

type PayoutRow = {
  channel: string;
  accountNo: string;
  branch: string;
};

type AgentRow = {
  referralCode: string;
  agentName: string;
  mobile: string;
  email: string;
};

const Profile = () => {
  const pageBg = useColorModeValue("white", "gray.950");
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const labelColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("gray.900", "gray.100");
  const softBg = useColorModeValue("gray.50", "whiteAlpha.50");

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const profile = useMemo<ProfileSummary>(
    () => ({
      accountNo: "SPLPI-01-123456789",
      firstName: "YHUAN SHIN",
      middleName: "FRANZA",
      lastName: "TEJIMA",
      email: "yhuanshin@email.com",
      phone: "+63 912 345 6789",
      address: "Makati City, Philippines",
    }),
    [],
  );

  const [email, setEmail] = useState(profile.email);
  const [mobile, setMobile] = useState(profile.phone);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState<"email" | "mobile" | null>(null);
  const [draftValue, setDraftValue] = useState("");

  const referral = useMemo<ReferralData>(
    () => ({
      code: "YHUAN1234-A",
      link: "https://online.stpeter.com",
      totalRewards: "₱ 0.00",
      // Optional: set this to a real generated QR image later.
      qrImageSrc: undefined,
    }),
    [],
  );

  const payouts = useMemo<PayoutRow[]>(
    () => [
      {
        channel: "BDO",
        accountNo: "0000-0000-0000",
        branch: "Makati",
      },
    ],
    [],
  );

  const agents = useMemo<AgentRow[]>(
    () => [
      {
        referralCode: "AGNT-1042",
        agentName: "Agent",
        mobile: "0917 000 0001",
        email: "agent@example.com",
      },
      {
        referralCode: "AGNT-2088",
        agentName: "Agent",
        mobile: "0917 000 0002",
        email: "agent@example.com",
      },
    ],
    [],
  );

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard may be blocked in some environments.
    }
  };

  const openEdit = (field: "email" | "mobile") => {
    setEditField(field);
    setDraftValue(field === "email" ? email : mobile);
    setEditDialogOpen(true);
  };

  const saveEdit = () => {
    if (editField === "email") setEmail(draftValue);
    if (editField === "mobile") setMobile(draftValue);
    setEditDialogOpen(false);
    setEditField(null);
  };

  const downloadQr = () => {
    if (!referral.qrImageSrc) return;
    const a = document.createElement("a");
    a.href = referral.qrImageSrc;
    a.download = "referral-qr.png";
    a.click();
  };

  const displayName = useMemo(() => {
    const parts = [profile.firstName, profile.middleName, profile.lastName]
      .map((p) => p.trim())
      .filter(Boolean);
    return parts.join(" ");
  }, [profile.firstName, profile.middleName, profile.lastName]);

  return (
    <Box bg={pageBg} minH="100vh">
      <Box
        mt={{ base: 32, md: 32 }}
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        pb={{ base: 32, md: 16 }}
      >
        <VStack align="stretch" gap={{ base: 4, md: 8 }}>
          {/* Header */}
          <HStack
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: 4, md: 8 }}
            mb={{ base: 4 }}
            wrap="wrap"
          >
            <HStack gap={{ base: 4, md: 8 }} align="center">
              <Avatar.Root size="xl">
                <Avatar.Fallback name={displayName} />
                <Avatar.Image src="/images/profile.jpg" />
              </Avatar.Root>

              <Box>
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="semibold"
                >
                  {displayName}
                </Text>
                <Text fontSize="sm" color={labelColor}>
                  Account: {profile.accountNo}
                </Text>
              </Box>
            </HStack>
          </HStack>

          {/* Content */}
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            <VStack align="stretch" gap={8}>
              {/* Account details */}
              <Card.Root
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                boxShadow="sm"
              >
                <Card.Header
                  px={{ base: 4, md: 8 }}
                  pt={{ base: 4, md: 8 }}
                  //   pb={4}
                >
                  <H4>Account details</H4>
                  <Text fontSize="sm" color={labelColor} mt={1}>
                    Your basic account information.
                  </Text>
                </Card.Header>
                <Card.Body px={{ base: 4, md: 8 }} pb={{ base: 4, md: 8 }}>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={4}
                  >
                    <KeyValue label="Account No." value={profile.accountNo} />
                    <KeyValue label="First Name" value={profile.firstName} />
                    <KeyValue label="Middle Name" value={profile.middleName} />
                    <KeyValue label="Last Name" value={profile.lastName} />
                    <Box></Box>
                    <PrimaryMdButton
                      w={{ base: "full", sm: "auto" }}
                      float={{ base: "none", md: "right" }}
                      mt={4}
                    >
                      CHANGE PASSWORD
                    </PrimaryMdButton>
                  </Grid>
                </Card.Body>
              </Card.Root>

              {/* My Payout (moved under Account details) */}
              <Card.Root
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                boxShadow="sm"
                overflow="hidden"
              >
                <Card.Header px={{ base: 4, md: 8 }} pt={{ base: 4, md: 8 }}>
                  <HStack
                    justify="space-between"
                    align="flex-start"
                    gap={4}
                    wrap="wrap"
                  >
                    <Box>
                      <H4>My Payout</H4>
                      <Text fontSize="sm" color={labelColor} mt={1}>
                        Add and manage your payout account details.
                      </Text>
                    </Box>
                    <Box display={{ base: "none", md: "block" }}>
                      <AddButton />
                    </Box>
                    <Button
                      display={{ base: "inline-flex", md: "none" }}
                      variant="ghost"
                      p={0}
                      minW="auto"
                      h="auto"
                      borderRadius="full"
                      aria-label="Add payout"
                    >
                      <Icon as={IoAddCircleOutline} boxSize={6} />
                    </Button>
                  </HStack>
                </Card.Header>
                <Card.Body px={{ base: 4, md: 8 }} pb={{ base: 4, md: 8 }}>
                  {/* Desktop/table view */}
                  <Box display={{ base: "none", md: "block" }}>
                    <Box
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <Grid
                        templateColumns="160px 1fr 1fr"
                        gap={0}
                        bg={softBg}
                        px={4}
                        py={3}
                      >
                        <Text
                          fontSize="xs"
                          color={labelColor}
                          fontWeight="semibold"
                        >
                          Channel
                        </Text>
                        <Text
                          fontSize="xs"
                          color={labelColor}
                          fontWeight="semibold"
                        >
                          Account No
                        </Text>
                        <Text
                          fontSize="xs"
                          color={labelColor}
                          fontWeight="semibold"
                        >
                          Branch
                        </Text>
                      </Grid>

                      {payouts.map((row, idx) => (
                        <Grid
                          key={`${row.channel}-${idx}`}
                          templateColumns="160px 1fr 1fr"
                          gap={0}
                          px={4}
                          py={3}
                          borderTopWidth="1px"
                          borderColor={borderColor}
                          _hover={{ bg: softBg }}
                          transition="background 150ms ease"
                        >
                          <Text
                            fontSize="sm"
                            color={valueColor}
                            fontWeight="medium"
                          >
                            {row.channel}
                          </Text>
                          <Text fontSize="sm" color={valueColor}>
                            {row.accountNo}
                          </Text>
                          <Text fontSize="sm" color={valueColor}>
                            {row.branch}
                          </Text>
                        </Grid>
                      ))}
                    </Box>
                  </Box>

                  {/* Mobile/stacked view */}
                  <VStack
                    align="stretch"
                    gap={3}
                    display={{ base: "flex", md: "none" }}
                  >
                    {payouts.map((row, idx) => (
                      <Box
                        key={`${row.channel}-${idx}-mobile`}
                        p={4}
                        borderWidth="1px"
                        borderColor={borderColor}
                        borderRadius="lg"
                        bg={softBg}
                      >
                        <VStack align="stretch" gap={2}>
                          <MiniKV label="Channel" value={row.channel} />
                          <MiniKV label="Account No" value={row.accountNo} />
                          <MiniKV label="Branch" value={row.branch} />
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Security & contact */}
              <Card.Root
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                boxShadow="sm"
              >
                <Card.Header
                  px={{ base: 4, md: 8 }}
                  pt={{ base: 4, md: 8 }}
                  //   pb={4}
                >
                  <H4>Security & contact</H4>
                  <Text fontSize="sm" color={labelColor} mt={1}>
                    Manage 2FA and view your contact details.
                  </Text>
                </Card.Header>
                <Card.Body px={{ base: 4, md: 8 }} pb={{ base: 4, md: 8 }}>
                  <VStack align="stretch" gap={4} mb={4}>
                    <ContactRow
                      icon={FiMail}
                      label="Email"
                      value={email}
                      labelColor={labelColor}
                      valueColor={valueColor}
                      action={
                        <>
                          <Box display={{ base: "none", md: "block" }}>
                            <EditButton onClick={() => openEdit("email")} />
                          </Box>
                          <Button
                            display={{ base: "inline-flex", md: "none" }}
                            variant="ghost"
                            p={0}
                            minW="auto"
                            h="auto"
                            borderRadius="full"
                            aria-label="Edit email"
                            onClick={() => openEdit("email")}
                          >
                            <Icon as={LuPencil} boxSize={4} />
                          </Button>
                        </>
                      }
                    />
                    <ContactRow
                      icon={FiPhone}
                      label="Phone"
                      value={mobile}
                      labelColor={labelColor}
                      valueColor={valueColor}
                      action={
                        <>
                          <Box display={{ base: "none", md: "block" }}>
                            <EditButton onClick={() => openEdit("mobile")} />
                          </Box>
                          <Button
                            display={{ base: "inline-flex", md: "none" }}
                            variant="ghost"
                            p={0}
                            minW="auto"
                            h="auto"
                            borderRadius="full"
                            aria-label="Edit mobile"
                            onClick={() => openEdit("mobile")}
                          >
                            <Icon as={LuPencil} boxSize={4} />
                          </Button>
                        </>
                        //   action={
                        //     <EditButton
                        //       size="sm"
                        //       variant="solid"
                        //       children="EDIT"
                        //       onClick={() => openEdit("mobile")}
                        //     >
                        //       EDIT
                        //     </EditButton>
                      }
                    />
                    <ContactRow
                      icon={FiMapPin}
                      label="Address"
                      value={profile.address}
                      labelColor={labelColor}
                      valueColor={valueColor}
                    />
                  </VStack>

                  <Dialog.Root
                    open={editDialogOpen}
                    onOpenChange={(details) => setEditDialogOpen(details.open)}
                  >
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content mx={{ base: 3, md: 0 }}>
                          <Dialog.CloseTrigger asChild>
                            <CloseButton
                              position="absolute"
                              top={3}
                              right={3}
                              zIndex={1}
                            />
                          </Dialog.CloseTrigger>

                          <Dialog.Header>
                            <Dialog.Title>
                              {editField === "email"
                                ? "Edit Email Address"
                                : "Edit Mobile Number"}
                            </Dialog.Title>
                          </Dialog.Header>

                          <Dialog.Body>
                            <VStack align="stretch" gap={3}>
                              <Text fontSize="sm" color={labelColor}>
                                {editField === "email"
                                  ? "Enter your new email address."
                                  : "Enter your new mobile number."}
                              </Text>
                              <Input
                                value={draftValue}
                                onChange={(e) => setDraftValue(e.target.value)}
                                placeholder={
                                  editField === "email"
                                    ? "name@example.com"
                                    : "+63 9xx xxx xxxx"
                                }
                              />
                            </VStack>
                          </Dialog.Body>

                          <Dialog.Footer>
                            <HStack justify="flex-end" gap={3} w="full">
                              <SecondaryMdButton
                                borderRadius="full"
                                onClick={() => {
                                  setEditDialogOpen(false);
                                  setEditField(null);
                                }}
                              >
                                CANCEL
                              </SecondaryMdButton>
                              <PrimaryMdButton
                                borderRadius="full"
                                onClick={saveEdit}
                              >
                                SAVE
                              </PrimaryMdButton>
                            </HStack>
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>

                  <Box
                    p={4}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="lg"
                    bg={softBg}
                  >
                    <HStack justify="space-between" align="center" gap={4}>
                      <Text fontSize="sm" color={labelColor}>
                        Two Factor Authentication
                      </Text>
                      <SwitchPill
                        enabled={twoFactorEnabled}
                        onToggle={() => setTwoFactorEnabled((v) => !v)}
                      />
                    </HStack>
                  </Box>

                  {/* <Button
                    mt={4}
                    variant="outline"
                    borderRadius="lg"
                    w="full"
                    onClick={() => setShowContact((v) => !v)}
                  >
                    <HStack gap={2}>
                      <Icon as={showContact ? FiChevronUp : FiChevronDown} />
                      <Text>
                        {showContact
                          ? "Hide contact info"
                          : "Show contact info"}
                      </Text>
                    </HStack>
                  </Button> */}

                  {/* {showContact && (
                    <VStack align="stretch" gap={3} mt={4}>
                      <ContactRow
                        icon={FiMail}
                        label="Email"
                        value={profile.email}
                        labelColor={labelColor}
                        valueColor={valueColor}
                      />
                      <ContactRow
                        icon={FiPhone}
                        label="Phone"
                        value={profile.phone}
                        labelColor={labelColor}
                        valueColor={valueColor}
                      />
                      <ContactRow
                        icon={FiMapPin}
                        label="Address"
                        value={profile.address}
                        labelColor={labelColor}
                        valueColor={valueColor}
                      />
                    </VStack>
                  )} */}
                </Card.Body>
              </Card.Root>
            </VStack>

            {/* Referral */}
            <Card.Root
              bg={cardBg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="xl"
              boxShadow="sm"
              overflow="hidden"
            >
              <Card.Header
                px={{ base: 4, md: 8 }}
                pt={{ base: 4, md: 8 }}
                // pb={4}
              >
                <HStack justify="space-between" align="center">
                  <HStack gap={2}>
                    <H4>Referral</H4>
                    <Icon
                      as={FiInfo}
                      color={useColorModeValue("gray.500", "gray.400")}
                    />
                  </HStack>
                </HStack>
                <Text fontSize="sm" color={labelColor} mt={1}>
                  Share your referral code or link.
                </Text>
              </Card.Header>

              <Card.Body px={{ base: 4, md: 8 }} pb={{ base: 4, md: 8 }}>
                <VStack align="stretch" gap={4}>
                  <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={4}>
                    <LabeledCopyField
                      label="Code"
                      value={referral.code}
                      onCopy={() => copyText(referral.code)}
                    />
                    <LabeledCopyField
                      label="Link"
                      value={referral.link}
                      onCopy={() => copyText(referral.link)}
                    />
                  </Grid>

                  <Box>
                    <Text fontSize="sm" color={labelColor} mb={2}>
                      QR Code
                    </Text>
                    <Box
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="lg"
                      p={4}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg={softBg}
                      minH={{ base: "220px", md: "260px" }}
                    >
                      {referral.qrImageSrc ? (
                        <Image
                          src={referral.qrImageSrc}
                          alt="Referral QR code"
                          maxH="220px"
                          objectFit="contain"
                        />
                      ) : (
                        <VStack gap={2}>
                          <Icon
                            as={FiShield}
                            color={useColorModeValue("gray.500", "gray.400")}
                          />
                          <Text
                            fontSize="sm"
                            color={labelColor}
                            textAlign="center"
                          >
                            QR code will appear here
                          </Text>
                        </VStack>
                      )}
                    </Box>

                    <Button
                      mt={3}
                      size="sm"
                      colorPalette="orange"
                      onClick={downloadQr}
                      disabled={!referral.qrImageSrc}
                    >
                      DOWNLOAD
                    </Button>
                  </Box>

                  <Box
                    p={4}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="lg"
                    bg={softBg}
                  >
                    <HStack justify="space-between" align="center" gap={4}>
                      <Text fontSize="sm" color={labelColor}>
                        Total Rewards
                      </Text>
                      <Text
                        fontSize="xl"
                        fontWeight="semibold"
                        color={useColorModeValue("green.700", "green.300")}
                      >
                        {referral.totalRewards}
                      </Text>
                    </HStack>
                    <Button
                      variant="ghost"
                      p={0}
                      h="auto"
                      mt={2}
                      fontWeight="medium"
                      color={useColorModeValue("green.700", "green.300")}
                      justifyContent="flex-start"
                    >
                      View My Referral
                    </Button>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Grid>

          {/* Agents */}
          <Grid templateColumns={{ base: "1fr", lg: "1fr" }} gap={8}>
            <Card.Root
              bg={cardBg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="xl"
              boxShadow="sm"
              overflow="hidden"
            >
              <Card.Header px={{ base: 4, md: 8 }} pt={{ base: 4, md: 8 }}>
                <H4>My Agent/s</H4>
              </Card.Header>
              <Card.Body px={{ base: 4, md: 8 }} pb={{ base: 4, md: 8 }}>
                {/* Desktop/table view */}
                <Box display={{ base: "none", md: "block" }}>
                  <Box
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Grid
                      templateColumns="160px 1.5fr 140px 1.7fr 120px"
                      gap={0}
                      bg={softBg}
                      px={4}
                      py={3}
                    >
                      <Text
                        fontSize="xs"
                        color={labelColor}
                        fontWeight="semibold"
                      >
                        Referral Code
                      </Text>
                      <Text
                        fontSize="xs"
                        color={labelColor}
                        fontWeight="semibold"
                      >
                        Agent Name
                      </Text>
                      <Text
                        fontSize="xs"
                        color={labelColor}
                        fontWeight="semibold"
                      >
                        Mobile
                      </Text>
                      <Text
                        fontSize="xs"
                        color={labelColor}
                        fontWeight="semibold"
                      >
                        Email Address
                      </Text>
                      <Text
                        fontSize="xs"
                        color={labelColor}
                        fontWeight="semibold"
                      >
                        Action
                      </Text>
                    </Grid>

                    {agents.map((row, idx) => (
                      <Grid
                        key={`${row.referralCode}-${idx}`}
                        templateColumns="160px 1.5fr 140px 1.7fr 120px"
                        gap={0}
                        px={4}
                        py={3}
                        borderTopWidth="1px"
                        borderColor={borderColor}
                        _hover={{ bg: softBg }}
                        transition="background 150ms ease"
                        alignItems="center"
                      >
                        <Text
                          fontSize="sm"
                          color={valueColor}
                          fontWeight="medium"
                        >
                          {row.referralCode}
                        </Text>
                        <Text fontSize="sm" color={valueColor}>
                          {row.agentName}
                        </Text>
                        <Text fontSize="sm" color={valueColor}>
                          {row.mobile}
                        </Text>
                        <Text fontSize="sm" color={valueColor}>
                          {row.email}
                        </Text>
                        <Button
                          size="sm"
                          colorPalette="orange"
                          borderRadius="full"
                        >
                          REMOVE
                        </Button>
                      </Grid>
                    ))}
                  </Box>
                </Box>

                {/* Mobile/stacked view */}
                <VStack
                  align="stretch"
                  gap={3}
                  display={{ base: "flex", md: "none" }}
                >
                  {agents.map((row, idx) => (
                    <Box
                      key={`${row.referralCode}-${idx}-mobile`}
                      p={4}
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="lg"
                      bg={softBg}
                    >
                      <VStack align="stretch" gap={2}>
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color={valueColor}
                        >
                          {row.agentName}
                        </Text>
                        <MiniKV
                          label="Referral Code"
                          value={row.referralCode}
                        />
                        <MiniKV label="Mobile" value={row.mobile} />
                        <MiniKV label="Email" value={row.email} />
                        <Button
                          mt={2}
                          size="sm"
                          colorPalette="orange"
                          borderRadius="full"
                          w="full"
                        >
                          REMOVE
                        </Button>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>
          </Grid>
        </VStack>
      </Box>
    </Box>
  );
};

function MiniKV(props: { label: string; value: string }) {
  const labelColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("gray.900", "gray.100");

  return (
    <HStack justify="space-between" gap={4}>
      <Text fontSize="xs" color={labelColor} fontWeight="medium">
        {props.label}
      </Text>
      <Text fontSize="sm" color={valueColor} textAlign="right">
        {props.value}
      </Text>
    </HStack>
  );
}

function KeyValue(props: { label: string; value: string }) {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const labelColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("gray.900", "gray.100");
  const bg = useColorModeValue("gray.50", "whiteAlpha.50");

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={bg}
    >
      <Text fontSize="xs" color={labelColor} fontWeight="medium">
        {props.label}
      </Text>
      <Text mt={1} fontSize="sm" color={valueColor} fontWeight="semibold">
        {props.value}
      </Text>
    </Box>
  );
}

function SwitchPill(props: { enabled: boolean; onToggle: () => void }) {
  return (
    <HStack gap={3}>
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color={props.enabled ? "green.700" : "gray.500"}
      >
        {props.enabled ? "ON" : "OFF"}
      </Text>

      <Box
        role="switch"
        aria-checked={props.enabled}
        tabIndex={0}
        onClick={props.onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            props.onToggle();
          }
        }}
        w="56px"
        h="28px"
        borderRadius="full"
        bg={props.enabled ? "green.600" : "red.500"}
        position="relative"
        transition="background 150ms ease"
        cursor="pointer"
        outline="none"
      >
        <Box
          position="absolute"
          top="3px"
          left={props.enabled ? "30px" : "3px"}
          w="22px"
          h="22px"
          borderRadius="full"
          bg="white"
          transition="left 150ms ease"
        />
      </Box>
    </HStack>
  );
}

function ContactRow(props: {
  icon: React.ElementType;
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
  action?: React.ReactNode;
}) {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  return (
    <Box
      p={3}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={useColorModeValue("white", "gray.900")}
    >
      <HStack gap={3} align="start" justify="space-between">
        <HStack gap={3} align="start" flex="1">
          <Icon
            as={props.icon}
            mt={0.5}
            color={useColorModeValue("gray.600", "gray.300")}
          />
          <Box>
            <Text fontSize="xs" color={props.labelColor} fontWeight="medium">
              {props.label}
            </Text>
            <Text fontSize="sm" color={props.valueColor}>
              {props.value}
            </Text>
          </Box>
        </HStack>

        {props.action ? <Box mt={0.5}>{props.action}</Box> : null}
      </HStack>
    </Box>
  );
}

function LabeledCopyField(props: {
  label: string;
  value: string;
  onCopy: () => void;
}) {
  const labelColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box>
      <Text fontSize="sm" color={labelColor} mb={2}>
        {props.label}
      </Text>
      <HStack gap={2} align="center">
        <Input value={props.value} readOnly />
        <Button
          size="sm"
          colorPalette="orange"
          onClick={props.onCopy}
          aria-label={`Copy ${props.label}`}
        >
          <Icon as={FiCopy} />
          COPY
        </Button>
      </HStack>
    </Box>
  );
}

export default Profile;
