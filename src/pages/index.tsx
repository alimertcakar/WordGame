import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import Cars from "src/components/Cars";
import CarsFilter from "src/components/CarsFilter";

interface Props {}

const CarsPage = (props: Props) => {
  return (
    <>
      <Container maxW="container.2xl">
        <Grid templateColumns="1fr 3fr">
          <CarsFilter />
          <Cars />
        </Grid>
      </Container>
    </>
  );
};

export default CarsPage;
