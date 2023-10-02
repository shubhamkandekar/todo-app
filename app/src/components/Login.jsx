import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/config";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token) navigate('/todo');
  })



  const handelsubmit = async(e) => {
    e.preventDefault();
     try {
      setLoading(true)
      const { data: response} = await axios.post(BASE_URL+"/api/auth/login",{
        email,
        password
      }); 
      const {token} = response.data;
      localStorage.setItem("token", token)
      navigate('/todo')
     } catch (error) {
      const {message} = error.response.data;
       alert(message)
     }finally{
      setLoading(false)
     }
  };
  return (
    <section className="gradient-form flex flex-col min-h-screen min-w-screen bg-slate-800 justify-center items-center">
    <form
      onSubmit={handelsubmit}
      className="container flex flex-col lg:w-1/2  sm:flex-row  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... shadow rounded-lg rounded-br-3xl"
    >
      <div className="left  sm:w-1/2 bg-slate-950 border-b sm:border-r-2">
        <div className="flex flex-col items-center mt-6 px-6">
          <h1 className="text-2xl sm:text-3xl mt-7 font-bold text-orange-600">Login Here!!</h1>
          <i className="text-white mt-2 sm:mt-3">Please register an account</i>
          <label htmlFor="email" className="text-orange-500 mt-10 ">
            Username
          </label>
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            pattern="[^ @]*@[^ @]*"
            placeholder="Enter Email"
            className="h-10 w-full rounded-lg p-1 bg-slate-700 mt-1 shadow-white shadow-md  text-orange-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          />
          <label htmlFor="password" className="text-orange-500 mt-3">
            Password
          </label>
          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="h-10 w-full rounded-lg p-1  bg-slate-700 mt-1 shadow-white shadow-md  text-orange-500  focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-orange-600 hover:bg-orange-400 rounded-lg text-lg font-semibold text-white mt-5 p-1 shadow-white shadow-sm"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <a className="text-indigo-600 underline mt-2 text-center pb-2" href="/">
            Terms and Conditions
          </a>
        </div>
      </div>
      <div className="right  sm:w-1/2 flex items-center flex-col justify-center">
        <div className="mt-5">
          <h1 className="text-2xl sm:text-3xl mt-6 mb-3 font-bold text-slate-50 font-mono">
            Welcome Back!
          </h1>
          <span className="ml-2 sm:ml-5 text-2xl sm:text-4xl font-extrabold text-gray-50">
            Todo-list
          </span>
          <img
            className="mt-5 sm:mt-8 rounded-lg w-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj0VaH5_dHhdk9fWWZ381-npl7ipBErYCwbw&usqp=CAU"
            alt="todo-png"
          />
          <div className="flex items-center flex-col mt-3">
            <span className="text-white">Don't Have Account?</span>
            <button
              onClick={() => navigate("/")}
              className="w-20 mt-2 p-1 bg-indigo-500 text-white shadow-white shadow-sm text-lg font-bold rounded-lg mb-3 "
            >
             Singup
            </button>
          </div>
        </div>
      </div>
    </form>
  </section>
  );
};

export default Login;




