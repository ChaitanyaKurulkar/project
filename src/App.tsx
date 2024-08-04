import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./app/routing/Layout";
import Dashboard from "./app/pages/homePage/Dashboard";
import Project from "./app/pages/project/Project";
import AddProject from "./app/pages/project/AddProject";
import Logout from "./app/pages/logout/Logout";
import SignUp from "./app/pages/signup/SignUp";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="project" element={<Project />} />
          <Route path="addproject" element={<AddProject />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
