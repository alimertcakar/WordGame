import React from "react";
import Countdown from "react-countdown";
import { GameState } from "src/hooks/useGameEngine";
import CountdownRenderer from "./CountdownRenderer";

interface Props {
  state: GameState;
}

const GameCountdown = ({ state }: Props) => {
  const { roundEnd, roundBreak, round } = state;
  console.log(roundEnd, "rouned");
  const timeUntilBreakEnds = roundEnd - roundBreak;
  console.log(timeUntilBreakEnds);

  return <Countdown date={roundEnd} key={round} renderer={CountdownRenderer} />;
};

export default GameCountdown;
