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
  // const isLoading=true;
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
    <div
      className="max-w-md w-full bg-blue-300 bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-white text-transparent bg-clip-text">
          Create Account
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
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-white to-white text-blue-500 
                      font-bold rounded-lg shadow-lg hover:from-gray-200
                      hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       focus:ring-offset-blue-100 transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" animate-spin mx-auto" size={24} />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
      <div className="px-8 py-4 bg-blue-800 bg-opacity-20 flex justify-center">
        <p className="text-sm text-black">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-800 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
