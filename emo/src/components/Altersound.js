import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function AlterSound() {

  const {transcript, resetTranscript} = useSpeechRecognition()
  //similar to useState, create a transcript and resetTranscript func
  // from the useSpeechRecognition() function
  
  if(!SpeechRecognition.browserSupportsSpeechRecognition()){
    return null
  }
  //If your browser does not support speech recognition, return null
// otherwise, return the following
  return (
    <div className="App">
      <button className="button" onClick={SpeechRecognition.startListening}>Listen!</button> 
      <button className="button" onClick={SpeechRecognition.stopListening}>Stop!</button>
      <button className="button" onClick={resetTranscript}>Reset</button>
      <p className='transcript'>i am saying that  {transcript}</p>
    </div>
  );
}

export default AlterSound;