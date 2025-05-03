
import { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
      toast.success("User logged in successfully");
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
        <source src="/videoplayback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🧊 Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* 💳 Login Card */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-t-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-yellow-100 text-transparent bg-clip-text">
              Welcome Back!
            </h2>
            <form onSubmit={handleLogin}>
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

              {error && <p className="text-red-600 font-semibold mt-3 text-center">{error}</p>}

              <button
                className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg shadow-md hover:from-green-700 hover:to-green-800 transition duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto" size={24} />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
          <div className="px-8 py-4 bg-white bg-opacity-70 flex justify-center rounded-b-3xl">
            <p className="text-sm text-gray-800">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-orange-700 hover:underline font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
