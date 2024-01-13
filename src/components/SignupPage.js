// SignupPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../config/firebase";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        setSignupError('Passwords do not match. Please check and try again.');
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the display name (username) in the user profile
      await updateProfile(user, { displayName: username });

      // Redirect to another page upon successful signup
      navigate('/Home');
    } catch (err) {
      setSignupError('Email already exists. Please try logging in.');
      console.log(err);
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={signUp}>
          Sign Up
        </button>
      </form>

      {signupError && <p className="error-message">{signupError}</p>}

      {/* Add a link/button for logging in */}
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;