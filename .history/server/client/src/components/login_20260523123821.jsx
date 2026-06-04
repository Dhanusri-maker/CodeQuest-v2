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
            const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            alert("Login Success!");
            navigate('/dashboard'); // Idhu thaan redirect pannum
        } catch (err) {
            alert("Login Failed: " + (err.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;