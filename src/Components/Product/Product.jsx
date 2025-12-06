import React from "react";
import { Link } from "react-router-dom";

const Product = ({ pdt }) => {
  const { id, title, image, description, price } = pdt;

  return (
    <div className="group flex flex-col bg-card rounded-xl shadow-sm hover:shadow-lg border border-border transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-56 w-full bg-secondary p-4 flex items-center justify-center overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Title & Price */}
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-lg font-bold text-foreground line-clamp-2"
            title={title}
          >
            {title}
          </h3>
          <span className="text-lg font-bold text-primary">${price}</span>
        </div>

        {/* Description (Truncated to 2 lines) */}
        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Action Button */}
        <Link to={`/products/${id}`} className="mt-auto">
          <button className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-sky-700 transition-colors duration-300 flex items-center justify-center gap-2">
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