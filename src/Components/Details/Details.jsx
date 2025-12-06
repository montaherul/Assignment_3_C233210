import React from "react";
import Navigation from "../Navigation/Navigation";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";

const Details = () => {
  const product = useLoaderData();
  const navigate = useNavigate();

  // Destructure with fallbacks to prevent crashes
  const { id, title, price, category, description, image } = product || {};

  // Helper to render static stars for the UI design
  const renderStars = () => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="text-sm text-muted-foreground ml-2">(4.8 stars)</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* Breadcrumb / Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Products
        </button>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 items-start">
          {/* 1. Image Gallery Section */}
          <div className="bg-card rounded-2xl shadow-sm border border-border p-4 flex justify-center items-center mb-8 lg:mb-0">
            <div className="relative aspect-square w-full max-w-[500px] flex items-center justify-center overflow-hidden">
              <img
                src={image}
                alt={title}
                className="object-contain w-full h-full transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* 2. Product Info Section */}
          <div className="mt-10 px-2 sm:px-0 sm:mt-16 lg:mt-0">
            {/* Category & Rating */}
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                {category}
              </span>
              {renderStars()}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-4">
              {title}
            </h1>

            {/* Price */}
            <div className="mt-3 flex items-end">
              <p className="text-4xl font-bold text-primary">${price}</p>
              <span className="ml-2 text-sm text-muted-foreground mb-2">USD</span>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-border pt-8">
              <h3 className="text-sm font-medium text-foreground">
                Description
              </h3>
              <div className="mt-4 prose prose-sm text-muted-foreground leading-relaxed">
                <p>{description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to={`/products/order/${id}`} className="flex-1">
                <button className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-primary-foreground bg-primary hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Order Now
                </button>
              </Link>

              <button className="flex-1 flex items-center justify-center px-8 py-4 border border-border text-base font-medium rounded-xl text-foreground bg-card hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Add to Wishlist
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                In Stock & Ready to Ship
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;