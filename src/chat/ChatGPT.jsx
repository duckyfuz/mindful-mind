import { useEffect } from "react";
import { Button, Textarea, Stack } from "@chakra-ui/react";
import { useState } from "react";
// import axios from "axios";

import OpenAI from "openai";

const ChatGPT = () => {
  const [inputText, setInputText] = useState("");
  // const [response, setResponse] = useState("");

  // const apiKey = "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"; // Replace with your API key
  // const apiUrl = "	https://api.openai.com/v1/chat/completions"; // Change the engine if needed

  const handleGPT = () => {
    (async () => {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Tell me why... Finish it`,
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
    })();
  };

  // const generateResponse = async () => {
  //   try {
  //     const requestBody = {
  //       prompt: inputText,
  //       max_tokens: 500, // Adjust as needed
  //     };

  //     const response = await axios.post(apiUrl, requestBody, {
  //       headers: {
  //         Authorization: `Bearer ${apiKey}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     setResponse(response.data.choices[0].text);
  //   } catch (error) {
  //     console.error("Error generating response:", error);
  //   }
  // };

  return (
    <div>
      <Stack direction="column">
        <Textarea
          placeholder="Here is a sample placeholder"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button
          colorScheme="blue"
          onClick={() => {
            console.log("handling gpt");
            handleGPT();
          }}
        >
          Send to ChatGPT
        </Button>
      </Stack>
    </div>
  );
};

export default ChatGPT;
