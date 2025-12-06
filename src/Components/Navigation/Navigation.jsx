import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext"; // Import useAuth hook

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    setIsOpen(false); // Close mobile menu if open
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold px-3 py-2 rounded-md text-sm transition-colors"
      : "text-foreground hover:text-primary hover:bg-secondary font-medium px-3 py-2 rounded-md text-sm transition-colors";

  return (
    <nav className="bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                myproject
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={getLinkClass}>
                {link.label}
              </NavLink>
            ))}

            {/* If user logged in → show Logout */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile picture or initial */}
                
                  <NavLink to="/dashboard">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="w-8 h-8 rounded-full border border-border"
                        referrerPolicy="no-referrer"
                        alt="User Avatar"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-secondary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </NavLink>
                

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-destructive text-destructive-foreground text-sm rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login">
                <button className="ml-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-sky-700 transition">
                  Sign In
                </button>
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:bg-secondary"
            >
              {!isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-2 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Login / Logout */}
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-center px-5 py-3 rounded-md mt-3 bg-destructive text-destructive-foreground font-medium"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-md mt-3 bg-primary text-primary-foreground font-medium"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;