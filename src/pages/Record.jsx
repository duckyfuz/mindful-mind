import { useState } from "react";
import { Textarea, Button, Box, VStack } from "@chakra-ui/react";
import { useSpeechRecognition } from "react-speech-kit";

const Record = () => {
  const [value, setValue] = useState("");
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log("hello");
      setValue(result);
    },
  });

  return (
    <Box display="flex" backgroundColor={"red"}>
      <VStack>
        <Textarea
          resize={"vertical"}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button onMouseDown={listen} onMouseUp={stop}>
          🎤
        </Button>
        <Button
          onClick={() => {
            setValue("he");
          }}
        >
          Add entry
        </Button>
      </VStack>
    </Box>
  );
};

export default Record;
