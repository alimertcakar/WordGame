import { Box } from "@chakra-ui/react";
import React from "react";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";
import { GameState, Player } from "src/hooks/useGameEngine";

interface Props {
  state: GameState;
}

const Microphone = ({ state }: Props) => {
  console.log(state, "state");
  const isActive = state.currentPlayer === Player.Player;
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      {isActive ? (
        <FaMicrophone color="red" size={30} />
      ) : (
        <FaMicrophoneAltSlash color="#838383" size={30} />
      )}
    </Box>
  );
};

export default Microphone;
