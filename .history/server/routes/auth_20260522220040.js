axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Login endpoint-kku request anuprom
            const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            alert("Login Success!");
            console.log("Token:", response.data.token); // JWT token inga varum
        } catch (err) {
            alert("Login Failed!");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
