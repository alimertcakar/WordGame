import { Box } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import React from "react";

interface Props {
  seconds: number;
}

const CountdownRenderer = (props: Props) => {
  const { seconds } = props;
  if (seconds < 6) {
    return (
      <Box mt={4} fontWeight="bold" color="red.500">
        {seconds} seconds left
      </Box>
    );
  }
  return (
    <Box mt={4} fontWeight="bold" color="gray.600">
      {seconds} seconds left
    </Box>
  );
};

export default CountdownRenderer;
