import { useEffect, useState } from "react";

import "./App.css";
import {
  Center,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";

import axios from "axios";

//navigation
import { useNavigate } from "react-router-dom";

function formatDateToString(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

function App() {
  const [entries, setEntries] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const firebaseDatabaseUrl =
          "https://feedback-psa-default-rtdb.asia-southeast1.firebasedatabase.app/";
        const endpointPath = `v2`;

        const response = await axios.get(
          `${firebaseDatabaseUrl}${endpointPath}.json`
        );

        setEntries(response.data);
      } catch (error) {
        console.error("Error adding entry:", error);
        alert("Please try again later.");
      }
    })();
  });

  return (
    <Center>
      <Tabs>
        <TabList>
          <Tab>Journal Entries</Tab>
          <Tab>Feedbacks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack>
              {Object.keys(entries).map((entryKey, index) => (
                <Card key={index} w={60} gap={0}>
                  <CardHeader
                    p={0}
                    alignContent={"start"}
                    justifyContent={"start"}
                  >
                    <Text fontSize="xs">
                      {formatDateToString(new Date(entryKey))}
                    </Text>
                  </CardHeader>
                  <CardBody p={0}>
                    <Text noOfLines={3}>{entries[entryKey]}</Text>
                  </CardBody>
                </Card>
              ))}
            </Stack>
            <Button
              marginTop={2}
              colorScheme="teal"
              size="lg"
              onClick={() => navigate("/record")}
            >
              Button
            </Button>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
}

export default App;
