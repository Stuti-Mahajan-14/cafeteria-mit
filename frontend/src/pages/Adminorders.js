import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  markOrderAsDone,
  updateOrder,
  deleteOrder,
} from "../Api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [updatedItems, setUpdatedItems] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleMarkDone = async (id) => {
    try {
      await markOrderAsDone(id);
      fetchOrders();
    } catch (err) {
      console.error("Error marking as done:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateOrder(editingOrder._id, {
        ...editingOrder,
        itemsOrdered: updatedItems.split(",").map((item) => item.trim()),
      });
      setEditingOrder(null);
      setUpdatedItems("");
      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📦 All Orders (Admin)</h2>
      
      <div style={styles.ordersContainer}>
        {orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              <p style={styles.orderId}>Order ID: {order._id}</p>
              <p style={styles.cardId}>Card ID: {order.cardId}</p>
            </div>
            
            <div style={styles.orderDetails}>
              <p style={styles.detailItem}><span style={styles.detailLabel}>Items:</span> {order.itemsOrdered.join(", ")}</p>
              <p style={styles.detailItem}><span style={styles.detailLabel}>Total:</span> ₹{order.totalAmount}</p>
              <p style={styles.detailItem}><span style={styles.detailLabel}>Status:</span> 
                <span style={order.status === "Done" ? styles.statusDone : styles.statusPending}>
                  {order.status}
                </span>
              </p>
              <p style={styles.detailItem}><span style={styles.detailLabel}>Time:</span> {new Date(order.timestamp).toLocaleString()}</p>
            </div>

            <div style={styles.actionButtons}>
              <button 
                style={order.status === "Done" ? styles.buttonDisabled : styles.buttonDone}
                onClick={() => handleMarkDone(order._id)} 
                disabled={order.status === "Done"}
              >
                ✅ Mark as Done
              </button>
              <button 
                style={styles.buttonUpdate}
                onClick={() => {
                  setEditingOrder(order);
                  setUpdatedItems(order.itemsOrdered.join(", "));
                }}
              >
                ✏️ Update
              </button>
              <button 
                style={styles.buttonDelete}
                onClick={() => handleDelete(order._id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingOrder && (
        <form onSubmit={handleUpdate} style={styles.editForm}>
          <h3 style={styles.editFormHeader}>✏️ Update Order</h3>
          <label style={styles.formLabel}>Items Ordered (comma separated):</label>
          <input
            type="text"
            value={updatedItems}
            onChange={(e) => setUpdatedItems(e.target.value)}
            style={styles.formInput}
          />
          <div style={styles.formButtons}>
            <button type="submit" style={styles.buttonSave}>💾 Save</button>
            <button 
              type="button" 
              onClick={() => setEditingOrder(null)} 
              style={styles.buttonCancel}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
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
  ordersContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem"
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"
    }
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #eee"
  },
  orderId: {
    fontSize: "0.8rem",
    color: "#666"
  },
  cardId: {
    fontWeight: "500",
    color: "#ff4136"
  },
  orderDetails: {
    marginBottom: "1.5rem"
  },
  detailItem: {
    margin: "0.5rem 0",
    lineHeight: "1.5"
  },
  detailLabel: {
    fontWeight: "600",
    color: "#555",
    marginRight: "0.5rem"
  },
  statusDone: {
    color: "#28a745",
    fontWeight: "600",
    marginLeft: "0.5rem"
  },
  statusPending: {
    color: "#ffc107",
    fontWeight: "600",
    marginLeft: "0.5rem"
  },
  actionButtons: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap"
  },
  buttonBase: {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    "&:hover": {
      transform: "translateY(-1px)"
    }
  },
  buttonDone: {
    backgroundColor: "#28a745",
    color: "white",
    "&:hover": {
      backgroundColor: "#218838"
    }
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
    color: "#666666",
    cursor: "not-allowed",
    "&:hover": {
      transform: "none"
    }
  },
  buttonUpdate: {
    backgroundColor: "#17a2b8",
    color: "white",
    "&:hover": {
      backgroundColor: "#138496"
    }
  },
  buttonDelete: {
    backgroundColor: "#ff4136",
    color: "white",
    "&:hover": {
      backgroundColor: "#e63935"
    }
  },
  editForm: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1.5rem",
    marginTop: "2rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderLeft: "4px solid #ff4136"
  },
  editFormHeader: {
    color: "#ff4136",
    marginBottom: "1rem"
  },
  formLabel: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#555"
  },
  formInput: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    "&:focus": {
      outline: "none",
      borderColor: "#ff4136",
      boxShadow: "0 0 0 2px rgba(255, 65, 54, 0.2)"
    }
  },
  formButtons: {
    display: "flex",
    gap: "0.5rem"
  },
  buttonSave: {
    backgroundColor: "#ff4136",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#e63935",
      transform: "translateY(-1px)"
    }
  },
  buttonCancel: {
    backgroundColor: "#6c757d",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#5a6268",
      transform: "translateY(-1px)"
    }
  }
};

export default AdminOrders;