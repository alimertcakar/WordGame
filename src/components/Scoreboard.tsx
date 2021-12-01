import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Container,
} from "@chakra-ui/react";

import React from "react";
import { GameState } from "src/hooks/useGameEngineOld";

interface Props {
  state: GameState;
}

const Scoreboard = ({ state }: Props) => {
  return (
    <Container maxW="xs" mt={4}>
      <Box m={2} border="1px" borderColor="gray.200" borderRadius="md">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Player</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Player 1</Td>
              <Td isNumeric>10</Td>
            </Tr>
            <Tr>
              <Td>Cpu</Td>
              <Td isNumeric>15</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default Scoreboard;
