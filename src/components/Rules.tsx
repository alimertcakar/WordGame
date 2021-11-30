import { Box, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

interface Props {}
// TODO OPEN RULES MODAL
const Rules = (props: Props) => {
  return (
    <FlexRules
      justifyContent="center"
      color="blue.600"
      fontWeight="bold"
      textDecoration="underline"
    >
      Rules?
    </FlexRules>
  );
};

export default Rules;

const FlexRules = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`;
