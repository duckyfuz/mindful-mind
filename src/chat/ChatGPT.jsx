import React from "react";
import { Button, ButtonGroup, Textarea, Stack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  const apiKey = "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"; // Replace with your API key
  const apiUrl = "	https://api.openai.com/v1/chat/completions"; // Change the engine if needed

  const generateResponse = async () => {
    try {
      const requestBody = {
        prompt: inputText,
        max_tokens: 500, // Adjust as needed
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  return (
    <div>
      <Stack direction="column">
        <Textarea
          placeholder="Here is a sample placeholder"
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button colorScheme="blue" onClick={generateResponse}>
          Send to ChatGPT
        </Button>
      </Stack>
    </div>
  );
};

export default ChatGPT;
