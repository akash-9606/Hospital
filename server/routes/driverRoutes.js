// // const express = require("express");
// // const router = express.Router();
// // const {
// //   registerDriver,
// //   loginDriver,
// //   logoutDriver,
// //   forgotPasswordDriver,
// //   resetPasswordDriver,
// //   getAllDrivers,
// // } = require("../controllers/driverAuthController");

// // // Register driver expects: firstName, lastName, age, vehicleType, phone, email, licenseNumber, password
// // router.post("/register", registerDriver);

// // router.post("/login", loginDriver);
// // router.post("/forgot-password", forgotPasswordDriver);
// // router.post("/reset-password/:token", resetPasswordDriver);
// // router.get("/logout", logoutDriver);

// // // Fetch all drivers
// // router.get("/all", getAllDrivers);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   registerDriver,
//   loginDriver,
//   logoutDriver,
//   forgotPasswordDriver,
//   resetPasswordDriver,
//   getAllDrivers,
// } = require("../controllers/driverAuthController");

// // ✅ Register a new driver
// // Body: { firstName, lastName, age, vehicleType, phone, email, licenseNumber, password }
// router.post("/register", registerDriver);

// // ✅ Driver login
// // Body: { phone OR email, password }
// router.post("/login", loginDriver);

// // ✅ Forgot password - send reset email
// // Body: { email }
// router.post("/forgot-password", forgotPasswordDriver);

// // ✅ Reset password using token
// // Body: { password }
// router.post("/reset-password/:token", resetPasswordDriver);

// // ✅ Logout (dummy endpoint, actual logout is client-side)
// router.get("/logout", logoutDriver);

// // ✅ Get all registered drivers (without passwords)
// router.get("/all", getAllDrivers);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registerDriver,
  loginDriver,
  logoutDriver,
  forgotPasswordDriver,
  resetPasswordDriver,
  getAllDrivers,
} = require("../controllers/driverAuthController");

router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.post("/forgot-password", forgotPasswordDriver);
router.post("/reset-password/:token", resetPasswordDriver);
router.get("/logout", logoutDriver);
router.get("/all", getAllDrivers);

module.exports = router;
