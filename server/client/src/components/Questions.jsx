import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Questions = ({ category }) => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
     console.log(category);
        if(category){

            axios.get(`https://codequest-v2.onrender.com/api/questions/${category}`)

            .then((res) => {
                console.log(res.data);

                setQuestions(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

        }

    }, [category]);

    return (

        <div>
             {
                questions.map((q, index) => (

                    <div key={index}>
                        <p>{q.question}</p>

                    </div>

                ))
            }

        </div>
    );
};

export default Questions;