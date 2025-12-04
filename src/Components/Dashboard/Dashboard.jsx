import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase.int";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { doc, updateDoc } from "firebase/firestore";
import Footer from "../../Footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CHECK LOGIN STATUS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  const cancelOrder = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "Canceled",
        canceledAt: new Date(),
      });
      alert("Order canceled successfully.");
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Failed to cancel order. Try again.");
    }
  };


  // 2. FETCH ORDERS FOR THIS USER (SAFE QUERY)
  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersList = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA; // newest first
        });

      setOrders(ordersList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 3. LOGOUT FUNCTION
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <Navigation />

      <div className="max-w-5xl mx-auto px-5 py-10">
        {/* User Profile Section */}
        <div className="bg-white p-6 rounded-xl shadow mb-8 border border-slate-200">
          <img
            src={user?.photoURL}
            alt="User Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-200"
          />

          <h2 className="text-2xl font-bold text-slate-900">
            Welcome, {user?.displayName || "User"} 👋
          </h2>

          <p className="text-slate-600 mt-1">{user?.email}</p>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>

        {/* Order List Section */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Your Orders ({orders.length})
          </h3>

          {loading ? (
            <p className="text-slate-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-slate-500">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-slate-200 rounded-lg p-4 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={order.productImage}
                      alt={order.productTitle}
                      className="w-16 h-16 object-contain rounded"
                    />

                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {order.productTitle}
                      </h4>

                      <p className="text-sm text-slate-600">
                        Order ID:{" "}
                        <span className="font-medium">{order.orderId}</span>
                      </p>

                      <p className="text-sm text-slate-600">
                        Status:{" "}
                        <span
                          className={`font-semibold ${
                            order.status === "Pending"
                              ? "text-amber-600"
                              : "text-green-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">
                      ${order.price}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {order.createdAt
                        ? new Date(
                            order.createdAt.seconds * 1000
                          ).toLocaleString()
                        : "Processing..."}
                    </p>

                    {/* CANCEL BUTTON (Only show if Pending) */}
                    {order.status === "Pending" && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg shadow"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="text-indigo-600 font-semibold hover:underline"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
       <Footer />
    </>
  );
};

export default Dashboard;
