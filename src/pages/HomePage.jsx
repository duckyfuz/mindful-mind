import React from "react";
//import components
import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";
import PastEntries from "../Components/PastEntries";

const HomePage = () => {
  return (
    <Box h={"100vh"}>
      {true && (
        <>
          <Text>A note from us</Text>
          <Card
            bg="tomato"
            w="90vw"
            h={10}
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
                <Button>Test!</Button>
              </GridItem>
            </Grid>
          </Card>
        </>
      )}
      <Card>
        <CardBody>
          <Text>Title</Text>
        </CardBody>
      </Card>
      <PastEntries />
    </Box>
  );
};

export default HomePage;
