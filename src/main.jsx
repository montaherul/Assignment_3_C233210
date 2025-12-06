import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";

import Root from "./Components/Root/Root.jsx";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Products from "./Components/Products/Products.jsx";
import Productfromapi from "./Components/Productfromapi/Productfromapi.jsx";
import Details from "./Components/Details/Details.jsx";
import Order from './Components/Order/Order.jsx';
import Login from './Components/Login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Register from './Components/Register/Register.jsx';
import EditProfile from './Components/EditProfile/EditProfile.jsx';
import AdminOrders from './Components/Admin/AdminOrders.jsx';
import { AuthProvider } from './Components/AuthContext/AuthContext.jsx'; // Correct import for AuthProvider
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'; // Import ProtectedRoute

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/products",
    loader: () => fetch("https://fakestoreapi.com/products"),
    Component: Products,
  },
  {
    path: "/productfromapi",
    loader: () => fetch("https://fakestoreapi.com/products/"),
    Component: Productfromapi,
  },
  {
    path: "/products/:id",
    loader: ({ params }) => {
      return fetch(`https://fakestoreapi.com/products/${params.id}`);
    },
    Component: Details,
  },

  {
    path: "/products/order/:id",
    loader: ({ params }) => {
      return fetch(`https://fakestoreapi.com/products/${params.id}`);
    },
    element: <ProtectedRoute><Order /></ProtectedRoute>, // Protect the Order route
  },
  {
    path: "/Login",
    Component: Login,
  },
  {
    path: "/Dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>, // Protect the Dashboard route
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/editprofile",
    element: <ProtectedRoute><EditProfile /></ProtectedRoute>, // Protect the EditProfile route
  },
  {
    path:"/admin/Orders",
    element: <ProtectedRoute><AdminOrders /></ProtectedRoute>, // Protect the AdminOrders route
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);