// Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const navigate = useNavigate(); // For navigation after registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }; 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const apiUrl = process.env.REACT_APP_API_URL;

  //   try {
  //     const response = await fetch(`${apiUrl}/api/register`, { 
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //      // alert('Registration successful!');
  //       alert('Registration successful! You can now login.');
  //       navigate('/login'); // Redirect to login page
  //     } else {
  //       alert(data.error);
  //     }
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //     alert('Something went wrong. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
  
    try {
      const response = await fetch(`${apiUrl}/api/register`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
        //   firstName: formData.firstName,
        //   lastName: formData.lastName,
        //   email: formData.email,
        //   phoneNumber: formData.phoneNumber,
        //   password: formData.password,
        //   role: formData.role
        // }),
        body: JSON.stringify({
          firstName: formData.firstName.trim(),  // Remove accidental spaces
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          password: formData.password,
          role: formData.role.toLowerCase(),  // Ensure lowercase for consistency
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! You can now login.');
        navigate('/login');
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="wrapper-register">
      <form onSubmit={handleSubmit} className="form-register">
        <div className="title-register">Register</div>
        <div className="field">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>First Name</label>
        </div>
        <div className="field">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Last Name</label>
        </div>
        <div className="field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <label>Phone Number</label>
        </div>
        <div className="field">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>
        <div className="field">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
        </div>
        <div className="field">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required>
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="researcher">Researcher</option>
            <option value="student">Student</option>
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
  );
};

export default Register;