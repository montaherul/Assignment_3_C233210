import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Footer from "../../Footer/Footer";
import { useAuth } from "../AuthContext/AuthContext"; // Import useAuth hook

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth(); // Use the register function from AuthContext

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value; // Assuming you add a name field

    // Basic password validation (can be enhanced)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const result = await register(email, password, name);

    if (result.success) {
      alert("Registration successful! You are now logged in.");
      navigate("/dashboard"); // Redirect to dashboard after successful registration and login
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create an Account
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password (min 6 chars)"
              required
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600" >
              Login
            </Link>
          </p>
        </div>
      </div>
       <Footer/>
    </>
  );
};

export default Register;