import axios from "axios";

const API_URL = "http://127.0.0.1:5000";
const AUTH_URL = "http://127.0.0.1:5000/auth";

// ✅ Login Function - Ensures Cookies Are Stored
export const login = async (email, password) => {
  await axios.post(
    `${AUTH_URL}/login`,
    { email, password },
    {
      withCredentials: true, // ✅ Ensures cookies are sent
    }
  );
};
export const register = async (formData, navigate) => {
  console.log(formData);
  try {
    const response = await axios.post(`${AUTH_URL}/register`, formData, {
      withCredentials: true, // ✅ Ensures cookies are sent
    });
    console.log(response);
    if (response.status === 201) {
      navigate("/login"); // ✅ Redirect after successful registration
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.response?.data?.message || "Registration failed");
  }
};

// ✅ Fetch Protected Data - Ensures Cookies Are Sent
export const fetchProtectedData = async () => {
  const response = await axios.get(`${API_URL}/protected`, {
    withCredentials: true, // ✅ Must include cookies
  });
  return response.data;
};

// ✅ Refresh Token Function
export const refreshAccessToken = async () => {
  await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true });
};

// ✅ Logout Function - Clears Cookies
export const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};
