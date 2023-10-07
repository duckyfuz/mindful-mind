import { useState } from "react";
import axios from "axios";
import OpenAI from "openai";

import { Button, Textarea, Stack } from "@chakra-ui/react";

import { entry } from "../tmp/detailedEntry";

const ChatGPT = () => {
  const [inputText, setInputText] = useState(entry);
  const [loadingGPT, setLoadingGPT] = useState(false);

  const [response, setResponse] = useState("");

  const handleGPT = () => {
    (async () => {
      setLoadingGPT(true);
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Pretend that you are a therapist experienced in the field of mental health.\nOne of your patients wrote the following journal entry:\n
            ${entry}\n
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
      setResponse(result);
      setLoadingGPT(false);
    })();
  };

  const TTS = () => {
    let text = "";
    if (response.length !== 0) {
      text = response;
    } else {
      text = "How does this sound";
    }

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
  };

  const handleFire = () => {
    (async () => {
      try {
        const firebaseDatabaseUrl =
          "https://feedback-psa-default-rtdb.asia-southeast1.firebasedatabase.app/";
        const endpointPath = `v2`;

        const response = await axios.get(
          `${firebaseDatabaseUrl}${endpointPath}.json`
        );

        let updatedRows = response.data;
        updatedRows[new Date()] = inputText;

        console.log(updatedRows);

        await axios.put(
          `${firebaseDatabaseUrl}${endpointPath}.json`,
          updatedRows
        );
      } catch (error) {
        console.error("Error adding entry:", error);
        alert("Please try again later.");
      }
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
          isLoading={loadingGPT}
          loadingText="Submitting"
          onClick={() => {
            handleFire();
          }}
        >
          Save to Fire
        </Button>
        <Button
          isLoading={loadingGPT}
          loadingText="Submitting"
          onClick={() => {
            console.log("handling gpt");
            handleGPT();
          }}
        >
          Send to ChatGPT
        </Button>
        {response.length !== 0 && (
          <Button
            onClick={() => {
              TTS();
            }}
          >
            Play
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default ChatGPT;
