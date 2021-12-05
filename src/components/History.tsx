import React from "react";
import { useSelector } from "react-redux";
import { GameHistoryItem, historySelector, WinnerType } from "src/slices/game";
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
  Heading,
  Flex,
} from "@chakra-ui/react";
import _ from "lodash";
import styled from "@emotion/styled";

interface Props {
  item: GameHistoryItem;
}

const HistoryItem = ({ item }: Props) => {
  const { winner, word, player } = item;
  return (
    <Tr>
      <Td>{_.capitalize(player)}</Td>
      <Td>{_.capitalize(word)}</Td>
      <Td>
        {winner === WinnerType.FirstRound
          ? "First Round"
          : _.capitalize(winner)}
      </Td>
    </Tr>
  );
};

const History = (props: {}) => {
  const history = useSelector(historySelector);

  return (
    <Container maxW="lg" mt={4}>
      <Flex justifyContent="center">
        <Heading as="h2" size="md">
          HISTORY
        </Heading>
      </Flex>
      <Box m={2} border="1px" borderColor="gray.200" borderRadius="md">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>player</Th>
              <Th>word</Th>
              <Th>winner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map((item) => (
              <HistoryItem
                key={item.winner + item.player + item.word}
                item={item}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default History;
