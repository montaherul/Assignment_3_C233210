import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase.int";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { doc, updateDoc } from "firebase/firestore";
import Footer from "../../Footer/Footer";

const Dashboard = () => {
  const ADMIN_EMAIL = "c233210@ugrad.iiuc.ac.bd";
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
        status: "Cancelled", // Changed to 'Cancelled' for consistency
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

      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* User Profile Section */}
          <div className="bg-card p-6 rounded-xl shadow-sm mb-8 border border-border text-center">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=0EA5E9&color=fff`}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/20 object-cover"
            />

            <h2 className="text-2xl font-bold text-foreground mb-1">
              Welcome, {user?.displayName || "User"} 👋
            </h2>

            <p className="text-muted-foreground text-sm">{user?.email}</p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-destructive text-destructive-foreground rounded-lg shadow-sm hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Logout
              </button>
              {user?.email === ADMIN_EMAIL && (
                <button
                  onClick={() => navigate("/admin/orders")}
                  className="px-5 py-2 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-sky-700 transition-colors text-sm font-medium"
                >
                  Admin Panel
                </button>
              )}
              <Link to="/editprofile" className="px-5 py-2 bg-secondary text-secondary-foreground rounded-lg shadow-sm hover:bg-muted transition-colors text-sm font-medium">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Order List Section */}
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Your Orders ({orders.length})
            </h3>

            {loading ? (
              <p className="text-muted-foreground text-center py-8">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No orders found. Start shopping!</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm bg-background/50"
                  >
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <img
                        src={order.productImage}
                        alt={order.productTitle}
                        className="w-20 h-20 object-contain rounded-md border border-border p-1"
                      />

                      <div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {order.productTitle}
                        </h4>

                        <p className="text-sm text-muted-foreground">
                          Order ID:{" "}
                          <span className="font-medium text-foreground">{order.orderId}</span>
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Status:{" "}
                          <span
                            className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                              order.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-xl font-bold text-primary">
                        ${Number(order.price).toFixed(2)}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
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
                          className="mt-3 bg-destructive text-destructive-foreground text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 transition-colors font-medium"
                        >
                          Cancel Order
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
              className="text-primary font-semibold hover:underline text-lg"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
       <Footer />
    </>
  );
};

export default Dashboard;