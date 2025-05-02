import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext"; // ✅ import useAuth

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ get setUser from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     const res = await loginUser(form); // this should return user + token
  //     localStorage.setItem("token", res.data.token); // optional if you're using JWT auth
  //     setUser(res.data.user);
  //     localStorage.setItem("user", JSON.stringify(res.data.user));
  //     navigate("/");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Login failed");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await loginUser(form);
      console.log("📦 API response:", res.data);
  
      localStorage.setItem("token", res.data.token);
  
      // ✅ Set user directly (not res.data.user)
      setUser({ _id: res.data._id, email: res.data.email });
  
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
