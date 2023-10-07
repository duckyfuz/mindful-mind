import { Button, Textarea, Stack } from "@chakra-ui/react";
import { useState } from "react";
// import axios from "axios";

import OpenAI from "openai";

const ChatGPT = () => {
  const [inputText, setInputText] = useState("");

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
