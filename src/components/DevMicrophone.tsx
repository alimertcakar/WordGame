import { Box, Button, Input } from "@chakra-ui/react";
import styled from "@emotion/styled";

/**
 * Input without microphone, for development.
 */
const DevMicrophone = () => {
  return (
    <>
      <BoxDevMicContainer>
        <div>
          <Input placeholder="Word" />
          <Button colorScheme="blue">Submit Word</Button>
        </div>
      </BoxDevMicContainer>
    </>
  );
};

export default DevMicrophone;

const BoxDevMicContainer = styled(Box)`
  & > div {
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  display: flex;
  justify-content: center;
`;
