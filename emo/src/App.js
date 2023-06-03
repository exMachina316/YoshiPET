// app.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Affirmation from "./components/Affirmation";
// import AlterSound from "./components/Altersound";
import logo from "./logo.png";

// let role = "friend";


// var quote = "you are friendly robot friend and i am having conversation with you i say" + instru + "and you will reply to me as?";

/* write a fuction which changes  */

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Hey Boss!</h2>
        {/* <h2>Prompt: {instru}</h2> */}
        {/* <h2>Role: {role}</h2> */}
      </div>
      {/* <img src={logo} className="eyes" alt="logo" /> */}
      {/* <Affirmation /> */}
      {/* <AlterSound /> */}
      <Chat />
      {/* <SearchBar /> */}
    </div>
  );
}

export default App;

const Chat = () => {
  const [completion, setCompletion] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();
  let [instru, setInstru] = useState("can you introduce yourself?");
  var quote = "you are friendly robot friend name jump and i am having conversation with you i say" + transcript + "and you will reply to me as?";

  
  //similar to useState, create a transcript and resetTranscript func
  // from the useSpeechRecognition() function

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const fetchCompletion = async () => {
    // using axios
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: quote }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );
    setCompletion(response.data.choices[0].message.content);
  };

  const handleSpeak = () => {
    setTimeout(() => {
      if ("speechSynthesis" in window) {
        const synthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(completion);
        console.log(completion);
        synthesis.speak(utterance);
      } else {
        console.log("Text-to-speech not supported in this browser.");
      }
    }, 1); // Delay of 10 milliseconds
  };

  
  // const run = () => {
  //   setTimeout(() => {
  //     fetchCompletion();
  //   }, 10);
  //   handleSpeak();
  // }
  

  return (
    <div className="App">
      <p className="text">{completion}</p>
      <button className="button" onClick={fetchCompletion}>
        Reply
      </button>
      <button className="button" onClick={handleSpeak}>
        Speak
      </button>
      <button className="button" onClick={SpeechRecognition.startListening}>
        Listen!
      </button>
      <button className="button" onClick={SpeechRecognition.stopListening}>
        Stop!
      </button>
      {/* <button className="button" onClick={resetTranscript}>
        Reset
      </button> */}
      <p className="transcript">{transcript}</p>
      {(instru = transcript)}
    </div>
  );
};

// function AlterSound() {
//   const { transcript, resetTranscript } = useSpeechRecognition();
//   //similar to useState, create a transcript and resetTranscript func
//   // from the useSpeechRecognition() function

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return null;
//   }

//   //If your browser does not support speech recognition, return null
//   // otherwise, return the following
//   return (
//     <div className="App">
//       <button className="button" onClick={SpeechRecognition.startListening}>
//         Listen!
//       </button>
//       <button className="button" onClick={SpeechRecognition.stopListening}>
//         Stop!
//       </button>
//       <button className="button" onClick={resetTranscript}>
//         Reset
//       </button>
//       <p className="transcript">{transcript}</p>
//       {/* {(instru = transcript)} */}
//     </div>
//   );
// }

// const SearchBar = () => {
//   const [searchValue, setSearchValue] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Pass the searchValue to the <Chat> component or perform any other action
//     console.log('Search value:', searchValue);
//   };

//   const handleChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={searchValue}
//         onChange={handleChange}
//         placeholder="Type your search term..."
//       />
//       <button type="submit" onClick={ ValueChange }>Search</button>
//     </form>

//   );
// };

// const TextToSpeech = () => {
//   const [text, setText] = useState('');

//   const handleInputChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleSpeak = () => {
//     setTimeout(() => {
//       if ('speechSynthesis' in window) {
//         const synthesis = window.speechSynthesis;
//         const utterance = new SpeechSynthesisUtterance(text);
//         synthesis.speak(utterance);
//       } else {
//         console.log('Text-to-speech not supported in this browser.');
//       }
//     }, 5000); // Delay of 3000 milliseconds (3 seconds)
//   };

//   return (
//     <div>
//       <textarea value={text} onChange={handleInputChange} />
//       <button onClick={handleSpeak}>Speak</button>
//     </div>
//   );
// };
