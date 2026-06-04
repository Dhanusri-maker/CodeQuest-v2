import React from 'react';

const QuestionPage = () => {

    return (

        <div
            style={{
                backgroundColor: '#0a0a1a',
                color: 'white',
                minHeight: '100vh',
                padding: '30px',
                fontFamily: 'Arial'
            }}
        >

            <h1
                style={{
                    color: '#00d4ff',
                    textAlign: 'center'
                }}
            >
                CodeQuest 🚀
            </h1>

            <div
                style={{
                    backgroundColor: '#111',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '2px solid #00d4ff',
                    marginTop: '30px'
                }}
            >

                <h2>Backend Question</h2>

                <p
                    style={{
                        fontSize: '20px',
                        marginTop: '20px'
                    }}
                >
                </p>

            </div>

            <textarea
                placeholder="Write your code here..."
                style={{
                    width: '100%',
                    height: '300px',
                    marginTop: '30px',
                    padding: '15px',
                    backgroundColor: '#1e1e1e',
                    color: '#00ffcc',
                    border: '2px solid #00d4ff',
                    borderRadius: '10px',
                    fontSize: '16px'
                }}
            />

            <br />

            <button
                style={{
                    marginTop: '20px',
                    padding: '12px 25px',
                    backgroundColor: '#00d4ff',
                    color: 'black',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '18px',
                    cursor: 'pointer'
                }}
            >
                Submit Answer
            </button>

        </div>

    );

};

export default QuestionPage;