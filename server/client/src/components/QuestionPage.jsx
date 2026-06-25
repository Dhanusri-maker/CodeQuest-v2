import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionPage = () => {

const [question, setQuestion] = useState("");
const [code, setCode] = useState("");
const [input, setInput] = useState("");
const [output, setOutput] = useState("");
const [loading, setLoading] = useState(false);
const [score, setScore] = useState(0);
const [category] = useState(localStorage.getItem("category") || "java");
const [canNext, setCanNext] = useState(false);
const [timeLeft,setTimeLeft] = useState(600);

const fetchQuestion = async () => {
try {

  const response = await axios.get(
`https://codequest-v2.onrender.com/api/ai-question/${category}`    
 );

  setQuestion(response.data.question);
  setCode("");
  setInput("");
  setOutput("");
  setCanNext(false);
  setTimeLeft(600);

} catch (error) {

  console.log("Question Fetch Error:", error);
  setQuestion("Failed to load question");

}

};

useEffect(() => {
fetchQuestion();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {

  if (timeLeft <= 0) {

    setOutput("⏰ Time's Up!");
    setCanNext(true);

    return;
  }

  const timer = setInterval(() => {

    setTimeLeft((prev) => prev - 1);

  }, 1000);

  return () => clearInterval(timer);

}, [timeLeft]);

const runCode = async () => {
  console.log("Run button clicked");
  if (code.trim() === "") {
    setOutput("Please write code");
    return;
  }

  setLoading(true);

  try {
    

    const response = await axios.post(
       "https://codequestdhanu.duckdns.org/api/compiler/run",
       {
        language:category,
      code,
      input,
    });

    const result =
      response.data.output ||
      response.data.message ||
      response.data.error ||
      "";

    setOutput(result);

    if (
      result &&
      !result.toLowerCase().includes("error") &&
      !result.toLowerCase().includes("exception")
    ) {
      setScore((prev) => prev + 10);
      await axios.post(
  "https://codequestdhanu.duckdns.org/api/leaderboard/add",
  {
    username: localStorage.getItem("username"),
    score: score + 10,
    category,
  }
);
      setCanNext(true);
    }
  } catch (error) {
    console.log(error);

    setOutput(
      error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Code Execution Failed"
    );
  }

  setLoading(false);
};

const nextQuestion = () => {
fetchQuestion();

};

return (
<div
style={{
backgroundColor: "#0f172a",
minHeight: "100vh",
color: "white",
padding: "30px",
}}
>

  <h1 style={{ color: "#38bdf8" }}>
    CodeQuest
  </h1>

  <h3>
    Category: {category}
  </h3>

  <h2
  style={{
    color: "#ef4444",
    marginTop: "10px"
  }}
>
  Time Left: {Math.floor(timeLeft / 60)}:
  {(timeLeft % 60).toString().padStart(2, "0")}
</h2>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "20px",
    }}
  >
    <h2>{question}</h2>
  </div>

  <textarea
    value={code}
    onChange={(e) => setCode(e.target.value)}
    placeholder={"Write your code here..."}
    style={{
      width: "100%",
      height: "300px",
      marginTop: "20px",
      backgroundColor: "#020617",
      color: "#38bdf8",
      border: "2px solid #38bdf8",
      borderRadius: "10px",
      padding: "15px",
      fontSize: "16px",
    }}
  />

  <textarea
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Enter Input Here (Example: 5↵3)"
    style={{
      width: "100%",
      height: "100px",
      marginTop: "15px",
      backgroundColor: "#111827",
      color: "white",
      border: "2px solid orange",
      borderRadius: "10px",
      padding: "15px",
      fontSize: "16px",
    }}
  />

  <div
    style={{
      display: "flex",
      gap: "15px",
      marginTop: "20px",
    }}
  >

    <button
      onClick={runCode}
      disabled={loading}
      style={{
        padding: "12px 20px",
        backgroundColor: "#22c55e",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {loading ? "Running..." : "Run Code"}
    </button>

    <button
      onClick={nextQuestion}
      disabled={false}
      style={{
        padding: "12px 20px",
        backgroundColor: canNext ? "#3b82f6" : "gray",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: canNext ? "pointer" : "not-allowed",
      }}
    >
      Next Question →
    </button>

  </div>

  <div
    style={{
      marginTop: "25px",
      backgroundColor: "#111827",
      padding: "20px",
      borderRadius: "10px",
    }}
  >

    <h3>Output</h3>

    <pre
      style={{
        color: output.toLowerCase().includes("error")
          ? "red"
          : "#22c55e",
      }}
    >
      {output}
    </pre>

  </div>

  <h2
    style={{
      marginTop: "20px",
      color: "#facc15",
    }}
  >
    Score: {score}
  </h2>

</div>

);
};

export default QuestionPage;