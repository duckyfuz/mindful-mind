import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

function formatDateToString(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString(undefined, options);
}

const PastEntries = () => {
  const [entries, setEntries] = useState({});

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
      }
    })();
  });

  return (
    <Stack>
      <Text fontSize={"3xl"}>Past Entries</Text>

      <Center gap={6} alignItems={"start"}>
        {[0, 1, 2].map((stack) => (
          <VStack key={stack} gap={6}>
            {Object.keys(entries).map((entryKey, index) => {
              if (index % 3 === stack) {
                return (
                  <Card key={index} gap={0} p={2}>
                    <CardHeader p={0} paddingBottom={2}>
                      <Text fontSize="xl" align={"left"}>
                        {formatDateToString(new Date(entryKey))}
                      </Text>
                    </CardHeader>
                    <CardBody p={0}>
                      <Text align={"left"} noOfLines={4}>
                        {entries[entryKey]}
                      </Text>
                    </CardBody>
                  </Card>
                );
              } else {
                return null; // Skip entries that belong to the other two stacks
              }
            })}
          </VStack>
        ))}
      </Center>
    </Stack>
  );
};

export default PastEntries;
