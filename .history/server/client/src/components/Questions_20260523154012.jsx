import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Questions = ({ category }) => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
     console.log(category);
        if(category){

            axios.get(`http://localhost:5001/api/questions?category${category}`)

            .then((res) => {

                setQuestions(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

        }

    }, [category]);

    return (

        <div>

            <h2>{category} Questions</h2>

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