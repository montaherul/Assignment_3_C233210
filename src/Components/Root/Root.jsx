import React from "react";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Navigation />

      {/* Hero Section */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            Elevate Your <span className="text-primary">Digital Experience.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Discover a seamless blend of innovation and design. Your journey to exceptional products starts here.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/products" className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg shadow-primary/30">
                Explore Products
            </Link>
            <Link to="/about" className="px-8 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold border border-border hover:bg-muted transition-colors duration-200 shadow-sm">
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section (Main Content) */}
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">High Performance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Optimized rendering ensures your application runs smoothly on
                any device without lag.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-2xl mb-4">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Secure by Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built with the latest security best practices including strict
                data validation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-2xl mb-4">
                🎨
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Modern UI</h3>
              <p className="text-muted-foreground leading-relaxed">
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