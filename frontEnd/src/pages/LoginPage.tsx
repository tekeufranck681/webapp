import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Input from "../components/Input.tsx";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore.ts';
const LoginPage = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  

 const {login,error,isLoading} = useAuthStore();
     const handleLogin = async(e: React.FormEvent<HTMLFormElement>) =>{
         e.preventDefault();
         try{
             await login(email,password);
             navigate("/");
         }catch(error){
             console.log(error);
         }
     
     }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-md w-full bg-green-200 bg-opacity-50 backdrop-filter backdrop-blur-xl  border-2 border-green-500 rounded-2xl shadow-xl overflow-hidden"

    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold  mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text"
        >Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <Input icon={Mail}
            type='email'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <Input icon={Lock}
            type='password'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className='flex items-center mt-[-6px] mb-[10px]'>

            <Link to={"/forgot-password"} className='text-green-600 hover:underline'> Forgot password?</Link>

          </div>

          {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
        
          <motion.button
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600
       text-white font-bold rounded-lg shadow-lg hover:from-green-600
       hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
       focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Log In"}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account yet?{" "}
          <Link to={"/signup"} className='text-green-400 hover:underline'>Register</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage
