import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <Logo width="100px" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Sign In to your Account
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        {/* Login Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) =>
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/i.test(value) ||
                  "Password must contain uppercase, lowercase, number, and special character",
              })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600"
            />
        </div>

        {/* Error Messages for Fields */}
        <div className="text-red-500 text-sm">
          {error && <p>{error}</p>}
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={error}
          className={`w-full py-3 text-white font-semibold rounded-md ${
            error ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none transition duration-300 mt-4`}
        >
          {error ? "Retry" : "Sign In"}
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;
