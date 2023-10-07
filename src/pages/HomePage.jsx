import { useState, useRef, useEffect } from "react";
import axios from "axios";

import OpenAI from "openai";

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
import { Textarea, ListItem, OrderedList, Link } from "@chakra-ui/react";

import resources from "../Components/resources";

//whisper parameters
const apiKey = import.meta.env.VITE_OPENAI_KEY;
const model = "whisper-1";
const language = "en";

const HomePage = () => {
  const [newEntry, setNewEntry] = useState("");
  const [file, setFile] = useState();
  const inputRef = useRef();
  const [msg, setMsg] = useState("");

  const [loadingGPT, setLoadingGPT] = useState(false);

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

  useEffect(() => {
    (async () => {
      try {
        const firebaseDatabaseUrl =
          "https://feedback-psa-default-rtdb.asia-southeast1.firebasedatabase.app/";
        const endpointPath = `v2target`;

        const response = await axios.get(
          `${firebaseDatabaseUrl}${endpointPath}.json`
        );
        console.log(response.data);
        setMsg(response.data);
      } catch (error) {
        console.error("Error adding entry:", error);
      }
    })();
  }, []);

  const addEntryHandler = () => {
    (async () => {
      setLoadingGPT(true);

      const ent = newEntry;
      console.log(ent);

      try {
        const firebaseDatabaseUrl =
          "https://feedback-psa-default-rtdb.asia-southeast1.firebasedatabase.app/";
        const endpointPath = `v2`;

        const response = await axios.get(
          `${firebaseDatabaseUrl}${endpointPath}.json`
        );

        let updatedRows = response.data;
        updatedRows[new Date()] = newEntry;

        console.log(updatedRows);

        await axios.put(
          `${firebaseDatabaseUrl}${endpointPath}.json`,
          updatedRows
        );
      } catch (error) {
        console.error("Error adding entry:", error);
        alert("Please try again later.");
      }

      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Pretend that you are ${"Joshua's"} friend who is experienced in the field of mental health.\nOne of your friends wrote the following journal entry:\n
            ${newEntry}\n
            Please give him some advice and avenues where he can seek help. Write it in the form of a monologue from you to him, as if you were speaking to him face to face. Try to be as nuturing as possible, gently guiding him to seeking help.\n
            At the end, please suggest some activities he can take part in to alleviate his troubles.`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const result = response.choices[0].message.content;
      console.log(result);
      // setResponse(result);

      const emo = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Based on this journal entry:\n
            ${newEntry}\n
            Choose an emotion from the following that best depicats the writer's state of mind:
            Happy, Loved, Confident, Playful, Embarrassed, Angry, Scared and Sad.\n
            Reply in one word.`,
          },
        ],
        temperature: 0.1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const emoRes = emo.choices[0].message.content;

      await axios.put(
        `https://feedback-psa-default-rtdb.asia-southeast1.firebasedatabase.app/v2target.json`,
        { target: result, emo: emoRes }
      );

      setLoadingGPT(false);
    })();
  };

  return (
    <Box>
      {msg && msg.target.length !== 0 && (
        <Card h={12} textAlign="left" padding={2} variant="outline">
          <Grid templateColumns="repeat(5, 1fr)" gap={6} height="100%">
            <GridItem colSpan={2}>
              <h2>A Note From Us!</h2>
            </GridItem>
            <GridItem colStart={7}>
              <Button
                h={8}
                onClick={() => {
                  const text = msg.target;

                  // Create a new SpeechSynthesisUtterance object
                  let utterance = new SpeechSynthesisUtterance();

                  // Set the text and voice of the utterance
                  utterance.text = text;
                  utterance.voice = window.speechSynthesis.getVoices()[10];
                  console.log(window.speechSynthesis.getVoices());

                  // Configure voice properties for a soothing and slower voice
                  utterance.rate = 0.8; // Adjust the rate (speech speed), 0.5 is slower, 1.0 is normal speed
                  utterance.pitch = 1; // Adjust the pitch, 0.0 is lower pitch, 2.0 is higher pitch

                  // Speak the utterance

                  // Speak the utterance
                  window.speechSynthesis.speak(utterance);
                }}
              >
                Play!
              </Button>
            </GridItem>
          </Grid>
        </Card>
      )}
      <HStack align={"start"} gap={6}>
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
                    console.log(newEntry);
                    setNewEntry(e.target.value);
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
            <Button isLoading={loadingGPT} onClick={addEntryHandler}>
              Add
            </Button>
          </Flex>
          <PastEntries />
        </Box>
        {msg && msg.emo.length !== 0 && (
          <Box flex={2} h={"100vh"} mt={4}>
            <Card h={"80%"}>
              <CardHeader align="left">
                <Text>Based on your most recent entries...</Text>
                <Text>You seem to be feeling:</Text>
                <Text fontSize={"2xl"} align={"center"}>
                  {msg.emo}
                </Text>
              </CardHeader>
              <CardBody>
                <Text align={"left"} mb={2}>
                  Here are some resources you can review:
                </Text>
                <OrderedList align="left" ml={5}>
                  <ListItem>
                    <Link
                      href="https://chakra-ui.com"
                      isExternal
                      color={"blue"}
                    >
                      Art therapy
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://chakra-ui.com"
                      isExternal
                      color={"blue"}
                    >
                      Meditation
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://chakra-ui.com"
                      isExternal
                      color={"blue"}
                    >
                      Music therapy
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://chakra-ui.com"
                      isExternal
                      color={"blue"}
                    >
                      Get active!
                    </Link>
                  </ListItem>
                </OrderedList>
              </CardBody>
            </Card>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default HomePage;
