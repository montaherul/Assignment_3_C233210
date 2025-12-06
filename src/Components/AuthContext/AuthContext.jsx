import React, { createContext, useContext, useState, useEffect } from "react";
// Removed useNavigate as it should be used within a Router context

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Removed const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:5000/api/auth"; // Your backend auth API base URL

  useEffect(() => {
    // Check for existing token in localStorage on app load
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode token to get user info (simplified, in a real app you'd verify with backend)
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser(decoded.user);
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []); // Removed navigate from dependency array

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: 'Network error or server unavailable' };
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: 'Network error or server unavailable' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Removed navigate('/login'); - navigation will be handled by components calling logout
  };

  // Provide a way to update user details from other components (e.g., EditProfile)
  const updateUser = (newUserData) => {
    setUser(prevUser => ({ ...prevUser, ...newUserData }));
    // In a real app, you'd also update the token in localStorage if user data is embedded
    // For now, we'll assume the token only contains basic info and full user data is fetched separately.
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};