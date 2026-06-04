import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Editor from '@monaco-editor/react';

const QuestionPage = () => {

    const [questions, setQuestions] = useState([]);

    const [code, setCode] = useState('');

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
                console.log(err.response);
                console.log(err.response)

            });

    }, [category]);

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
                    textAlign: 'center',
                    color: '#00d4ff'
                }}
            >
                CodeQuest 🚀
            </h1>

            {

                questions.map((q, index) => (

                    <div
                        key={index}

                        style={{
                            border: '2px solid #00d4ff',
                            padding: '20px',
                            marginTop: '20px',
                            borderRadius: '10px'
                        }}
                    >

                        <h2>

                            Question {index + 1}

                        </h2>

                        <p
                            style={{
                                fontSize: '20px'
                            }}
                        >

                            {q.question}

                        </p>

                        <Editor

                            height="400px"

                            defaultLanguage={category === "python" ? "python" : "javascript"}

                            theme="vs-dark"

                            value={code}

                            onChange={(value) => setCode(value)}

                        />

                        <button

                            onClick={async () => {

                                if(code.trim() === ""){

                                    alert("Please write some code ⚠️");

                                    return;

                                }

                                try{

                                    let language_id = 63;

                                    if(category === "python"){

                                        language_id = 71;

                                    }

                                    if(category === "java"){

                                        language_id = 62;

                                    }

                                    const response = await axios.post(

                                        'http://localhost:5001/api/compiler/run',

                                        {

                                            code,

                                            language_id

                                        }

                                    );

                                    console.log(response.data);

                                    setOutput(

                                        response.data.stdout ||

                                        response.data.compile_output ||

                                        response.data.stderr ||

                                        "No Output"

                                    );

                                }

                                catch(err){

                                    console.log(err);

                                    setOutput("Error running code");

                                }

                            }}

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

                        <h2
                            style={{
                                marginTop:'20px'
                            }}
                        >

                            Output

                        </h2>

                        <div

                            style={{

                                backgroundColor:'#111',

                                padding:'20px',

                                marginTop:'10px',

                                border:'1px solid cyan',

                                color:'lime'

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