import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gameSelector,
  GameStatus,
  Player,
  resetGame,
  startRound,
} from "src/slices/game";
import History from "../History";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

interface Props {}

const GameOver = (props: Props) => {
  const dispatch = useDispatch();
  const game = useSelector(gameSelector);
  const { lives } = game;
  const didPlayerWin = lives > 0;

  function playAgain() {
    dispatch(resetGame());
  }

  return (
    <div>
      <Flex justifyContent="center">
        <Box
          mt={3}
          border="1px"
          borderColor="blue.200"
          backgroundColor="blue.100"
          borderRadius="md"
          p={3}
        >
          <Heading as="h2" size="lg">
            Game Over
          </Heading>
          <Flex justifyContent="center" mt={2}>
            {didPlayerWin ? "You won!" : "Loser!"}
          </Flex>
        </Box>
      </Flex>
      <Flex justifyContent="center" mt={2}>
        <Button colorScheme="blue" onClick={playAgain}>
          Play Again
        </Button>
      </Flex>

      <History />
    </div>
  );
};

export default GameOver;
