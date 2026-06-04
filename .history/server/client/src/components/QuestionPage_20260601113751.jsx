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
const

const fetchQuestion = async () => {
try {

  const response = await axios.get(
    `http://localhost:5001/api/ai-question/${category}`
  );

  setQuestion(response.data.question);
  setCode("");
  setInput("");
  setOutput("");
  setCanNext(false);

} catch (error) {

  console.log("Question Fetch Error:", error);
  setQuestion("Failed to load question");

}

};

useEffect(() => {
fetchQuestion();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const runCode = async () => {

if (code.trim() === "") {
  setOutput("Please write code");
  return;
}

setLoading(true);

try {

  const response = await axios.post(
    "http://localhost:5001/api/compiler/run",
    {
      language: category,
      code,
      input
    }
  );

  const result = response.data.output || "";

  setOutput(result);

  if (
    !result.toLowerCase().includes("error") &&
    !result.toLowerCase().includes("exception")
  ) {

    setScore((prev) => prev + 10);
    setCanNext(true);

  }

} catch (error) {

  console.log(error);
  setOutput("Code Execution Failed");

}

setLoading(false);

};

const nextQuestion = () => {

if (!canNext) {
  alert("Run correct code first!");
  return;
}

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
      disabled={!canNext}
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