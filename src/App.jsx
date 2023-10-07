import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Button colorScheme="teal" size="lg">
        Button
      </Button>
    </ChakraProvider>
  );
}

export default App;
