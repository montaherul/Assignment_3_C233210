import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/firebase.int";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Footer from "../../Footer/Footer";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        await sendEmailVerification(result.user);
        alert("Verification email sent! Please verify before logging in.");
        navigate("/login");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create an Account
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
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
