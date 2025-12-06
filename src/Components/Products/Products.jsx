import React, { useState, useEffect } from "react";
import { useLoaderData, useSearchParams, useNavigate } from "react-router-dom"; // Standardized to react-router-dom
import Product from "../Product/Product";
import Navigation from "../Navigation/Navigation";
import Footer from "../../Footer/Footer";

const Products = () => {
  const initialProducts = useLoaderData(); // Products from the initial loader call
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch unique categories for the filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`); // Fetch all products to get categories
        const allProducts = await response.json();
        const uniqueCategories = ['All', ...new Set(allProducts.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Effect to re-fetch products when search params change
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams();
        if (searchTerm) query.append('search', searchTerm);
        if (selectedCategory && selectedCategory !== 'All') query.append('category', selectedCategory);

        const response = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products with filters.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching filtered products:", err);
        setError("Failed to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if search term or category has changed from initial load or previous state
    // This prevents unnecessary re-fetches on initial render if loader already provided data
    if (searchTerm !== (searchParams.get('search') || '') || selectedCategory !== (searchParams.get('category') || 'All')) {
      fetchFilteredProducts();
    } else if (initialProducts) {
      setProducts(initialProducts); // Use initial loader data if no filters applied
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, searchParams, initialProducts]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    updateSearchParams(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    updateSearchParams(searchTerm, e.target.value);
  };

  const updateSearchParams = (newSearchTerm, newCategory) => {
    const newParams = new URLSearchParams();
    if (newSearchTerm) newParams.set('search', newSearchTerm);
    if (newCategory && newCategory !== 'All') newParams.set('category', newCategory);
    navigate(`?${newParams.toString()}`, { replace: true }); // Use navigate to update URL without full page reload
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our Collection
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              Browse our exclusive selection of premium products.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <div className="w-full sm:w-1/2 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="w-full sm:w-1/3">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Responsive Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl shadow-sm border border-border p-6 animate-pulse">
                  <div className="h-48 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive text-lg">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg">No products found matching your criteria.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {products.map((pd) => (
                <Product key={pd._id} pdt={pd} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;