import React from "react";
import Image from "next/image";
import { Box, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { mileToKm, usdToTry } from "src/contants";

interface Props {
  car: any;
}

const Car = ({ car }: Props) => {
  console.log(car, "car");
  const { stockNumber, year, make, model, basePrice, mileage } = car;

  return (
    <FlexCar
      flexDirection="column"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="lg"
    >
      <Box>
        <Image
          src={`https://media-service.carmax.com/img/vehicles/${stockNumber}/1_cleaned.jpg?width=800`}
          alt="Car"
          width="460"
          height="350"
          objectFit="contain"
        />
      </Box>
      <BoxCarTitle p={2}>
        <Box mb={1} fontSize="lg" color="gray.700" fontWeight="medium">
          {model}
        </Box>
        <Box fontSize="sm" color="gray.500">
          {year} {make}
        </Box>
        <Flex justifyContent="space-between" mt={4}>
          <Box fontSize="md" color="gray.700" fontWeight="medium">
            {usdToTry(basePrice)}
          </Box>
          <Box fontSize="md" color="gray.500">
            {mileToKm(mileage)} KM
          </Box>
        </Flex>
      </BoxCarTitle>
    </FlexCar>
  );
};

export default Car;

const BoxCarTitle = styled(Box)`
  line-height: 1.2;
`;

const FlexCar = styled(Flex)`
  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
