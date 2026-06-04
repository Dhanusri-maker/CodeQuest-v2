import React from 'react';

import { useNavigate } from 'react-router-dom';

const Category = ({ setCategory }) => {

    const navigate = useNavigate();

    const categories = [
        "java",
        "python",
        "frontend",
        "backend",
        "ai",
        "iot"
    ];

    return (

        <div>

            {

                categories.map((cat, index) => (

                    <button
                        key={index}

                        onClick={() => {

                            setCategory(cat);
                            localStoragr

                            navigate('/questionpage');

                        }}

                        style={{
                            margin: "5px",
                            padding: "10px",
                            cursor: "pointer"
                        }}
                    >

                        {cat}

                    </button>

                ))

            }

        </div>

    );

};

export default Category;