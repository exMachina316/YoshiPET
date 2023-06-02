// app.js
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [completion, setCompletion] = useState("");

  const fetchCompletion = async () => {
    // using axios
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Say this is a test!" }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer `,
        },
      }
    );
    setCompletion(response.data.choices[0].message.content);
  };

  return (
    <div>
      <h1>OpenAI Chat</h1>
      <p>{completion}</p>
      <button onClick={fetchCompletion}>Fetch</button>
    </div>
  );
};

export default App;
