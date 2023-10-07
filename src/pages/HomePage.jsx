import React from "react";
//import components
import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Card } from "@chakra-ui/card";

const HomePage = () => {
  return (
    <Box h="100vh">
      <Card
        bg="tomato"
        w="90vw"
        h={12}
        textAlign="left"
        padding={2}
        paddingLeft={5}
      >
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={6}
          height="100%"
          bg="tomato"
        >
          <GridItem colSpan={2}>
            <h2>A Note From Us!</h2>
          </GridItem>
          <GridItem colStart={7}>
            <Button h={8}>Test!</Button>
          </GridItem>
        </Grid>
      </Card>
    </Box>
  );
};

export default HomePage;
