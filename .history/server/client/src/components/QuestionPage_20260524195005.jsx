import React from 'react';

const QuestionPage = () => {

    return (

        <div
            style={{
                backgroundColor: '#0a0a1a',
                color: 'white',
                minHeight: '100vh',
                padding: '20px'
            }}
        >

            <h1>Backend Question 🚀</h1>

            <h2>Create REST API using Express</h2>

            <textarea
                placeholder="Write your code here..."
                style={{
                    width: '100%',
                    height: '300px',
                    padding: '10px',
                    marginTop: '20px',
                    backgroundColor: '#111',
                    color: 'white',
                    border: '2px solid #00d4ff',
                    borderRadius: '10px'
                }}
            />

            <br /><br />

            <button
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#00d4ff',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '10px'
                }}
            >

                Submit

            </button>

        </div>

    );

};

export default QuestionPage;