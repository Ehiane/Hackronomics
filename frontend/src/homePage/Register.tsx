import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import Footer from "./Footer";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const Register = () => {
  const bgImg = "./loginpic.jpeg";
  const logo = "/Hackanomics_logo.png";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (
  //     (formData.email === "test@example.com" && formData.password === "password123" && formData.role === "user") ||
  //     (formData.email === "testadmin@example.com" && formData.password === "password123admin" && formData.role === "admin")
  //   ) {
  //     alert("Registration successful!");
  //     navigate("/login");
  //   } else if (formData.email === "test@example.com" && formData.role === "admin") {
  //     alert("Not Authorized as admin");
  //   } else {
  //     alert("Something went wrong. Try again.");
  //   }
  // };

  // Add this to the existing handleSubmit function in Register.tsx

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (
    (formData.email === "test@example.com" && formData.password === "password123" && formData.role === "user") ||
    (formData.email === "testadmin@example.com" && formData.password === "password123admin" && formData.role === "admin")
  ) {
    alert("Registration successful!");
    navigate("/login");
  } else if (formData.email === "test@example.com" && formData.role === "admin") {
    alert("Not Authorized as admin");
  } else {
    alert("Something went wrong. Try again.");
  }

  try {
    const response = await fetch("/api/register", {
    //const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        DOB: "2000-01-01", // Set a dummy/default DOB
        primaryLocation: "Unknown",
        zipcode: "00000",
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Registration failed");

    alert("Registration successful!");
    navigate("/login");
  } catch (err: any) {
    alert(err.message);
  }
};

  return (
    <>
      <NavbarHome showHomeLink={true} />
      <div className="relative h-screen w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>
       
        <div className="relative flex items-center justify-center min-h-screen bg-black bg-opacity-50 px-4 py-12">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">

            <div className="flex justify-center mb-6">
              <img src={logo} alt="Hackanomics Logo" className="h-16 w-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="input-style"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="input-style"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="input-style"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Phone Number"
                className="input-style"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="input-style"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                className="input-style"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="input-style col-span-1 md:col-span-2"
              >
                <option value="" disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <button
                type="submit"
                className="col-span-1 md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
              >
                Register
              </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-700">
              Already a member?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />

      {/* Inline style for input fields */}
      <style>{`
        .input-style {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          width: 100%;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }

        .input-style:focus {
          outline: none;
          border-color: #2563eb;
        }

        select.input-style {
          height: 46px;
          background-color: white;
        }
      `}</style>
    </>
  );
};

export default Register;