import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import Footer from "./Footer";

const LoginPage = () => {
  const logo = "/Hackanomics_logo.png"; // get the logo
  const loginpic = "./loginpic.jpeg";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To show error if login fails
  const navigate = useNavigate(); // Hook to navigate after login

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password123") {
      navigate("/dashboard");
    } else if (email === "testadmin@example.com" && password === "password123admin") {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <NavbarHome showHomeLink={true} />
      <div className="relative h-screen"> 
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginpic})` }} >
        </div>
 
        {/* Centered login form */}
        <div className="relative flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Hackronomics Logo" className="h-16 w-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot Password?
              </Link>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-sm text-blue-600 hover:text-blue-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
