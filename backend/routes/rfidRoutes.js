import express from "express";

const router = express.Router();

let latestRFID = {
  cardId: null,
  balance: null,
};

// Endpoint for Pico W to send data
router.post("/update", (req, res) => {
  const { cardId, balance } = req.body;
  if (!cardId || balance === undefined) {
    return res.status(400).json({ message: "Missing cardId or balance" });
  }

  latestRFID.cardId = cardId;
  latestRFID.balance = balance;
  console.log("Updated RFID data:", latestRFID);

  res.status(200).json({ message: "Balance updated" });
});

// Endpoint for frontend to get data
router.get("/latest", (req, res) => {
  if (!latestRFID.cardId) {
    return res.status(404).json({ message: "No data available yet" });
  }
  res.json(latestRFID);
});

export default router;
