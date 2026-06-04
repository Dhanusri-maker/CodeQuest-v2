import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

const QuestionPage = () => {
    const [code,setCode]= useState('')
    const [questions, setQuestions] = useState([]);

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

    return (

        <div
            style={{
                backgroundColor: '#0a0a1a',
                minHeight: '100vh',
                color: 'white',
                padding: '20px'
            }}
        >

            <h1 style={{ textAlign: 'center', color: '#00d4ff' }}>
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
                        defaultLanguage="javascipt"
                        theme="vs-dark"
                        value={code}
                        onChange={(value)=> setCode(value)}
                        />


                        <br />

                        <button
                           onClick={() =>{
                            if(code.trim() ===""){}
                            console.log(code);
                            alert("Code Submitted Successfully");
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

                            Submit Answer

                        </button>

                    </div>

                ))

            }

        </div>

    );

};

export default QuestionPage;