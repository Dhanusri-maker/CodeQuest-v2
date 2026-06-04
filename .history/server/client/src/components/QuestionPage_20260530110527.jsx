import React, { useEffect, useState,useCallback} from "react";
import axios from "axios";

const QuestionPage = () => {

  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [category] = useState("java");
  const [canNext, setCanNext] = useState(false);

  //Fetch Question
  const fetchQuestion =   useState (async () => {
    try {

      const response = await axios.get(
        `http://localhost:5001/api/question/${category}`
      );

      setQuestion(response.data.question);

      setCode("");
      setOutput("");
      setCanNext(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestion();
    }, []);

       //Run Code
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
          language: "java",
          code: code,
        }
      );

      const result = response.data.output;

      setOutput(result);

      // Success check
      if (
        !result.toLowerCase().includes("error") &&
        !result.toLowerCase().includes("exception")
      ) {

        setScore(score + 10);
        setCanNext(true);

      }

    } catch (error) {

      setOutput("Code Execution Failed");

    }

    setLoading(false);
  };

  // Next Question
  const nextQuestion = () => {

    if (!canNext) {
      alert("First run correct code!");
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
        fontFamily: "sans-serif",
      }}
    >

      <h1 style={{ color: "#38bdf8" }}>
        CodeQuest
      </h1>

      <h3>
        Category : {category}
      </h3>

      <h2
        style={{
          marginTop: "30px",
          backgroundColor: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {question}
      </h2>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Java code here..."
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
          outline: "none",
        }}
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
        }}
      >

        <button
          onClick={runCode}
          style={{
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={nextQuestion}
          disabled={!canNext}
          style={{
            backgroundColor: canNext ? "#3b82f6" : "gray",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: canNext ? "pointer" : "not-allowed",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Next Question →
        </button>

      </div>

      {/* Output Box */}

      <div
        style={{
          marginTop: "30px",
          backgroundColor: "#111827",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #334155",
        }}
      >

        <h2 style={{ color: "#38bdf8" }}>
          Output
        </h2>

        <pre
          style={{
            color:
              output.toLowerCase().includes("error")
                ? "red"
                : "#22c55e",
          }}
        >
          {output}
        </pre>

      </div>

      {/* Score */}

      <div
        style={{
          marginTop: "20px",
          fontSize: "22px",
          fontWeight: "bold",
          color: "#facc15",
        }}
      >
        Score : {score}
      </div>

    </div>
  );
};

export default QuestionPage;