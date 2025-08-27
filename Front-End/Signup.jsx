import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({ name, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-8 min-h-screen bg-cover bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&fit=crop')",
      }}>
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition">
            Signup
          </button>
        </form>
        <p className="mt-5 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-orange-500 underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
