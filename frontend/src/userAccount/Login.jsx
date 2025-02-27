// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Use the shared CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation
  const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from environment variable

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`${apiUrl}/api/login`, {  
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       localStorage.setItem('token', data.token); // Store token for authentication

  //       // Redirect based on user status
  //       if (data.role === 'admin') {
  //         navigate('/admin-dashboard');
  //       } 
  //       else if (data.role === 'researcher') {
  //         navigate('/volunteer-dashboard');
  //       }
  //       else if (data.role === 'student') {
  //         navigate('/student-dashboard');
  //       }
  //     } else {
  //       alert(data.error);
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     alert('Something went wrong. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
  
    try {
      const response = await fetch(`${apiUrl}/api/login`, {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token for authentication
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (data.role === 'researcher') {
          navigate('/volunteer-dashboard');
        } else if (data.role === 'student') {
          navigate('/student-dashboard');
        }
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="wrapper-login">
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="field-login">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required/>
          <label>Email Address</label>
        </div>
        <div className="field-login">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required/>
          <label>Password</label>
        </div>
        <div className="field-login">
          <input type="submit" value="Login" className="auth-btn-login" />
        </div>
        <p className="p-login">
          Not a member? <Link to="/register">Signup now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;