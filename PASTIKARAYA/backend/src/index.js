require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");

const cmsRoutes = require("./routes/cmsRoutes");

const authRoutes = require("./routes/authRoutes");
const pengambilanRoutes = require("./routes/pengambilanRoutes");
const barangRoutes=require("./routes/barangRoutes");
const requestRoutes=require("./routes/requestRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pengambilan", pengambilanRoutes);
app.use("/api/barang",barangRoutes);
app.use("/api/request",requestRoutes);
app.use("/api/dashboard",dashboardRoutes);
// Routes
app.use("/api/cms", cmsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API PASTIKA berjalan",
  });
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});