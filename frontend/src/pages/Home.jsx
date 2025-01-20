import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Home = () => {
  const [aiResponse, setAiResponse] = useState({});
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const getAiResponse = async () => {
    const response = await fetch("http://127.0.0.1:5000/get-ai");

    if (response.ok) {
      const data = await response.json();
      setAiResponse(data.aiResponse); // Set AI response when ready
      console.log(data.aiResponse);
    } else {
      const data = await response.json();
      console.log(data.message); // Handle the "not ready" message
    }
  };

  const postTranscript = async (transcript) => {
    if (transcript) {
      //define url
      const url = "http://127.0.0.1:5000/receive-transcript";

      //set options
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }), // Ensure the object has a key 'transcript'
      };

      //send fetch request and await response
      await fetch(url, options)
        .then((response) => {
          //check response
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => console.log("Transcript Send Successful:", data))
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleStopClick = (transcript) => {
    SpeechRecognition.stopListening;
    postTranscript(transcript);
    getAiResponse();
    resetTranscript();
  };

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>

      <button onClick={SpeechRecognition.startListening}>Start</button>

      <button onClick={() => handleStopClick(transcript)}>Stop</button>

      <button onClick={resetTranscript}>Reset</button>

      <p>{transcript}</p>
    </div>
  );
};

export default Home;
