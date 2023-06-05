// app.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import Affirmation from "./components/Affirmation";
// import AlterSound from "./components/Altersound";
// import logo from "./logo.png";
// import EyeComponent from "./components/EyeComponent";
import Eye from "./components/EyeComponent";

// let role = "friend";

// var quote = "you are friendly robot friend and i am having conversation with you i say" + instru + "and you will reply to me as?";

/* write a fuction which changes  */

function App() {
  return (
    <div className="App">
      <div className="App-header">
      {/* <Dropdown /> */}
        {/* <h2>Hey Boss!</h2> */}
        {/* <EyeComponent /> */}
        {/* <h2>Prompt: {instru}</h2> */}
        {/* <h2>Role: {role}</h2> */}
      </div>

      <div id="eyes">
        <Eye />
        <Eye />
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
  let [mode, setMode] = useState("friendly robot");

  var quote =
    "you are "+ mode + "name Yoshipet im asking you" +
    transcript +
    "(reply in not more than 30 words)";

  

  //similar to useState, create a transcript and resetTranscript func
  // from the useSpeechRecognition() function

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const fetchCompletion = async (callback) => {
    // using axios
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-0301",
        messages: [{ role: "user", content: quote }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer `,
        },
      }
    );
    setCompletion(response.data.choices[0].message.content);
    callback();
  };

  const handleSpeak = () => {
    
      if ("speechSynthesis" in window) {
        const synthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(completion);
        console.log(completion);
        synthesis.speak(utterance);
      } else {
        console.log("Text-to-speech not supported in this browser.");
      }
    ; // Delay of 10 milliseconds
  };

const fetchDataAndSpeak = () => {
  fetchCompletion(handleSpeak);
}

  return (
    <div className="App">
        <label htmlFor="mode-select" className="text">Select Mode:</label>
        <select id="mode-select" className="text" value={mode} onChange={handleModeChange}>
        <option value="default">GPT-4</option>
        <option value="health-advisor">Health Advisor</option>
        <option value="travel-planner">Travel Planner</option>
        <option value="weather-forecaster">Weather Forecaster</option>
        <option value="language-translator">Language Translator</option>
        <option value="content-Writer">Content Writer</option>
        <option value="financial-advisor">Financial Advisor</option>
        <option value="recipe-finder">Recipe Finder</option>
        <option value="task-manager">Task Manager</option>
        <option value="news-reader">News Reader</option>
        <option value="personal-assistant">Personal Assistant</option>
      </select>
      <p>Selected Mode: {mode}</p>
     
      <p className="text">{completion}</p>
      <button
        className="button"
        onClick={() => {
          fetchDataAndSpeak();
          // setTimeout(handleSpeak, 2000);
        }}
      >
        🔍
      </button>
      {/* <button
        className="button"
        onClick={() => {
          // fetchCompletion();
          handleSpeak();
        }}
      >
        🔊
      </button> */}

      <button className="button" onClick={SpeechRecognition.startListening}>
        🎙️
      </button>
      {/* <button className="button" onClick={SpeechRecognition.stopListening}>
        Stop!
      </button> */}
      {/* <button className="button" onClick={resetTranscript}>
        Reset
      </button> */}
      <p className="transcript">{transcript}</p>
      {(instru = transcript)}
    </div>
  );
};


// function Dropdown() {
//   const [mode, setMode] = useState('default');

//   const handleModeChange = (event) => {
//     setMode(event.target.value);
//   };

//   return (
//     <div>
//       {/* <label htmlFor="mode-select">Select Mode:</label> */}
//       <select id="mode-select" value={mode} onChange={handleModeChange}>
//         <option value="default">Default</option>
//         <option value="health-advisor">Health Advisor</option>
//         <option value="travel-planner">Travel Planner</option>
//         <option value="weather-forecaster">Weather Forecaster</option>
//         <option value="language-translator">Language Translator</option>
//         <option value="financial-advisor">Financial Advisor</option>
//         <option value="recipe-finder">Recipe Finder</option>
//         <option value="task-manager">Task Manager</option>
//         <option value="news-reader">News Reader</option>
//         <option value="personal-assistant">Personal Assistant</option>
//       </select>
//       <p>Selected Mode: {mode}</p>
//     </div>
//   );
// }



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
