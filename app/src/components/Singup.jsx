import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/config";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post( BASE_URL+"/api/auth/signup", {
        email,
        password,
        username,
      });
      navigate("/login");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="gradient-form flex flex-col min-h-screen min-w-screen bg-slate-800 justify-center items-center">
    <form
      onSubmit={handleSubmit}
      className="container flex flex-col lg:w-1/2 sm:flex-row  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... shadow rounded-lg rounded-br-3xl"
    >
      <div className="left  sm:w-1/2 bg-slate-950 border-b sm:border-r-2">
        <div className="flex flex-col items-center mt-6 px-6">
          <h1 className="text-2xl sm:text-3xl mt-6 font-bold text-orange-600">New Here!!</h1>
          <i className="text-white mt-2 sm:mt-3">Please register an account</i>
          <label htmlFor="username" className="text-orange-500 mt-5">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            placeholder="Username"
            className="h-10 w-full rounded-lg p-1 bg-slate-700 mt-1 shadow-white shadow-md  text-orange-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          />
          <label htmlFor="email" className="text-orange-500 mt-3 ">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Email"
            className="h-10 w-full rounded-lg p-1 bg-slate-700 mt-1 shadow-white shadow-md  text-orange-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          />
          <label htmlFor="password" className="text-orange-500 mt-3">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Password"
            className="h-10 w-full rounded-lg p-1 bg-slate-700 mt-1 shadow-white shadow-md  text-orange-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-orange-600 hover:bg-orange-400 rounded-lg text-lg font-semibold text-white mt-5 p-1 shadow-white shadow-sm"
          >
            {loading ? "Loading..." : "Signup"}
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
            <span className="text-white">Have an Account?</span>
            <button
              onClick={() => navigate("/login")}
              className="w-20 mt-2 p-1 bg-indigo-500 text-white shadow-lg text-lg font-bold rounded-lg mb-3"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  </section> 
  );
};

export default Signup;


