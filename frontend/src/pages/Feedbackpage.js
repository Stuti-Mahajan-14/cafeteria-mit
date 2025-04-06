import React, { useEffect, useState } from "react";
import { getAllFeedbacks } from "../Api";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getAllFeedbacks();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📋 All Feedbacks</h2>
      
      {feedbacks.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No feedbacks submitted yet.</p>
        </div>
      ) : (
        <div style={styles.feedbackColumn}>
          {feedbacks.map((fb, index) => (
            <div key={index} style={styles.feedbackCard}>
              <div style={styles.feedbackHeader}>
                <span style={styles.orderId}>Order ID: {fb.orderId}</span>
              </div>
              <div style={styles.feedbackContent}>
                <p style={styles.feedbackText}>
                  <span style={styles.quoteMark}>❝</span>
                  {fb.feedback}
                  <span style={styles.quoteMark}>❞</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    minHeight: "80vh"
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
  emptyState: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
  },
  emptyText: {
    color: "#666",
    fontSize: "1.1rem"
  },
  feedbackColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  },
  feedbackCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    borderLeft: "4px solid #ff4136",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"
    }
  },
  feedbackHeader: {
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #eee"
  },
  orderId: {
    fontWeight: "600",
    color: "#ff4136",
    fontSize: "0.9rem"
  },
  feedbackContent: {
    minHeight: "60px"
  },
  feedbackText: {
    color: "#333",
    lineHeight: "1.6",
    fontSize: "1rem",
    margin: "0",
    position: "relative",
    padding: "0 1rem"
  },
  quoteMark: {
    color: "#ff4136",
    fontSize: "1.5rem",
    lineHeight: "0",
    opacity: "0.7",
    position: "absolute",
    "&:first-of-type": {
      top: "0",
      left: "0"
    },
    "&:last-of-type": {
      bottom: "0",
      right: "0"
    }
  }
};

export default FeedbackPage;