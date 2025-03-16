import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import Navbar from "./Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const { data } = await axios.get("http://127.0.0.1:5000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          credentials: "include",
        });

        setUser(data);
      } catch {
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center section-padding">
        <div className="container-width max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="heading-secondary text-center mb-8">Your Profile</h2>
            {user ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-primary-100 rounded-full p-3">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-primary-100 rounded-full p-3">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-primary-100 rounded-full p-3">
                    <Calendar className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold text-gray-900">{user.age}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="btn-secondary w-full flex items-center justify-center gap-2 !border-red-500 !text-red-500 hover:!bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-[200px]"></div>
                    <div className="h-4 bg-gray-200 rounded w-[150px]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
