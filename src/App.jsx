import "./App.css";
import { ChakraProvider, Stack, Text } from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

import { entries } from "./tmp/example";

//navigation
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <Stack>
        {Object.keys(entries).map((entryKey, index) => (
          <Card key={index}>
            <CardBody>
              <Text>{entries[entryKey]}</Text>
            </CardBody>
          </Card>
        ))}
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => navigate("/record")}
        >
          Button
        </Button>
      </Stack>
    </ChakraProvider>
  );
}

export default App;
