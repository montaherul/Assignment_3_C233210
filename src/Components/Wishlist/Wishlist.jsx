import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";

const Wishlist = () => {
  // In a real application, you would fetch wishlist items for the logged-in user here.
  // For now, this is a placeholder.
  const wishlistItems = []; // Example: [{ id: 'p1', title: 'Product A', price: 100, image: 'url' }]

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Your Wishlist
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Items you've saved for later.
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border text-center">
              <p className="text-muted-foreground text-lg mb-6">
                Your wishlist is empty. Start browsing to save your favorite items!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-sky-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Render wishlist items here */}
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-card p-4 rounded-lg shadow-sm border border-border"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <Link
                    to={`/products/${item.id}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;