import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://codequest-v2.onrender.com";

  // ================= REAL LOGIN =================
  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed ❌");
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= GUEST LOGIN =================
  const handleGuestLogin = () => {
    const guestUser = {
      email: "guest@codequest.com",
      name: "Guest User",
    };

    localStorage.setItem("token", "guest-token");
    localStorage.setItem("user", JSON.stringify(guestUser));

    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>CodeQuest Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <br /><br />

      {/* GUEST LOGIN BUTTON */}
      <button
        onClick={handleGuestLogin}
        style={{
          backgroundColor: "gray",
          color: "white",
          padding: "10px",
        }}
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default Login;