import { Box, Button, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useState } from "react";
import { playRound } from "src/slices/game";

/**
 * Input without microphone, for development.
 */
const DevMicrophone = () => {
  const dispatch = useDispatch();
  const [word, setWord] = useState("");

  function play() {
    dispatch(playRound(word));
  }

  return (
    <>
      <BoxDevMicContainer>
        <div>
          <Input placeholder="Word" onChange={(e) => setWord(e.target.value)} />
          <Button colorScheme="blue" onClick={play}>
            Submit Word
          </Button>
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
