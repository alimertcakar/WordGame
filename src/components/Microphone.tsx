import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GameState, Player } from "src/hooks/useGameEngineOld";
import { gameSelector, GameStatus } from "src/slices/game";
import DevMicrophone from "./DevMicrophone";

interface Props {}
const isDev = process.env.NODE_ENV === "development";

const Microphone = ({}: Props) => {
  const state = useSelector(gameSelector);
  console.log(state, "game");
  // const playersTurn = state.currentPlayer === Player.Player;

  // if (state.status !== GameStatus.Playing) {
  //   return null;
  // }

  const playersTurn = true;

  return (
    <>
      {isDev && <DevMicrophone />}
      <Box display="flex" justifyContent="center" mt={4}>
        {playersTurn ? (
          <FaMicrophone color="red" size={30} />
        ) : (
          <FaMicrophoneAltSlash color="#838383" size={30} />
        )}
      </Box>
    </>
  );
};

export default Microphone;
