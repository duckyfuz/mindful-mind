import React, { useState } from "react";
//import components
import {
  Box,
  Grid,
  GridItem,
  Text,
  Flex,
  StackDivider,
  Stack,
  HStack,
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Card, CardHeader, CardBody } from "@chakra-ui/card";
import PastEntries from "../Components/PastEntries";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/react";

const HomePage = () => {
  const [newEntry, setNewEntry] = useState("");
  const [file, setFile] = useState();

  return (
    <Box h="100vh">
      {true && (
        <Card h={12} textAlign="left" padding={2} variant="outline">
          <Grid templateColumns="repeat(5, 1fr)" gap={6} height="100%">
            <GridItem colSpan={2}>
              <h2>A Note From Us!</h2>
            </GridItem>
            <GridItem colStart={7}>
              <Button h={8}>Play!</Button>
            </GridItem>
          </Grid>
        </Card>
      )}
      <HStack h={"100vh"} align={"start"}>
        <Box p={2} flex={5}>
          <Text fontSize={"3xl"} as="b" mb={0}>
            New Entry
          </Text>
          <Flex
            justify="center" // Center-align child component vertically
            align="center"
            w="100%" // Ensure the child component takes up the full width
            marginBottom={6}
          >
            <Card borderColor="black" w="50%" mr={5} mt={3}>
              <CardBody>
                <Textarea
                  value={newEntry}
                  onChange={(e) => {
                    setNewEntry(e.value);
                  }}
                />
              </CardBody>
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
          <PastEntries />
        </Box>
        {true && (
          <Box flex={2} h={"100vh"} mt={4}>
            <Card h={"80%"}>
              <CardHeader align="left">
                <Text>Based on your most recent entries...</Text>
                <Text>You are feeling:</Text>
                <Text fontSize={"2xl"} align={"center"}>
                  HAPPY
                </Text>
              </CardHeader>
            </Card>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default HomePage;
