import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import Game from "src/components/Game";

interface Props {}

const GamePage = (props: Props) => {
  return (
    <>
      <Game />
    </>
  );
};

export default GamePage;
