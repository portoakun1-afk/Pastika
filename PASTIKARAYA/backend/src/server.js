const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Koneksi MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const authRoutes = require("./routes/authRoutes");
const barangRoutes = require("./routes/barangRoutes");
const requestRoutes = require("./routes/requestRoutes");
const pengambilanRoutes = require("./routes/pengambilanRoutes");
const cmsRoutes = require("./routes/cmsRoutes");

// API
app.use("/api/auth", authRoutes);
app.use("/api/barang", barangRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/pengambilan", pengambilanRoutes);
app.use("/api/cms", cmsRoutes);

app.listen(5000, () => {
  console.log("Server berjalan di port 5000");
});