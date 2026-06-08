import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

const [email, setEmail] = useState('');  
const [password, setPassword] = useState('');  

const navigate = useNavigate();  

const handleLogin = async (e) => {  

    e.preventDefault();  

    try {  

        const response = await axios.post(  
            'http:codequest-v2.onrender.com/api/auth/login',  
            {  
                email,  
                password  
            }  
        );  

        console.log(response.data);  

        localStorage.setItem('token', response.data.token);  


          

        alert('Login Successful 🔥');  

        navigate('/dashboard');  

    } catch (error) {  

        console.log("error response:",error.response?.data);  
        console.log("Status:",error.response?.status);

        alert('Login Failed ❌');  

    }  

};  

return (  

    <div  
        style={{  
            backgroundColor: '#0a0a1a',  
            color: 'white',  
            minHeight: '100vh',  
            display: 'flex',  
            justifyContent: 'center',  
            alignItems: 'center',  
            flexDirection: 'column'  
        }}  
    >  

        <h1>Welcome to CodeQuest</h1>  

        <h3>Solve • Climb • Win 🚀</h3>  

        <form  
            onSubmit={handleLogin}  
            style={{  
                display: 'flex',  
                flexDirection: 'column',  
                width: '300px',  
                gap: '10px'  
            }}  
        >  

            <input  
                type="email"  
                placeholder="Enter Email"  
                value={email}  
                onChange={(e) => setEmail(e.target.value)}  
                style={{  
                    padding: '10px'  
                }}  
            />  

            <input  
                type="password"  
                placeholder="Enter Password"  
                value={password}  
                onChange={(e) => setPassword(e.target.value)}  
                style={{  
                    padding: '10px'  
                }}  
            />  

            <button  
                type="submit"  
                style={{  
                    padding: '10px',  
                    backgroundColor: '#00d4ff',  
                    border: 'none',  
                    cursor: 'pointer'  
                }}  
            >  

                Start Quiz  

            </button>  

        </form>  

    </div>  

);

};

export default Login;

