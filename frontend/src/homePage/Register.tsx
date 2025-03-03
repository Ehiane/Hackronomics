import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Register.css";
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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Dummy registration check
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.email === "test@example.com" && formData.password === "password123" && formData.role === "user") {
      alert("Registration successful! You can now login.");
      navigate("/login");
    } 
    if (formData.email === "testadmin@example.com" && formData.password === "password123admin" && formData.role === "admin") {
      alert("Registration successful! You can now login.");
      navigate("/login");
    } 
    if (formData.email === "test@example.com" && formData.role === "admin") {
      alert("Not Authorized as an admin");
    } 
    else {
      alert("Something went wrong. Please try again.");
    }
  };

  // API registration call
  const handleSubmitAPI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = "http://localhost:5000"; 

    try {
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          password: formData.password,
          role: formData.role.toLowerCase(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! You can now login.");
        navigate("/login");
      } else {
        alert(data.detail || "Something went wrong.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <NavbarHome showHomeLink={true} />
      <div className="wrapper-register">
        <form onSubmit={handleSubmit} className="form-register">
          <div className="title-register">Register</div>
          <div className="field">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <label>First Name</label>
          </div>
          <div className="field">
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <label>Last Name</label>
          </div>
          <div className="field">
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            <label>Phone Number</label>
          </div>
          <div className="field">
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <label>Password</label>
          </div>
          <div className="field">
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            <label>Confirm Password</label>
          </div>
          <div className="field">
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="field">
            <input type="submit" value="Submit" className="auth-btn" />
          </div>
          <p className="p-register">
            Already a member? <Link to="/login"> Login here</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;


// Register.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Register.css';
// import NavbarHome from './NavbarHome';
// import Footer from './Footer';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//   });

//   const navigate = useNavigate(); // For navigation after registration

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Dummy check for registration
//     if (
//       (formData.email === "test@example.com" && formData.password === "password123" && formData.role === "student") ||
//       (formData.email === "testadmin@example.com" && formData.password === "password123admin" && formData.role === "admin")
//     ) {
//       alert('Registration successful! You can now login.');
//       navigate('/login');
//     } else {
//       alert('Something went wrong. Please try again.');
//     }
//   };

//   const handleSubmitAPI = async (e) => {
//     e.preventDefault();
//     const apiUrl = process.env.REACT_APP_API_URL;

//     try {
//       const response = await fetch(`${apiUrl}/api/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: formData.firstName.trim(),
//           lastName: formData.lastName.trim(),
//           email: formData.email.trim(),
//           phoneNumber: formData.phoneNumber.trim(),
//           password: formData.password,
//           role: formData.role.toLowerCase(),
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert('Registration successful! You can now login.');
//         navigate('/login');
//       } else {
//         alert(data.detail || 'Something went wrong.');
//       }
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <>
//       <NavbarHome showHomeLink={true} />
//       <div className="wrapper-register">
//         <form onSubmit={handleSubmit} className="form-register">
//           <div className="title-register">Register</div>
//           <div className="field">
//             <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
//             <label>First Name</label>
//           </div>
//           <div className="field">
//             <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
//             <label>Last Name</label>
//           </div>
//           <div className="field">
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//             <label>Email Address</label>
//           </div>
//           <div className="field">
//             <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//             <label>Phone Number</label>
//           </div>
//           <div className="field">
//             <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//             <label>Password</label>
//           </div>
//           <div className="field">
//             <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//             <label>Confirm Password</label>
//           </div>
//           <div className="field">
//             <select name="role" value={formData.role} onChange={handleChange} required>
//               <option value="" disabled>Select Role</option>
//               <option value="admin">Admin</option>
//               <option value="student">Student</option>
//             </select>
//           </div>
//           <div className="field">
//             <input type="submit" value="Submit" className="auth-btn" />
//           </div>
//           <p className="p-register">
//             Already a member? <Link to="/login"> Login here</Link>
//           </p>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Register;