import React from "react";
import { useLoaderData } from "react-router-dom"; // Standardized to react-router-dom
import Product from "../Product/Product";
import Navigation from "../Navigation/Navigation";
import Footer from "../../Footer/Footer";

const Products = () => {
  const records = useLoaderData();
  // console.log(records);

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

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {records.map((pd) => (
              <Product key={pd.id} pdt={pd} />
            ))}
          </div>
        </div>
      </div>
       <Footer />
    </>
  );
};

export default Products;
