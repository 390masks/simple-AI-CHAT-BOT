import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    setLoading(true);
    setAnswer("Loading...");
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          prompt: {
            text: question
          }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      const generatedAnswer = response.data.candidates[0].content;
      setAnswer(generatedAnswer || "No response generated.");
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("Failed to generate an answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Chatbot</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
      />
      <button onClick={generateAnswer} disabled={loading}>
        {loading ? "Generating..." : "Generate Answer"}
      </button>
      <pre>{answer}</pre>
    </div>
  );
};

export default App;
