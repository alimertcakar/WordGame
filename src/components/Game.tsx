import { Box, Button, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { gameSelector, GameStatus, Player, startRound } from "src/slices/game";
import Recognition from "src/helpers/audio/Recognition";
import Utterance from "src/helpers/audio/Utterance";
import CountdownRenderer from "./CountdownRenderer";
import GameCountdown from "./GameCountdown";
import Microphone from "./Microphone";
import Rules from "./Rules";
import History from "./History";
import Scoreboard from "./Scoreboard";
import GameOver from "./GameStatus/GameOver";
import Playing from "./GameStatus/Playing";
import consts from "src/domain/gameConstants";

interface Props {}

const Game = (props: Props) => {
  const game = useSelector(gameSelector);
  const { status, lives } = game;

  if (status === GameStatus.GameOver || lives < 1) {
    return <GameOver />;
  }
  return <Playing />;
};

export default Game;
