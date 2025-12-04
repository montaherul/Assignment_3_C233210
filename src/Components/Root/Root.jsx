import React from "react";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <header className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900">
            Build Faster, <span className="text-blue-600">Scale Better.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Welcome to the Root application. This is the starting point for your
            next great digital experience.
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md">
              <Link to="/products" >
                Get Started
              </Link>
            
            </button>
            <button className="px-8 py-3 rounded-lg bg-white text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <Link to="/about" >Learn More</Link>
            </button>
          </div>
        </div>
      </header>

      {/* Features Section (Main Content) */}
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-2">High Performance</h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized rendering ensures your application runs smoothly on
                any device without lag.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-2">Secure by Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with the latest security best practices including strict
                data validation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                🎨
              </div>
              <h3 className="text-xl font-bold mb-2">Modern UI</h3>
              <p className="text-gray-600 leading-relaxed">
                A clean, accessible interface designed for the best possible
                user experience.
              </p>
            </div>
          </div>
        </section>
      </main>

       <Footer />
    </div>
  );
};

export default Root;
