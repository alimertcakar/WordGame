import { Grid } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import Car from "./Car";

interface Props {}

const Cars = (props: Props) => {
  const { data, error, isValidating } = useSWR(
    "search/run?uri=%2Fcars%2Fsedans&skip=0&take=24&zipCode=66204&radius=90&shipping=&sort=20&visitorID=b4da6346-537b-4247-bba6-8f1c9f2481ef"
  );
  console.log(data, "data");

  const cars = data?.items ?? [];

  console.log(cars, "cars");

  return (
    <div>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} m={4}>
        {cars.map((car) => {
          return <Car key={car.stockNumber} car={car} />;
        })}
      </Grid>
    </div>
  );
};

export default Cars;
