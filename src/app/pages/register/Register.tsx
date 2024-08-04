import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
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
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="exampleInputPassword1"
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
                <div id="emailHelp" className="form-text text-end">
                  Forgot Password?
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button type="submit" className="btn-sm btn-primary ms-1">
                  Login
                </Button>
                <Button type="submit" className="btn-sm btn-primary ms-1">
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
