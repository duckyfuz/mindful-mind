import React from "react";
//import components
import {
  Box,
  Grid,
  GridItem,
  Text,
  Heading,
  Flex,
  StackDivider,
  Stack,
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import PastEntries from "../Components/PastEntries";
import { Input } from "@chakra-ui/input";

const HomePage = () => {
  return (
    <Box h="100vh">
      {true && (
        <Card
          w="90vw"
          h={12}
          textAlign="left"
          padding={2}
          paddingLeft={5}
          variant="outline"
        >
          <Grid templateColumns="repeat(5, 1fr)" gap={6} height="100%">
            <GridItem colSpan={2}>
              <h2>A Note From Us!</h2>
            </GridItem>
            <GridItem colStart={7}>
              <Button h={8}>Play! </Button>
            </GridItem>
          </Grid>
        </Card>
      )}

      <Box w="90vw" p={2}>
        <Text as="b">Drop Journal Entry</Text>
        <Flex
          justify="center" // Center-align child component vertically
          align="center"
          w="100%" // Ensure the child component takes up the full width
        >
          <Card borderColor="black" w="50%" mr={5} mt={3}>
            <CardHeader>
              <Input type="text" id="fileTitle" placeholder="Title"></Input>
            </CardHeader>
            <StackDivider />
            <Stack spacing={4} m={3} mt={0}>
              <label htmlFor="fileInput">
                <Flex
                  alignItems="center" // Vertically align the content
                  borderRadius="md" // Round the edges of the container
                  bg="gray.100" // Background color for better visibility
                  p={2} // Add padding to the container
                  cursor="pointer" // Change cursor on hover
                >
                  <span>Choose File:</span>
                  <Input
                    type="file"
                    id="fileInput"
                    accept=".mp3"
                    display="none" // Hide the default file input
                    onChange={(e) => handleFileUpload(e)}
                  />
                </Flex>
              </label>
            </Stack>
          </Card>
          <Button>Add</Button>
        </Flex>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default HomePage;
