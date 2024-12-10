import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./LoginPage.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [name, setName] = useState(""); // For login and signup
  const [mail, setMail] = useState(""); // For signup
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store error messages

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        name,
        password,
      });
  
      alert("Login successful!");
      console.log(response.data);
  
      const { isAdmin } = response.data; // Extract isAdmin from response
  
      // Store JWT token in localStorage or cookies
      localStorage.setItem("token", response.data.token);
  
      // Redirect user based on role
      if (isAdmin) {
        window.location.href = "/adminpanel"; // Redirect to admin panel
      } else {
        window.location.href = "/homepage"; // Redirect to homepage
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error logging in";
      setError(errorMessage);
    }
  };
  

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("/auth/register", {
        name,
        mail, // For signup
        password,
      });
      alert("Account created successfully!");
      setIsLogin(true); // Switch to login form after successful signup
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error creating account";
      setError(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {isLogin ? (
          // Login Form
          <>
            <h2>Login to Your Account</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name} // Using name for login
                  onChange={(e) => setName(e.target.value)} // Using name for login
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <p className="toggle-form">
              Don't have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setIsLogin(false)}
              >
                Create Account
              </button>
            </p>
          </>
        ) : (
          // Signup Form
          <>
            <h2>Create a New Account</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Sign Up
              </button>
            </form>
            <p className="toggle-form">
              Already have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
