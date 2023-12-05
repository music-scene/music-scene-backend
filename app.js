require("dotenv").config();
require("./db");

const express = require("express");
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const concertRoutes = require("./routes/concert.routes");
const venueRoutes = require("./routes/venue.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

require("./config")(app);

// 👇 Start handling routes here
app.use("/api", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api", concertRoutes);
app.use("/api", venueRoutes);
app.use("/api", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
