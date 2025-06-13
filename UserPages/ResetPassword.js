// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/ResetPassword.css";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { token } = useParams();

//   // Strong password regex:
//   // At least 8 characters, one uppercase, one lowercase, one digit, one special character
//   const strongPasswordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

//   const handlePasswordChange = (e) => {
//     const input = e.target.value;
//     setPassword(input);

//     if (!strongPasswordRegex.test(input)) {
//       setPasswordError(
//         "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character."
//       );
//     } else {
//       setPasswordError("");
//     }
//   };

//   let handleSignUp = (e) => {
//     e.preventDefault();

//     if (!strongPasswordRegex.test(password)) {
//       setPasswordError(
//         "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character."
//       );
//       return;
//     }

//     axios
//       .post("http://localhost:3001/api/users/resetPassword/" + token, {
//         password,
//       })
//       .then((result) => {
//         if (result.data.status) {
//           navigate("/signin");
//           alert("password is reset successfully");
//         }
//         console.log(result.data);
//       })
//       .catch((err) => {
//         console.log("Error:", err);
//         alert("Something went wrong. Please try again.");
//       });
//   };
//   return (
//     <div className="container">
//       <div className="wrapper">
//         <div className="card register-form">
//           <div className="card-body">
//             <h5 className="card-title text-center">Reset Password</h5>
//             <form onSubmit={handleSignUp}>
//               <div className="form-group password-group">
//                 <label htmlFor="password" className="form-label">
//                   New Password
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="form-control"
//                   id="password"
//                   placeholder="Enter your new password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   required
//                 />
//                 <span
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                   role="button"
//                 >
//                   {showPassword ? (
//                     <i className="fa fa-eye-slash" aria-hidden="true"></i>
//                   ) : (
//                     <i className="fa fa-eye" aria-hidden="true"></i>
//                   )}
//                 </span>
//               </div>
//               {passwordError && (
//                 <div className="invalid-feedback">{passwordError}</div>
//               )}
//               {/* Submit button */}
//               <button type="submit" className="btn btn-primary w-100">
//                 Update Password
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);

    if (!strongPasswordRegex.test(input)) {
      setPasswordError(
        "Password must be at least 8 characters, include uppercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!strongPasswordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include uppercase, number, and special character."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:3001/api/users/reset-password/${token}`,
        { password }
      );

      alert(response.data.message || "Password reset successful");
      navigate("/driver-login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to reset password. Token may be expired or invalid."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="card register-form">
          <div className="card-body">
            <h5 className="card-title text-center">Reset Password</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group password-group">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  role="button"
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  )}
                </span>
                {passwordError && (
                  <small className="text-danger">{passwordError}</small>
                )}
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
