import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div
      className="bg-cover bg-center d-flex align-items-center"
      style={{
        backgroundImage: `url(/images/Header-bg.svg)`,
        height: "22vh",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center text-start ps-3">
          <img
            src="/images/back arrow.svg"
            alt="Back"
            className="me-3"
            style={{ width: "20px", height: "20px" }}
          />
          <h6 className="text-white mb-0">{title}</h6>
        </div>
        <img
          src="/images/Logo.svg"
          alt="Logo"
          className="mx-auto"
          style={{ width: "70px", height: "70px" }}
        />
      </div>
    </div>
  );
};

export default Header;
