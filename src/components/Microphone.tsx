import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { isDev } from "src/domain/gameConstants";
import { gameSelector, GameStatus, Player } from "src/slices/game";
import DevMicrophone from "./DevMicrophone";

interface Props {}

const Microphone = ({}: Props) => {
  const state = useSelector(gameSelector);
  const playersTurn = state.currentPlayer === Player.Player;

  if (state.status !== GameStatus.Playing) {
    return null;
  }

  return (
    <>
      {isDev && playersTurn && <DevMicrophone />}
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
