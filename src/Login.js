import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./Auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

const Login = (props) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: remove this error or have the error display on the console
  const [error, setError] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (e) {
      setError(
        "There was an error logging. Please check your password or email"
      );
      // setError(e.message);
    }
  };

  const togglePasswordRecovery = () => {
    setIsResetPassword(!isResetPassword);
  };

  const sendPasswordRecoveryEmail = () => {
    if (email === "") {
      setError("Please type in your email to send reset instructions.");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setError("Password reset instructions have been sent!");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };

  const renderLogin = () => {
    if (isResetPassword) {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <div className="howdy">
                <IconButton
                  style={{ right: "25px", fontSize: "18px" }}
                  onClick={() => {
                    setIsResetPassword(false);
                  }}
                >
                  <ArrowBackIcon color="transparent" />
                  <div style={{ marginLeft: "5px" }}>Back</div>
                </IconButton>
              </div>

              <h3 className="Auth-form-title">Password Recovery</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="button"
                  onClick={sendPasswordRecoveryEmail}
                  className="btn btn-primary"
                >
                  Send Instructions
                </button>
              </div>

              <p
                style={{ color: "red", textAlign: "center", marginTop: "25px" }}
              >
                {error}
              </p>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>

              <p
                className="forgot-password text-right mt-2"
                onClick={togglePasswordRecovery}
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Forgot password? Click here!</a>
              </p>
              <p
                style={{ color: "red", textAlign: "center", marginTop: "25px" }}
              >
                {error}
              </p>
            </div>
          </form>
        </div>
      );
    }
  };

  return renderLogin();
};

export default Login;
