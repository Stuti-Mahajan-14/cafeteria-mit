import React, { useState, useEffect } from "react";
import axios from "axios";

const RFIDBalance = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchBalance = async () => {
    try {
      const res = await axios.get("http://192.168.15.246:5000/api/rfid/latest");
      setData(res.data);
      setError("");
    } catch (err) {
      setData(null);
      setError("No data available yet or error fetching");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBalance();
    }, 3000); // Fetch every 3 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>RFID Balance Live</h2>
      {data ? (
        <div style={styles.dataContainer}>
          <p style={styles.dataItem}><strong style={styles.label}>Card ID:</strong> <span style={styles.value}>{data.cardId}</span></p>
          <p style={styles.dataItem}><strong style={styles.label}>Balance:</strong> <span style={styles.balanceValue}>₹{data.balance}</span></p>
        </div>
      ) : (
        <p style={styles.error}>{error}</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
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
  dataContainer: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
  },
  dataItem: {
    margin: "1rem 0",
    fontSize: "1.1rem",
    color: "#333"
  },
  label: {
    color: "#555",
    marginRight: "0.5rem"
  },
  value: {
    color: "#222",
    fontWeight: "500"
  },
  balanceValue: {
    color: "#ff4136",
    fontWeight: "600",
    fontSize: "1.3rem"
  },
  error: {
    color: "#ff4136",
    backgroundColor: "#ffecec",
    padding: "1rem",
    borderRadius: "5px",
    borderLeft: "4px solid #ff4136"
  }
};

export default RFIDBalance;