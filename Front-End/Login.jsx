import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8088/api/auth/signin", {
        email,      // backend expects "email" if your User entity uses email
        password,
      });

      // Save token (for authenticated requests)
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      navigate("/menu"); // redirect to Menu page
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-8 min-h-screen bg-cover bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&fit=crop')",
      }}>
    <div >
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
          VN RESTUARANT
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-orange-500 underline font-medium">
            Signup
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}
