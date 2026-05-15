"use client";

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LoginPage } from "osp-chakra-reusable-components";
import React from "react";
import { LoginButton } from "st-peter-ui";

const Login = () => {
  const router = useRouter();
  return (
    <Box p={8} mt={8}>
      <LoginPage
        onLogin={() => router.push("/account")}
        onSignUp={function (
          email: string,
          password: string,
          firstname: string,
          lastname: string,
          middlename: string,
          contactnumber: string,
        ): void {
          throw new Error("Function not implemented.");
        }}
      ></LoginPage>
    </Box>
  );
};

export default Login;
