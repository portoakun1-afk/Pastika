const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
const cmsRoutes = require("./routes/cmsRoutes");


// API
app.use(
  "/api/cms",
  cmsRoutes
);

app.listen(5000, () => {
  console.log("Server berjalan");
});