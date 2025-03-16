import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    try {
      const { data } = await axios.post(
        `http://127.0.0.1:5000${endpoint}`,
        form
      );
      localStorage.setItem("token", data.access_token);
      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>
        {isRegister && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <p className="mt-2 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-500"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
