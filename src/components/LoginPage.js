import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [name, setName] = useState(""); // For login and signup
  const [mail, setMail] = useState(""); // For signup
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store error messages
  const [nameError, setNameError] = useState(""); // Error for name validation
  const [passwordError, setPasswordError] = useState(""); // Error for password validation

  const validateName = (name) => {
    const hasNumbers = /\d/; // Vérifie s'il y a des chiffres
    if (hasNumbers.test(name)) {
      return "Name should not contain numbers.";
    }
    if (name.length < 3) {
      return "Name should be at least 3 characters long.";
    }
    return "";
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/; // Au moins une lettre majuscule
    const hasLowercase = /[a-z]/; // Au moins une lettre minuscule
    const hasNumber = /\d/; // Au moins un chiffre
    const hasSpecialChar = /[@$!%*?&]/; // Au moins un caractère spécial
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUppercase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowercase.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character (e.g., @$!%*?&).";
    }
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { name, password });
      alert("Login successful!");
      const { isAdmin, token } = response.data;

      localStorage.setItem("token", token);

      // Redirect user based on role
      window.location.href = isAdmin ? "/adminpanel" : "/homepage";
    } catch (err) {
      setError(err.response?.data?.message || "Error logging in");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    const nameValidationError = validateName(name);
    const passwordValidationError = validatePassword(password);
    if (nameValidationError || passwordValidationError) {
      setNameError(nameValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      const response = await axios.post("/auth/register", { name, mail, password });
      alert("Account created successfully!");
      setIsLogin(true); // Switch to login form after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Error creating account");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {isLogin ? (
          <>
            <h2>Login to Your Account</h2>
            {error && <p style={{ fontSize: "0.75rem", color: "#d9534f", marginTop: "5px" }}>{error}</p>}
            <form onSubmit={handleLogin}>
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
              <button type="button" className="link-button" onClick={() => setIsLogin(false)}>
                Create Account
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Create a New Account</h2>
            {error && <p style={{ fontSize: "0.75rem", color: "#d9534f", marginTop: "5px" }}>{error}</p>}
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(validateName(e.target.value));
                  }}
                  required
                />
                {nameError && <p style={{ fontSize: "0.75rem", color: "#d9534f", marginTop: "5px" }}>{nameError}</p>}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                  required
                />
                {passwordError && <p style={{ fontSize: "0.75rem", color: "#d9534f", marginTop: "5px" }}>{passwordError}</p>}
              </div>
              <button type="submit" className="login-button">
                Sign Up
              </button>
            </form>
            <p className="toggle-form">
              Already have an account?{" "}
              <button type="button" className="link-button" onClick={() => setIsLogin(true)}>
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
