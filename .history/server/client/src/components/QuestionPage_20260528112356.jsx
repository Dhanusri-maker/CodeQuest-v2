import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

const QuestionPage = () => {

    const [code, setCode] = useState('');

    const [questions, setQuestions] = useState([]);

    const [output, setOutput] = useState('');

    const [timeLeft, setTimeLeft] = useState(600);

    const [score, setScore] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [isTimeUp, setIsTimeUp] = useState(false);

    const category = localStorage.getItem("category");



    // FETCH QUESTIONS

    useEffect(() => {

        axios
            .get(`http://localhost:5001/api/questions/${category}`)

            .then((res) => {

                console.log(res.data);

                setQuestions(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, [category]);



    // TIMER

    useEffect(() => {

        if (timeLeft === 0) {

            setIsTimeUp(true);

            setOutput("⏰ Time Up!");

            return;

        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);



    // NEXT QUESTION

    const nextQuestion = () => {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);

            setCode('');

            setOutput('');

            setTimeLeft(600);

            setIsTimeUp(false);

        }

        else {

            alert(`Quiz Finished 🚀 Final Score: ${score}`);

        }

    };



    // RUN CODE

    const runCode = async () => {

        if (isTimeUp) {

            setOutput("⏰ Time is over");

            return;

        }

        if (!code.trim()) {

            setOutput("Please enter your code");

            return;

        }

        try {

            const response = await axios.post(

                "http://localhost:5001/api/compiler/run",

                {

                    language: category,

                    code: code

                }

            );

            console.log(response.data);

            setOutput(response.data.output);



            // SCORE + SAVE LEADERBOARD

            if (

                response.data.output.includes("Largest") ||

                response.data.output.includes("Factorial") ||

                response.data.output.includes("Successfully") ||

                response.data.output.includes("Designed")

            ) {

                const newScore = score + 10;

                setScore(newScore);



                await axios.post(

                    "http://localhost:5001/api/leaderboard/add",

                    {

                        username:localStoragr.getItem,

                        score: newScore,

                        category: category

                    }

                );

            }

        }

        catch (error) {

            console.log(error);

            setOutput("Code execution failed");

        }

    };



    return (

        <div

            style={{

                backgroundColor: '#0a0a1a',

                minHeight: '100vh',

                color: 'white',

                padding: '20px'

            }}

        >

            <h1

                style={{

                    color: '#00d4ff',

                    textAlign: 'center'

                }}

            >

                CODEQUEST 🚀

            </h1>



            <h2

                style={{

                    color: 'yellow',

                    textAlign: 'center'

                }}

            >

                ⏰ Time Left: {timeLeft} sec

            </h2>



            <h2

                style={{

                    color: '#00ff99',

                    textAlign: 'center'

                }}

            >

                🏆 Score: {score}

            </h2>



            <h2

                style={{

                    color: 'cyan'

                }}

            >

                Category: {category}

            </h2>



            {

                questions.length > 0 && (

                    <div

                        style={{

                            marginTop: '20px',

                            border: '1px solid cyan',

                            padding: '20px',

                            borderRadius: '10px'

                        }}

                    >

                        <h2>

                            Question {currentQuestion + 1}

                        </h2>



                        <p

                            style={{

                                fontSize: '20px'

                            }}

                        >

                            {questions[currentQuestion]?.question}

                        </p>



                        <Editor

                            height="400px"

                            defaultLanguage={

                                category === "java"

                                    ? "java"

                                    : category === "python"

                                    ? "python"

                                    : "javascript"

                            }

                            theme="vs-dark"

                            value={code}

                            onChange={(value) => setCode(value)}

                        />



                        <button

                            onClick={runCode}

                            disabled={isTimeUp}

                            style={{

                                marginTop: '10px',

                                padding: '10px 20px',

                                backgroundColor: isTimeUp ? 'gray' : '#00d4ff',

                                border: 'none',

                                borderRadius: '5px',

                                cursor: 'pointer',

                                fontWeight: 'bold',

                                marginRight: '10px'

                            }}

                        >

                            Run Code

                        </button>



                        <button

                            onClick={nextQuestion}

                            style={{

                                marginTop: '10px',

                                padding: '10px 20px',

                                backgroundColor: '#00ff99',

                                border: 'none',

                                borderRadius: '5px',

                                cursor: 'pointer',

                                fontWeight: 'bold'

                            }}

                        >

                            Next Question ➡

                        </button>



                        <h3

                            style={{

                                color: 'cyan'

                            }}

                        >

                            Output:

                        </h3>



                        <div

                            style={{

                                backgroundColor: '#111',

                                color: '#00ff00',

                                padding: '10px',

                                marginTop: '10px',

                                border: '1px solid cyan',

                                minHeight: '50px',

                                whiteSpace: 'pre-wrap'

                            }}

                        >

                            {output}

                        </div>

                    </div>

                )

            }

        </div>

    );

};

export default QuestionPage;