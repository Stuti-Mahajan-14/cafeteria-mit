// components/FeedbackInput.jsx
import React, { useState } from "react";
import { submitFeedback } from "../Api"; // adjust path if needed

const FeedbackInput = ({ orderId, onFeedbackSubmitted }) => {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return alert("Please write something.");
    setSubmitting(true);
    try {
      await submitFeedback({ orderId, feedback });
      alert("Feedback submitted!");
      setFeedback("");
      onFeedbackSubmitted?.(); // optional callback
    } catch (err) {
      alert("Error submitting feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows="3"
        placeholder="Write your feedback..."
        style={{ width: "100%", padding: "6px" }}
      />
      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default FeedbackInput;
