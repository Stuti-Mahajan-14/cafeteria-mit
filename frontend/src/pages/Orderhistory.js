import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackInput from "../components/FeedbackInput";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [showFeedback, setShowFeedback] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://192.168.15.246:5000/api/orders");
      setOrders(res.data);
      setError("");
    } catch (err) {
      setError("Could not fetch order history.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🧾 Order History</h2>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Card ID</th>
                <th style={styles.tableHeader}>Items</th>
                <th style={styles.tableHeader}>Total</th>
                <th style={styles.tableHeader}>Time</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>{order.cardId}</td>
                    <td style={styles.tableCell}>{order.itemsOrdered.join(", ")}</td>
                    <td style={styles.tableCell}>₹{order.totalAmount}</td>
                    <td style={styles.tableCell}>{new Date(order.timestamp).toLocaleString()}</td>
                    <td style={styles.tableCell}>
                      <button 
                        style={styles.feedbackButton}
                        onClick={() => setShowFeedback(order._id === showFeedback ? null : order._id)}
                      >
                        ✍️ Give Feedback
                      </button>
                    </td>
                  </tr>
                  {showFeedback === order._id && (
                    <tr>
                      <td colSpan="5" style={styles.feedbackCell}>
                        <FeedbackInput
                          orderId={order._id}
                          onFeedbackSubmitted={() => setShowFeedback(null)}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  header: {
    color: "#ff4136",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    fontWeight: "600",
    borderBottom: "2px solid #ff4136",
    paddingBottom: "0.5rem",
    display: "inline-block"
  },
  error: {
    color: "#ff4136",
    backgroundColor: "#ffecec",
    padding: "1rem",
    borderRadius: "5px",
    borderLeft: "4px solid #ff4136",
    fontWeight: "500"
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden"
  },
  tableHeaderRow: {
    backgroundColor: "#ff4136",
    color: "white"
  },
  tableHeader: {
    padding: "1rem",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "1rem"
  },
  tableRow: {
    borderBottom: "1px solid #eee",
    "&:hover": {
      backgroundColor: "#fff5f5"
    }
  },
  tableCell: {
    padding: "1rem",
    color: "#333",
    fontSize: "0.95rem"
  },
  feedbackButton: {
    backgroundColor: "#ff4136",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#e63935",
      transform: "translateY(-1px)"
    }
  },
  feedbackCell: {
    padding: "1rem",
    backgroundColor: "#fff9f9",
    borderLeft: "3px solid #ff4136"
  }
};

export default OrderHistory;