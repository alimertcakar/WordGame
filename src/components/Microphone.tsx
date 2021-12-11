import { Box, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { isDev } from "src/domain/gameConstants";
import useRecognition from "src/hooks/useRecognition";
import { gameSelector, GameStatus, Player } from "src/slices/game";
import Recognition from "src/helpers/audio/Recognition";
import DevMicrophone from "./DevMicrophone";

interface Props {}

const Microphone = ({}: Props) => {
  const recognition = useRef(new Recognition()).current;
  const state = useSelector(gameSelector);
  const isPlayersTurn = state.currentPlayer === Player.Player;
  useRecognition(state, isPlayersTurn);

  useEffect(() => {
    if (isPlayersTurn) {
    }
  }, [isPlayersTurn]);

  if (state.status !== GameStatus.Playing) {
    return null;
  }

  return (
    <>
      {isDev && isPlayersTurn && <DevMicrophone />}
      <Box display="flex" justifyContent="center" mt={4}>
        {isPlayersTurn ? (
          <FaMicrophone color="red" size={30} />
        ) : (
          <FaMicrophoneAltSlash color="#838383" size={30} />
        )}
      </Box>
    </>
  );
};

export default Microphone;
