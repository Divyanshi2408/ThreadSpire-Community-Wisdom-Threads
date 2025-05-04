import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-[#2C1D0E] mb-4 text-center">Register</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border border-[#E0DBD3] p-2 rounded text-[#2C1D0E] bg-[#FAF8F5]"
            onChange={handleChange}
            required
          />
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
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#5E4B3C]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#7F5539] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
