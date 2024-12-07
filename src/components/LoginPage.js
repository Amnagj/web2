import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For signup

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in with Email: ${email}, Password: ${password}`);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Creating Account for Name: ${name}, Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {isLogin ? (
          // Login Form
          <>
            <h2>Login to Your Account</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit" className="login-button">Login</button>
            </form>
            <p className="toggle-form">
              Don't have an account?{" "}
              <button className="link-button" onClick={() => setIsLogin(false)}>
                Create Account
              </button>
            </p>
          </>
        ) : (
          // Signup Form
          <>
            <h2>Create a New Account</h2>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit" className="login-button">Sign Up</button>
            </form>
            <p className="toggle-form">
              Already have an account?{" "}
              <button className="link-button" onClick={() => setIsLogin(true)}>
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
