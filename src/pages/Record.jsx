import { useState, useRef, useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_OPENAI_KEY;
const model = "whisper-1";
const language = "en";

const Record = () => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [response, setResponse] = useState(null);

  const onChangeFile = () => {
    setFile(inputRef.current.files[0]);
  };

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
          console.log(res.data);
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAudioFile();
  }, [file]);

  return (
    <div>
      Whisper
      <input type="file" ref={inputRef} accept=".mp3" onChange={onChangeFile} />
      {response && <div>{JSON.stringify(response, null, 2)}</div>}
    </div>
  );
};

export default Record;
