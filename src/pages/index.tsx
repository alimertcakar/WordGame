import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import Game from "src/components/Game";

interface Props {}

const GamePage = (props: Props) => {
  return (
    <>
      <Container maxW="container.2xl">
        <Grid templateColumns="1fr 3fr">
          <Game />
        </Grid>
      </Container>
    </>
  );
};

export default GamePage;
