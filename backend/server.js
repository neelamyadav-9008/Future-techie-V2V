const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const reportRoutes = require("./routes/reportRoutes");
const sosRoutes = require("./routes/sosRoutes");
const safeRouteRoutes = require("./routes/safeRouteRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/safe-routes", safeRouteRoutes);

app.get("/", (req, res) => {
  res.send("🚀 SheShield Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});