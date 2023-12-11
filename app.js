require("dotenv").config();
require("./db");

const express = require("express");
const cors = require('cors')
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const concertRoutes = require("./routes/concert.routes");
const venueRoutes = require("./routes/venue.routes");
const userRoutes = require("./routes/user.routes");
const artistRoutes = require("./routes/artist.routes")
const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
app.use(cors())

require("./config")(app);

app.use(
    cors({
      // Add the URLs of allowed origins to this array
      origin: [process.env.ORIGIN]
    })
  );

// 👇 Start handling routes here
app.use("/api", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api", concertRoutes);
app.use("/api", venueRoutes);
app.use("/api", artistRoutes);
app.use("/api", isAuthenticated, userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
