import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useRouter } from "next/router";

interface Props {}

const Index = (props: Props) => {
  const router = useRouter();

  function startGame() {
    router.push("game");
  }

  return (
    <Flex
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button colorScheme="blue" onClick={startGame}>
        Start Game
      </Button>
    </Flex>
  );
};

export default Index;
