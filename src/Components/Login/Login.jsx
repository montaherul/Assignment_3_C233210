import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Footer from "../../Footer/Footer";
import { useAuth } from "../AuthContext/AuthContext"; // Import useAuth hook

/**
 * Login component to handle user authentication.
 *
 * Provides email/password authentication via the backend API.
 * Redirects to the dashboard on successful login.
 * Provides a link to create a new account.
 */
const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  // ▶ EMAIL LOGIN
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const result = await login(email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  // Removed Google/GitHub sign-in and password reset as they are Firebase-specific.
  // These would need to be implemented on the backend if desired.

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Sign In to Your Account
          </h2>

          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          {/* Removed Google and GitHub buttons */}

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

          {/* Removed FORGOT PASSWORD */}

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