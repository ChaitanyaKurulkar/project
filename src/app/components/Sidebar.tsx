import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getIcon = (path: string, activeIcon: string, defaultIcon: string) => {
    return location.pathname.startsWith(path) ? activeIcon : defaultIcon;
  };

  return (
    <div className="bg-light" style={{ width: "50px", height: "90vh" }}>
      <div className="sidebar">
        <div className="dash">
          <Link to="/dashboard">
            <img
              src={getIcon(
                "/dashboard",
                "/images/Dashboard-active.svg",
                "/images/Dashboard.svg"
              )}
              alt="Dashboard"
            />
          </Link>
          <Link to="/dashboard/project">
            <img
              src={getIcon(
                "/dashboard/project",
                "/images/Project-list-active.svg",
                "/images/Project-list.svg"
              )}
              alt="Project List"
            />
          </Link>
          <div className="line"></div>
          <Link to="/dashboard/addproject">
            <img
              src={getIcon(
                "/dashboard/addproject",
                "/images/create-project-active.svg",
                "/images/create-project.svg"
              )}
              alt="Create Project"
            />
          </Link>
        </div>
        <div className="logout">
          <Link to="/">
            <img src="/images/Logout.svg" alt="Logout" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
