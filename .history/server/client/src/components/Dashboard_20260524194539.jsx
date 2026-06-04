import React, { useState } from 'react';
import animeLogo from './logo.jpg'; // Path-ai correct-ah kudunga



import Category from './Category';

import Questions from './Questions';

const Dashboard = () => {

    const [category, setCategory] = useState('');

    return (

        <div
            style={{
                backgroundColor: '#0a0a1a',
                color: 'white',
                minHeight: '100vh',
                textAlign: 'center',
                paddingTop: '20px'
            }}
        >

            <img
                src={animeLogo}
                alt="CodeQuest Logo"
                style={{
                    width: '250px',
                    borderRadius: '20px',
                    border: '3px solid #00d4ff'
                }}
            />

            <h1>Welcome to Dashboard 🚀</h1>

            <h3>Select Your Category</h3>

            <Category setCategory={setCategory} />

            <Questions category={category} />

        </div>

    );

};

export default Dashboard;