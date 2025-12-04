import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase.int";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Navigation from "../Navigation/Navigation";
import Footer from "../../Footer/Footer";

const Order = () => {
  const navigate = useNavigate();

  // 1. Get Product Data (Corrected 'id')
  const product = useLoaderData();
  const { id, title, price, image, description } = product;

  // 2. State for User & Form
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form States
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // 3. Check Auth & Auto-fill Name
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setCustomerName(currentUser.displayName || "");
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 4. Handle Order Submission
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
        productId: id, // <--- FIXED: Uses 'id' now
        productTitle: title,
        productImage: image,
        price: price,
        customerName: customerName,
        email: user.email,
        uid: user.uid,
        address: address,
        phone: phone,
        status: "Pending",
        createdAt: serverTimestamp(),
      };

      // Save to Firebase "orders" collection
      await addDoc(collection(db, "orders"), orderData);

      alert("Order Placed Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900">
              Complete Your Order
            </h1>
            <p className="mt-2 text-slate-600">Secure checkout</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Product Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-center">
                  <img
                    src={image}
                    alt={title}
                    className="h-48 object-contain mix-blend-multiply"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">
                      ${price}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {description}
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex justify-between text-sm font-medium text-slate-900">
                      <span>Total</span>
                      <span>${price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Shipping Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-slate-100">
                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Shipping Details
                </h2>

                {/* FORM START */}
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="block w-full rounded-lg border-slate-300 border px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition shadow-sm outline-none"
                    />
                  </div>

                  {/* Address & Contact Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        placeholder="123 Main St"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="block w-full rounded-lg border-slate-300 border px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition shadow-sm outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Contact Number
                      </label>
                      <input
                        type="text"
                        id="contact"
                        placeholder="+1 (555) 000-0000"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full rounded-lg border-slate-300 border px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition shadow-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white transition-all transform ${
                        loading
                          ? "bg-indigo-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      }`}
                    >
                      {loading
                        ? "Processing Order..."
                        : `Confirm & Pay $${price}`}
                    </button>
                    <p className="mt-4 text-center text-xs text-slate-400">
                      Payments are secure and encrypted.
                    </p>
                  </div>
                </form>
                {/* FORM END */}
              </div>
            </div>
          </div>
        </div>
      </div>
       <Footer />
    </>
  );
};

export default Order;
