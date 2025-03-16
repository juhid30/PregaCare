import { useState } from "react";
import { login, logout, fetchProtectedData } from "../utils/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      setMessage("Login successful! Token stored in cookies.");
    } catch (error) {
      setMessage("Login failed.");
    }
  };

  const handleFetchProtectedData = async () => {
    try {
      const data = await fetchProtectedData();
      setMessage(data.msg);
    } catch (error) {
      setMessage("Access denied. Please login.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        className="border p-2 w-full"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mt-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 mt-2 ml-2"
        onClick={handleFetchProtectedData}
      >
        Fetch Protected Data
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 mt-2 ml-2"
        onClick={logout}
      >
        Logout
      </button>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default Login;
