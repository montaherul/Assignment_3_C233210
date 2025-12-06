import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Product from "../Product/Product"; // Assuming Product component is used for featured products

const Root = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products?limit=4"); // Fetch a few products
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Navigation />

      {/* Hero Banner with Offers */}
      <section className="relative bg-gradient-to-r from-primary to-sky-400 text-primary-foreground py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Unleash Your Potential <br className="hidden sm:inline"/> with Our Latest Tech
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Experience cutting-edge innovation and exclusive deals. Limited time offers on premium electronics!
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/products" className="px-8 py-4 rounded-full bg-primary-foreground text-primary font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
              Shop Now
            </Link>
            <Link to="/about" className="px-8 py-4 rounded-full border-2 border-primary-foreground text-primary-foreground font-bold text-lg hover:bg-primary-foreground hover:text-primary transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        {/* Featured Products Section */}
        <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Featured Products</h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl shadow-sm border border-border p-6 animate-pulse">
                  <div className="h-48 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive">Error loading products: {error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Product key={product.id} pdt={product} />
              ))}
            </div>
          )}
        </section>

        {/* Trending Categories Section (Placeholder) */}
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-10 text-foreground">Trending Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"].map((category, i) => (
                <Link key={i} to="/products" className="block p-8 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{category}</h3>
                  <p className="text-muted-foreground text-sm">Explore now →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Flash Deals Section (Placeholder) */}
        <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Flash Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl shadow-lg border border-border p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-primary mb-3">Up to 50% Off!</h3>
              <p className="text-muted-foreground mb-6">Limited time offer on selected items. Don't miss out!</p>
              <Link to="/products" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-sky-700 transition-colors">
                View Deals
              </Link>
            </div>
            <div className="bg-card rounded-xl shadow-lg border border-border p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-primary mb-3">Daily Discounts</h3>
              <p className="text-muted-foreground mb-6">New deals every day. Check back for fresh savings!</p>
              <Link to="/products" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-sky-700 transition-colors">
                Discover More
              </Link>
            </div>
          </div>
        </section>

        {/* Seasonal Collections Section (Placeholder) */}
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-10 text-foreground">Seasonal Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Summer Vibes</h3>
                <p className="text-muted-foreground text-sm">Light & breezy fashion.</p>
              </div>
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Winter Warmers</h3>
                <p className="text-muted-foreground text-sm">Cozy essentials for cold days.</p>
              </div>
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Holiday Specials</h3>
                <p className="text-muted-foreground text-sm">Perfect gifts for everyone.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Root;