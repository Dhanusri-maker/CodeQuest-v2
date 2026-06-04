import React,{useState} from 'react';
import animeLogo from './logo.jpg'; // Path-ai correct-ah kudunga
import Category from '../components/Category';
import Questions from '../components/Questions';

const Dashboard = () => {
const [category,setCate]
  return (
    <div style={{ backgroundColor: '#0a0a1a', color: 'white', height: '100vh', textAlign: 'center', paddingTop: '20px' }}>
      <img src={animeLogo} alt="CodeQuest Logo" style={{ width: '300px', borderRadius: '15px', border: '2px solid #00d4ff' }} />
      <h1>Welcome to CodeQuest!</h1>
      <p>Solve, Climb, Win!</p>
      <button style={{ backgroundColor: '#00d4ff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Start Quiz
      </button>
       <h1>Welcome to the Dashboard!</h1>
    </div>
  );
};

export default Dashboard;




    

