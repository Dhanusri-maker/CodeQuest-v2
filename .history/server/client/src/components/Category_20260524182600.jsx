cimport React from 'react';

const Category = ({ setCategory }) => {

    return (

        <div>

            <button onClick={() => setCategory('java')}>
                Java
            </button>

            <button onClick={() => setCategory('python')}>
                Python
            </button>

            <button onClick={() => setCategory('frontend')}>
                Frontend
            </button>

            <button onClick={() => setCategory('backend')}>
                Backend
            </button>

            <button onClick={() => setCategory('ai')}>
                AI
            </button>

            <button onClick={() => setCategory('iot')}>
                IoT
            </button>

        </div>

    );
};

export default Category;