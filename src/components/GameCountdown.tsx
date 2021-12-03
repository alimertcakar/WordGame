import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import consts from "src/domain/gameConstants";
import { GameState } from "src/hooks/useGameEngine";
import CountdownRenderer from "./CountdownRenderer";
import { useSelector } from "react-redux";
import { gameSelector, GameStatus } from "src/slices/game";

interface Props {}

enum CountDownStatus {
  break,
  round,
}

const GameCountdown = ({}: Props) => {
  const game = useSelector(gameSelector);
  const { status } = game;

  if (status === GameStatus.Break) {
    return <div>Game in break</div>;
  }
  if (status === GameStatus.Playing) {
    return <div>Game in play</div>;
  }

  // <div>
  //   <Countdown date={roundEnd} key={round} renderer={CountdownRenderer} />
  //   seconds left
  // </div>;

  return null;
};

export default GameCountdown;
