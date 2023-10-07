import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

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

//whisper parameters
const apiKey = import.meta.env.VITE_OPENAI_KEY;
const model = "whisper-1";
const language = "en";

const HomePage = () => {
  const [newEntry, setNewEntry] = useState("");
  const [file, setFile] = useState();
  const inputRef = useRef();

  useEffect(() => {
    const fetchAudioFile = async () => {
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append("model", model);
      formData.append("file", file);
      formData.append("language", language);

      axios
        .post("https://api.openai.com/v1/audio/transcriptions", formData, {
          headers: {
            "Content-Type": "multi-part/form-data",
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .then((res) => {
          console.log(res.data["text"]);
          setNewEntry(res.data["text"]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAudioFile();
  }, [file]);

  return (
    <Box>
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
      <HStack align={"start"}>
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
                    <span>Choose File: {file && file.name}</span>
                    <Input
                      type="file"
                      id="fileInput"
                      ref={inputRef}
                      accept=".mp3"
                      display="none" // Hide the default file input
                      onChange={() => {
                        setFile(inputRef.current.files[0]);
                      }}
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
                  DOWN
                </Text>
              </CardHeader>
              <CardBody>
                <Text>Here are some resources you can review:</Text>
              </CardBody>
            </Card>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default HomePage;
