// LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../config/firebase";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to another page upon successful login
            navigate('/Home');
        } catch (err) {
            setLoginError('Invalid email or password. Please sign up if you do not have an account.');
            console.log(err);
        }
    }

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setResetPasswordSuccess(true);
        } catch (err) {
            setLoginError('Error sending reset password email. Please try again.');
            console.log(err);
        }
    }

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        className="form-input"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        className="form-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" className="login-button" onClick={signIn}>
                    Login
                </button>
                <p className="forgot-password-link" onClick={handleForgotPassword}>
                    <Link>Forgot Password?</Link>
                </p>
            </form>

            {loginError && <p className="error-message">{loginError}</p>}
            {resetPasswordSuccess && <p className="success-message">Password reset email sent. Check your inbox.</p>}

            {/* Add a link/button for signing up */}
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginPage;
