
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, username);
      navigate("/");
      toast.success("User registered successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videoplayback1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🧊 Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* 🧾 Form Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          <div className="p-8 bg-gradient-to-br from-orange-300 to-yellow-400 rounded-t-2xl w-full animate-slideInUp">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-orange-100 text-transparent bg-clip-text animate-fadeIn">
              Create Your Recipe Account
            </h2>

            <form onSubmit={handleSignUp}>
              <Input
                icon={User}
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="text-red-600 font-semibold mt-3 text-center animate-fadeIn">
                  {error}
                </p>
              )}
              <button
                className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white
                font-bold rounded-lg shadow-lg hover:from-green-700 hover:to-green-800
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                focus:ring-offset-green-100 transition duration-200 ease-in-out
                transform hover:scale-105 active:scale-95"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto" size={24} />
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
          <div className="px-8 py-4 bg-orange-900 bg-opacity-10 flex justify-center rounded-b-2xl">
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <Link to={"/login"} className="text-orange-700 hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
