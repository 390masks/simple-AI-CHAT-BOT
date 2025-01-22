import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [question,setQuestion]=useState("")
  const [answer,setAnswer]=useState("")

  async function generateAnswer(){
   setAnswer("loading.....");
    const respones =await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDJbwXinsXI2oQR6_eUNjnjb7qcrwNV6DQ",
      method:"post",
      data:{
        "contents": [{
          "parts":[{"text": question}]
          }]
         }
    });
    setAnswer(respones['data']['candidates'][0]["content"]["parts"][0]["text"]);
  }
  return (
    <div>
      <h1>AI CHAT-BOT</h1>
      <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} ></textarea>
      <button onClick={generateAnswer} > Genarate Answer</button>
      <pre>{answer}</pre>
    </div>
  )
}

export default App