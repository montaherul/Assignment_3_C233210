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
    Component: Order,
  },
  {
    path: "/Login",
    Component: Login,
  },
  {
    path: "/Dashboard",
    Component: Dashboard,},
    {
      path: "/register",
      Component: Register,
    },
    {
      path: "/editprofile",
      Component: EditProfile,
    },
    {
      path:"/admin/Orders",
      Component: AdminOrders,
    }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>,</RouterProvider>
  </StrictMode>
);