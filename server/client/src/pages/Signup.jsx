import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://codequest-v2.onrender.com/api/auth/register",
        { name, email, password }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
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

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;