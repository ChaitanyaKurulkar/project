import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "./SignUpFunctions"; // Adjust path as necessary

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState<any>({});
  const [submitAPIStatus, setSubmitAPIStatus] = useState({
    loading: false,
    error: "",
  });
  const navigate = useNavigate();

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleSubmit(email, password, setInputError, setSubmitAPIStatus, navigate);
  };

  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(/images/login-bg-1.svg)`,
          height: "50vh",
        }}
      ></div>
      <div
        className="d-flex flex-column align-items-center justify-content-center position-absolute top-50 start-50 translate-middle"
        style={{ minHeight: "50vh", width: "100%" }}
      >
        <div className="text-center mb-4">
          <img
            src="/images/Logo.svg"
            alt="Logo"
            style={{ width: "80px", height: "80px" }}
          />
          <h5 style={{ color: "#ffffff" }}>Online Project Management</h5>
        </div>
        <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
          <div className="card-body">
            <h5 className="card-title text-center">Login</h5>
            <form onSubmit={onSubmit}>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${inputError.email ? "is-invalid" : ""}`}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {inputError.email && (
                  <div className="invalid-feedback">
                    {inputError.email}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${inputError.password ? "is-invalid" : ""}`}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-group-text"
                    onClick={handlePassword}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      style={{ color: "#a0a0a0" }}
                    />
                  </span>
                </div>
                {inputError.password && (
                  <div className="invalid-feedback">
                    {inputError.password}
                  </div>
                )}
                <div id="emailHelp" className="form-text text-end">
                  Forgot Password?
                </div>
              </div>

              {submitAPIStatus.error && (
                <div className="text-danger text-center mb-3">
                  {submitAPIStatus.error}
                </div>
              )}

              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="btn-sm btn-primary rounded-pill py-2 px-4"
                  disabled={submitAPIStatus.loading}
                >
                  {submitAPIStatus.loading ? "Loading..." : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
