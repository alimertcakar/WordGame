import React, { useEffect } from "react";
import useGameEngine from "src/hooks/useGameEngine";
import Recognition from "src/util/audio/Recognition";
import Utterance from "src/util/audio/Utterance";

interface Props {}

const Game = (props: Props) => {
  const { state, nextRound } = useGameEngine();

  const { currentWord } = state;

  return <div>{currentWord}</div>;
};

export default Game;
