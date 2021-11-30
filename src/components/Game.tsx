import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Countdown from "react-countdown";
import useGameEngine, { Player } from "src/hooks/useGameEngine";
import Recognition from "src/util/audio/Recognition";
import Utterance from "src/util/audio/Utterance";
import CountdownRenderer from "./CountdownRenderer";
import Microphone from "./Microphone";

interface Props {}

const Game = (props: Props) => {
  const { state, nextRound } = useGameEngine();

  const { currentWord, currentPlayer, round, roundEnd } = state;

  return (
    <DivContainer>
      <BoxCurrentWord p={3} color="white">
        <BoxCurrentRound>Round: {round}</BoxCurrentRound>
        <Box fontSize="sm" textTransform="uppercase" color="gray.300">
          Current Word
        </Box>
        <Box fontWeight="bold" textTransform="capitalize">
          {currentWord}
        </Box>
      </BoxCurrentWord>

      <BoxTurn pt={10}>
        <Box fontSize="xl" fontWeight="medium">
          {currentPlayer === Player.Player ? "Your" : "Computers"} turn
        </Box>
        <div>
          <Microphone state={state} />
        </div>
        <Box>
          <Countdown date={roundEnd} key={round} renderer={CountdownRenderer} />
        </Box>
      </BoxTurn>
    </DivContainer>
  );
};

export default Game;

const DivContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const BoxCurrentWord = styled(Box)`
  background: #444;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const BoxTurn = styled(Box)`
  flex-direction: column;
  & > div {
    text-align: center;
  }
`;

const BoxCurrentRound = styled(Box)`
  position: absolute;
  left: 10px;
  flex-direction: column;
  & > div {
    text-align: center;
  }
`;
