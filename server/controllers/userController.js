// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const User = require("../models/userModel");

// // Register user
// let register = async (req, res) => {
//   try {
//     let { name, email, password } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         status: "failed",
//         message: "User already exists with this email",
//       });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     password = await bcrypt.hash(password, salt);

//     // Create and save new user
//     const user = new User({ name, email, password });
//     await user.save();

//     res.status(201).json({
//       status: "success",
//       message: "User registered successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "failed",
//       message: error.message,
//     });
//   }
// };

// // Login user
// let login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ status: "failed", message: "User not found" });
//     }

//     const isValidPwd = await bcrypt.compare(password, user.password);
//     if (!isValidPwd) {
//       return res
//         .status(400)
//         .json({ status: "failed", message: "Password not valid" });
//     }

//     const payload = { _id: user._id };
//     jwt.sign(payload, process.env.KEY, async (err, token) => {
//       if (err) throw err;

//       res.status(201).json({
//         status: "success",
//         message: "Logged in successfully",
//         user,
//         token,
//       });
//     });
//   } catch (error) {
//     res.send({ status: "failed", message: error.message });
//   }
// };

// // Logout
// let logout = async (req, res) => {
//   res.json({ status: "success", message: "Logged out successfully" });
// };

// // Forgot Password
// let forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.send({ message: "User not registered" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.KEY, {
//       expiresIn: "10m",
//     });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "akashkolaki5@gmail.com",
//         pass: "tesr xusy etrh hdvv", // Use environment variable for safety
//       },
//     });

//     const resetLink = `http://localhost:3000/resetPassword/${token}`;

//     const mailOptions = {
//       from: "akashkolaki5@gmail.com",
//       to: email,
//       subject: "Reset Your Password",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
//           <h2 style="color: #333;">Reset Your Password</h2>
//           <p>Hello,</p>
//           <p>You requested a password reset. Click the button below to reset your password. This link will expire in 10 minutes.</p>
//           <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #0066ff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
//           <p>If you didn’t request this, please ignore this email.</p>
//           <p>Thanks,<br/>Your App Team</p>
//         </div>
//       `,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.json({ message: "Error sending email" });
//       } else {
//         return res.json({ status: true, message: "Email sent" });
//       }
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     res
//       .status(500)
//       .send({ status: "failed", message: "Internal server error" });
//   }
// };

// // Reset Password
// let resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.KEY);
//     const id = decoded.id;

//     const hashPassword = await bcrypt.hash(password, 10);
//     await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });

//     return res.json({ status: true, message: "Password updated successfully" });
//   } catch (err) {
//     console.error("Invalid or expired token", err);
//     res
//       .status(400)
//       .send({ status: false, message: "Invalid or expired token" });
//   }
// };

// module.exports = {
//   login,
//   register,
//   logout,
//   forgotPassword,
//   resetPassword,
// };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Register user
let register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Login user
let login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "User not found" });
    }

    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      return res
        .status(400)
        .json({ status: "failed", message: "Password not valid" });
    }

    const payload = { _id: user._id };
    jwt.sign(payload, process.env.KEY, async (err, token) => {
      if (err) throw err;

      res.status(201).json({
        status: "success",
        message: "Logged in successfully",
        user,
        token,
      });
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
};

// Logout
let logout = async (req, res) => {
  res.json({ status: "success", message: "Logged out successfully" });
};

// Forgot Password
let forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ message: "User not registered" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akashkolaki5@gmail.com",
        pass: "tesr xusy etrh hdvv",
      },
    });

    const resetLink = `http://localhost:3000/resetPassword/${token}`;

    const mailOptions = {
      from: "akashkolaki5@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p>Hello,</p>
          <p>You requested a password reset. Click the button below to reset your password. This link will expire in 10 minutes.</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #0066ff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If you didn’t request this, please ignore this email.</p>
          <p>Thanks,<br/>Your App Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({ message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send({ status: "failed", message: "Internal server error" });
  }
};

// Reset Password
let resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });

    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Invalid or expired token", err);
    res
      .status(400)
      .send({ status: false, message: "Invalid or expired token" });
  }
};

// Stripe Payment
let makePayment = async (req, res) => {
  const { items } = req.body;

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `http://localhost:3000/success/`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred, please try again later.", error });
  }
};

module.exports = {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  makePayment,
};
