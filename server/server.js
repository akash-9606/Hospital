// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const Razorpay = require("razorpay");

// // Load routes
// const userRoutes = require("./routes/userRoutes");
// const partnerRoutes = require("./routes/partnerRoutes");
// const mapsRoutes = require("./routes/mapsRoutes");
// const paymentRoutes = require("./routes/paymentRoutes"); // Renamed variable from 'payment' to 'paymentRoutes' for clarity
// const partnerDriverRoutes = require("./routes/partnerDriverRoutes");

// // Driver routes
// const driverRoutes = require("./routes/driverRoutes"); // <-- Added driverRoutes import

// // Load DB connection
// const connectDB = require("./config/database");

// dotenv.config(); // Load environment variables

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json()); // Parse incoming JSON

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URI || "*", // Allow frontend access
//     credentials: true,
//   })
// );

// // API Routes
// app.use("/api/users", userRoutes); // changed from "/api/Users" to lowercase for consistency
// app.use("/api/partners", partnerRoutes); // changed from "/api/Partners" to lowercase
// app.use("/api/partner-drivers", partnerDriverRoutes);
// app.use("/api/maps", mapsRoutes); // changed from "/maps" to "/api/maps" for consistency

// app.use("/api/drivers", driverRoutes); // <-- Added driver routes here, changed from "/drivers" to "/api/drivers" for consistency

// // Payment route
// app.use("/api/v1", paymentRoutes); // changed variable name and kept path same

// // Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Razorpay instance
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// module.exports = razorpayInstance; // Renamed exported variable for clarity

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Razorpay = require("razorpay");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Load database connection
const connectDB = require("./config/database");
connectDB(); // Connect to MongoDB

// Middleware
app.use(express.json()); // To parse JSON request bodies

// CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "*", // Set allowed origin from .env or allow all
    credentials: true,
  })
);

// Load routes
const userRoutes = require("./routes/userRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const mapsRoutes = require("./routes/mapsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const partnerDriverRoutes = require("./routes/partnerDriverRoutes");
const driverRoutes = require("./routes/driverRoutes"); // Driver auth routes

// API Routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/partners", partnerRoutes); // Partner routes
app.use("/api/partner-drivers", partnerDriverRoutes); // Partner-managed drivers
app.use("/api/maps", mapsRoutes); // Location/maps related routes
app.use("/api/drivers", driverRoutes); // Driver auth routes
app.use("/api/v1", paymentRoutes); // Razorpay payment routes

// Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Export Razorpay instance if used in other files
module.exports = razorpayInstance;

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
