import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { db, auth } from "../firebase/firebase.int";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import MapModal from "../MapModal/MapModal"; // Import the new MapModal component

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false); // State for modal visibility
  const [currentMapUrl, setCurrentMapUrl] = useState(""); // State for map URL

  // --- ADMIN EMAIL ---
  const ADMIN_EMAIL = "c233210@ugrad.iiuc.ac.bd";

  const STATUS_OPTIONS = ["Payment Pending", "Pending", "Processing", "Delivered", "Cancelled"];

  // Check admin login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        fetchOrders();
      } else {
        alert("Access Denied: You are not an Admin.");
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const ordersList = querySnapshot.docs.map((docItem) => {
        const data = docItem.data();
        const date = data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date();

        const items = data.items || [
          {
            name: data.productTitle || "Unknown",
            qty: 1,
            price: Number(data.price) || 0,
            image: data.productImage || "",
            productId: data.productId || "",
            productTitle: data.productTitle || "",
            productImage: data.productImage || "",
          },
        ];

        return {
          docId: docItem.id,
          id: data.orderId,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          date,
          status: data.status || "Pending",
          physicalAddress: data.physicalAddress || "", // Retrieve physical address
          mapEmbedLink: data.mapEmbedLink || "", // Retrieve map embed link
          total: Number(data.price) || 0,
          items,
          paymentMethod: data.paymentMethod || "N/A",
          transactionId: data.transactionId || "N/A",
          senderNumber: data.senderNumber || "N/A",
        };
      });

      setOrders(ordersList);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders. Check console for permissions error.");
      setLoading(false);
    }
  };

  // Update Order Status
  const handleStatusChange = async (orderDocId, newStatus) => {
    setUpdatingId(orderDocId);

    try {
      const orderRef = doc(db, "orders", orderDocId);

      await updateDoc(orderRef, {
        status: newStatus,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.docId === orderDocId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddressClick = (order) => {
    // Prioritize mapEmbedLink for modal
    if (order.mapEmbedLink && order.mapEmbedLink.startsWith("https://www.google.com/maps/embed?")) {
      setCurrentMapUrl(order.mapEmbedLink);
      setShowMapModal(true);
    } else if (order.physicalAddress) {
      // If no embed link, or it's not valid, use physical address for search
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(order.physicalAddress)}`, "_blank");
    } else {
      alert("No address or map link provided for this order.");
    }
  };

  const handleCloseMap = () => {
    setShowMapModal(false);
    setCurrentMapUrl("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "Payment Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"; // New color for Payment Pending
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // LOADING UI
  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Verifying Admin Access...</p>
          </div>
        </div>
      </>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-destructive font-bold">{error}</p>
        </div>
      </>
    );
  }

  // MAIN UI
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background p-6 sm:p-10">
        <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage customer orders.</p>
          </div>
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
            {orders.length} Orders
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.docId}
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-border flex justify-between items-start bg-background/50">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">
                    Order ID
                  </p>
                  <p className="text-sm font-mono font-semibold text-foreground">
                    {order.id}
                  </p>
                </div>

                {/* Status Selector */}
                <div className="relative">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.docId, e.target.value)
                    }
                    disabled={updatingId === order.docId}
                    className={`appearance-none px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer ${getStatusColor(
                      order.status
                    )} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  {updatingId === order.docId && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card bg-opacity-70 rounded-full">
                      <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer & Payment Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {order.customerName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {order.customerName || "Unknown User"}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.phone || "No phone provided"}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="border-t border-border pt-3 mt-3">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                    Payment Details
                  </p>
                  <p className="text-sm text-foreground">
                    Method: <span className="font-semibold">{order.paymentMethod}</span>
                  </p>
                  {(order.paymentMethod === "bKash" || order.paymentMethod === "Nagad") && (
                    <>
                      <p className="text-sm text-foreground">
                        Txn ID: <span className="font-semibold">{order.transactionId || "N/A"}</span>
                      </p>
                      <p className="text-sm text-foreground">
                        Sender: <span className="font-semibold">{order.senderNumber || "N/A"}</span>
                      </p>
                    </>
                  )}
                </div>

                {/* Address Display and Map Link */}
                <div className="border-t border-border pt-3 mt-3">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                    Delivery Address
                  </p>
                  {order.physicalAddress ? (
                    <p className="text-sm text-foreground mb-2">{order.physicalAddress}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-2">No physical address provided.</p>
                  )}

                  {(order.mapEmbedLink || order.physicalAddress) ? (
                    <button
                      onClick={() => handleAddressClick(order)}
                      className="text-xs text-primary hover:underline bg-background/50 p-2 rounded border border-border flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {order.mapEmbedLink && order.mapEmbedLink.startsWith("https://www.google.com/maps/embed?") ? "View Map Location (Modal)" : "Search Address (New Tab)"}
                    </button>
                  ) : (
                    <div className="text-xs text-muted-foreground bg-background/50 p-2 rounded border border-border">
                      📍 No map or address link provided
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto bg-background/50 p-5 border-t border-border flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {new Date(order.date).toLocaleDateString()}
                </div>

                <div className="text-lg font-bold text-primary">
                  ${order.total.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Map Modal */}
      <MapModal mapUrl={currentMapUrl} onClose={handleCloseMap} />
       <Footer />
    </>
  );
};

export default AdminOrders;