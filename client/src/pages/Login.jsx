import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(form);
      setUser({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-[#2C1D0E] mb-4 text-center">Login</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-[#E0DBD3] p-2 rounded text-[#2C1D0E] bg-[#FAF8F5]"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-[#E0DBD3] p-2 rounded text-[#2C1D0E] bg-[#FAF8F5]"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#7F5539] text-white py-2 rounded hover:bg-[#5E4B3C] transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#5E4B3C]">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#7F5539] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
