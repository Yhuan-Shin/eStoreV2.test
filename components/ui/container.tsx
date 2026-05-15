import React from "react";
import { Box } from "st-peter-ui";
interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return (
    <Box
      px={{ base: 4, md: 0 }}
      mt={{ base: 24, md: 32 }}
      mb={{ base: 32, md: 16 }}
    >
      {children}
    </Box>
  );
};

export default Container;
