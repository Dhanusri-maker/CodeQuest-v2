import React,{useState} from 'react';

import { useNavigate } from 'react-router-dom';

import animeLogo from './logo.jpg';

import Category from '../components/Category';

import Questions from '../components/Questions';

const Dashboard = () => {

const [category,setCategory] = useState('');

const navigate = useNavigate();

  return (

    <div

    style={{

      backgroundColor:'#0a0a1a',

      color:'white',

      minHeight:'100vh',

      textAlign:'center',

      paddingTop:'40px'

    }}

    >

      <img

      src={animeLogo}

      alt="Logo"

      style={{

        width:'120px',

        borderRadius:'20px',

        boxShadow:'0px 0px 20px cyan'

      }}

      />



      <h1

      style={{

        color:'#00d4ff',

        marginTop:'20px',

        fontSize:'50px'

      }}

      >

        CODEQUEST 🚀

      </h1>



      <p

      style={{

        color:'#ccc',

        fontSize:'20px'

      }}

      >

        Practice Coding & Level Up 😎🔥

      </p>



      <Category setCategory={setCategory} />



      <Questions category={category} />



      <button

      onClick={() => navigate('/leaderboard')}

      style={{

        marginTop:'30px',

        padding:'12px 25px',

        backgroundColor:'#00d4ff',

        border:'none',

        borderRadius:'10px',

        color:'white',

        fontWeight:'bold',

        cursor:'pointer',

        fontSize:'18px',

        boxShadow:'0px 0px 10px cyan'

      }}

      >

        🏆 View Leaderboard

      </button>
      <button>
        
      </button>

    </div>

  );

};

export default Dashboard;