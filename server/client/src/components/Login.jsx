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
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("email", res.data.email);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
        })
      );

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
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
    localStorage.setItem("username", guestUser.name);
    localStorage.setItem("email", guestUser.email);
    localStorage.setItem("user", JSON.stringify(guestUser));

    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>CodeQuest Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <br />
      <br />

      <button
        onClick={handleGuestLogin}
        style={{
          backgroundColor: "gray",
          color: "white",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Continue as Guest
      </button>

      <br />
      <br />

      <p>Don't have an account?</p>

      <button
        onClick={() => navigate("/signup")}
        style={{
          backgroundColor: "#00d4ff",
          color: "black",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Create Account
      </button>
    </div>
  );
};

export default Login;