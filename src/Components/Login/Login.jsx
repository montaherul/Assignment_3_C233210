import {
  GoogleAuthProvider,GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase/firebase.int";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // <-- Single, correct import for Link
import Navigation from "../Navigation/Navigation";
import Footer from "../../Footer/Footer";

/**
 * Login component to handle user authentication.
 *
 * Provides two methods of authentication: Google Sign-in and Email/Password.
 * If the user is not verified, an error message is displayed.
 * If the user is verified, they are redirected to the dashboard.
 * Also provides a link to reset the password and a link to create a new account.
 */
const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  // ▶ GITHUB LOGIN
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // ▶ GOOGLE LOGIN
  const handleGoogleSignIn = () => {
    // 1. Open a Google sign-in pop-up window
    signInWithPopup(auth, provider)
      .then(() => {
        // 2. On success, navigate the user to the dashboard
        navigate("/dashboard");
      })
      .catch((err) => {
        // 3. On failure, set the error message
        setError(err.message);
      });
  };

  // ▶ EMAIL LOGIN
  const handleEmailLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // 1. Sign in the user with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // 2. Check if the user's email has been verified
        if (!res.user.emailVerified) {
          setError("✉ Please verify your email before logging in.");
          // You might want to sign the user out here if they are not verified
          // to prevent access, though Firebase rules can handle this too.
          return;
        }
        // 3. If verified, navigate to the dashboard
        navigate("/dashboard");
      })
      .catch((err) => {
        // 4. On failure (e.g., wrong password/email), set the error message
        setError(err.message);
      });
  };

  // ▶ RESET PASSWORD
  const handleResetPassword = () => {
    // 1. Prompt the user for their email address
    const email = prompt("Enter your email for the reset link:");
    if (!email) return;

    // 2. Send the password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Password reset email sent! Please check your inbox."))
      .catch((err) => alert(`Error sending reset email: ${err.message}`));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Sign In to Your Account
          </h2>

          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          {/* GOOGLE SIGN-IN */}
          <button
            onClick={handleGoogleSignIn}
            className="
    w-full 
    py-3 
    mb-4 
    rounded-lg 
    border 
    border-slate-300 
    bg-white 
    hover:bg-slate-100 
    flex 
    items-center 
    justify-center 
    gap-3
  "
          >
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3.1l3 2.4c1.8-1.6 2.8-4 2.8-6.8 0-.6-.1-1.3-.2-1.9H12z"
              />
              <path
                fill="#34A853"
                d="M12 20c2.6 0 4.7-.9 6.3-2.4l-3-2.4c-.8.6-1.9 1-3.3 1-2.5 0-4.6-1.7-5.4-4l-3.1 2.4C5.6 17.9 8.5 20 12 20z"
              />
              <path
                fill="#4A90E2"
                d="M6.6 12c0-.7.1-1.4.3-2.1l-3.1-2.4C3 9 2.5 10.4 2.5 12s.5 3 1.3 4.5l3.1-2.4c-.2-.7-.3-1.4-.3-2.1z"
              />
              <path
                fill="#FBBC05"
                d="M12 6.1c1.4 0 2.6.5 3.6 1.4l2.7-2.7C16.7 2.9 14.6 2 12 2 8.5 2 5.6 4.1 4.7 7.2l3.1 2.4c.8-2.3 2.9-3.5 5.2-3.5z"
              />
            </svg>
            Continue with Google
          </button>

          {/* GITHUB SIGN-IN */}
          <button
            onClick={handleGithubSignIn}
            className="
    mt-3
    w-full
    flex items-center justify-center gap-2
    bg-gray-900 
    text-white 
    py-3 
    rounded-lg 
    shadow-md 
    hover:bg-gray-800 
    active:scale-95 
    transition-all
  "
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.82-.262.82-.582
      0-.287-.01-1.047-.016-2.054-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73
      1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.603-2.665-.303-5.466-1.332-5.466-5.93
      0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3.003-.404
      c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.912 
      1.235 3.222 0 4.61-2.807 5.624-5.48 5.92.43.37.814 1.102.814 2.222 
      0 1.604-.015 2.897-.015 3.293 0 .323.216.7.825.58C20.565 21.796 24 17.297 24 12 
      24 5.37 18.63 0 12 0Z"
              />
            </svg>
            Sign in with GitHub
          </button>

          <div className="text-center my-4 text-slate-500">OR</div>

          {/* EMAIL LOGIN FORM */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Sign In
            </button>
          </form>

          {/* FORGOT PASSWORD */}
          <p
            onClick={handleResetPassword}
            className="text-indigo-600 mt-4 text-center cursor-pointer hover:text-indigo-800"
          >
            Forgot Password?
          </p>

          {/* CREATE ACCOUNT */}
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
       <Footer />
    </>
  );
};

export default Login;
