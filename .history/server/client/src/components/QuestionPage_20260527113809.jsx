import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

const QuestionPage = () => {

    const [code, setCode] = useState('');
    const [questions, setQuestions] = useState([]);
    const [output, setOutput] = useState('');

    const category = localStorage.getItem("category");

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

    const runCode = async () => {

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

        } catch (error) {

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

            <h1 style={{ color: '#00d4ff' }}>
                {category?.toUpperCase()} Questions
            </h1>

            {

                questions.map((q, index) => (

                    <div
                        key={index}
                        style={{
                            marginBottom: '40px',
                            border: '1px solid cyan',
                            padding: '20px',
                            borderRadius: '10px'
                        }}
                    >

                        <h2>{q.question}</h2>

                        <Editor
                            height="400px"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value)}
                        />

                        <br />

                        <button

                            onClick={runCode}

                            style={{

                                marginTop: '10px',

                                padding: '10px 20px',

                                backgroundColor: '#00d4ff',

                                border: 'none',

                                borderRadius: '5px',

                                cursor: 'pointer'

                            }}

                        >

                            Run Code

                        </button>

                        <h3 style={{ color: 'cyan' }}>
                            Output:
                        </h3>

                        <div
                            style={{

                                backgroundColor: '#111',

                                color: 'white',

                                padding: '10px',

                                marginTop: '10px',

                                border: '1px solid cyan'

                            }}
                        >

                            {output}

                        </div>

                    </div>

                ))

            }

        </div>
    );
};

export default QuestionPage;