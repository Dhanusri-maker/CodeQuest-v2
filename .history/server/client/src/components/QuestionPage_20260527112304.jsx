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

            });

    }, [category]);



    const runCode = async () => {

        if (!code.trim()) {

            alert("Please enter code");

            return;

        }

        try {

            let language = "";

            if (category === "java") {

                language = "java";

            }

            else if (category === "python") {

                language = "python";

            }

            else if (category === "frontend") {

                language = "html";

            }

            else if (category === "backend") {

                language = "javascript";

            }

            else if (category === "AI") {

                language = "python";

            }

            else if (category === "IoT") {

                language = "cpp";

            }



            const response = await axios.post(

                "http://localhost:5001/api/compiler/run",

                {

                    language,

                    code

                }

            );



            console.log(response.data);



            setOutput(

                response.data.run?.output ||

                response.data.compile?.stderr ||

                response.data.run?.stderr ||

                "No Output"

            );

        }

        catch (error) {

            console.log(error.response?.data || error);

            setOutput(

                JSON.stringify(

                    error.response?.data || "Error running code"

                )

            );

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

                CODEQUEST Compiler 🚀

            </h1>

            <h2>

                Category: {category}

            </h2>



            {

                questions.map((q, index) => (

                    <div

                        key={index}

                        style={{

                            border: '1px solid #00d4ff',

                            padding: '20px',

                            marginTop: '20px',

                            borderRadius: '10px'

                        }}

                    >

                        <h3>

                            {q.question}

                        </h3>



                        <Editor

                            height="400px"

                            language={

                                category === "java"

                                    ? "java"

                                    : category === "python"

                                    ? "python"

                                    : category === "frontend"

                                    ? "html"

                                    : category === "backend"

                                    ? "javascript"

                                    : category === "AI"

                                    ? "python"

                                    : "cpp"

                            }

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

                                cursor: 'pointer',

                                fontWeight: 'bold'

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

                ))

            }

        </div>

    );

};

export default QuestionPage;