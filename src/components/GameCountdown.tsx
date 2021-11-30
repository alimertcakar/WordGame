import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import constants from "src/domain/gameConstants";
import { GameState } from "src/hooks/useGameEngine";
import CountdownRenderer from "./CountdownRenderer";

interface Props {
  state: GameState;
}

enum CountDownStatus {
  break,
  round,
}

const GameCountdown = ({ state }: Props) => {
  const [status, setStatus] = useState(CountDownStatus.break);
  const { roundEnd, roundBreak, round } = state;
  const roundTime = roundEnd - roundBreak;
  console.log(roundBreak - roundEnd, "roundtime2");

  useEffect(() => {
    setStatus(CountDownStatus.break);

    const changeStatusTimeout = setTimeout(() => {
      setStatus(CountDownStatus.round);
    }, constants.game.timeRoundBreak * constants.msToSecond);

    return () => {
      clearTimeout(changeStatusTimeout);
    };
  }, [roundTime]);

  if (status === CountDownStatus.round) {
    return (
      <div>
        <Countdown date={roundEnd} key={round} renderer={CountdownRenderer} />
        seconds left
      </div>
    );
  } else if (status === CountDownStatus.break) {
    return (
      <div>
        <Countdown date={roundBreak} key={round} renderer={CountdownRenderer} />
        seconds until next round
      </div>
    );
  }

  return null;
};

export default GameCountdown;
