import React from "react";
import { Link } from "react-router-dom";

const Product = ({ pdt }) => {
  const { id, title, image, description, price } = pdt;

  return (
    <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-64 w-full bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Title & Price */}
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-lg font-bold text-slate-900 line-clamp-1"
            title={title}
          >
            {title}
          </h3>
          <span className="text-lg font-bold text-indigo-600">${price}</span>
        </div>

        {/* Description (Truncated to 2 lines) */}
        <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Action Button */}
        <Link to={`/products/${id}`} className="mt-auto">
          <button className="w-full py-3 px-4 bg-white border border-indigo-600 text-indigo-600 font-medium rounded-xl hover:bg-indigo-600 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
            View Details
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
