import { useState } from 'react'
import {User,Mail,Lock,Loader} from 'lucide-react'
import {Link,useNavigate} from 'react-router-dom';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
const LoginPage=()=> {
  // const isLoading=false;
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const {login,isLoading,error}=useAuthStore();
   const navigate = useNavigate();
    const handleLogin =async (e)=>{
      e.preventDefault();
      try {
        await login(email,password);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='max-w-md  bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden'>
      <div className="p-8 bg-gray-900 rounded-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text">
          Login Yourself
        </h2>
        <form  onSubmit={handleLogin}>
          
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
         
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					
          <button
                      className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white 
                      font-bold rounded-lg shadow-lg hover:from-blue-600
                      hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       focus:ring-offset-gray-900 transition duration-200"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader className=" animate-spin mx-auto" size={24} />
                      ) : (
                        "Login"
                      )}
                    </button>

          
        </form>
        
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-10 flex justify-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to={"/register"} className="text-blue-400 hover:underline">
                  Register
                </Link>
              </p>
            </div>
    </div>
  )
}

export default LoginPage